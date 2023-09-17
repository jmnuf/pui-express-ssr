// @ts-check
import express from 'express';
import { createServer as createViteServer } from 'vite'
import { ServerApp } from './server-app.js';
import { generateHtml } from './pui-ssr.js';

async function createServer() {
	const port = 3000;
	const app = express()

	app.get("/api/hello", async (req, res) => {
		await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 9_500) + 500));
		console.log(req.body);
		res.json({
			message: "Hello world",
		});
	})
  
	const vite = await createViteServer({
		server: { middlewareMode: true },
		appType: 'custom'
	});
	
	app.use(vite.middlewares);

	app.use('*', async (req, res, next) => {
		try {
			const app = new ServerApp();
			// I create my own request object based on the express request
			// I wanted a normal http and didn't see how to extract it
			const r = new Request(new URL(`${req.protocol}://${req.hostname}${
				req.hostname == "localhost" ? `:${port}` : ""
				}${req.url}`), {
				body: req.body,
					method: req.method,
			});
			console.log(r.url);
			await app.setup(r);
			let html = generateHtml(app);
			
			// This is some vite stuff which Idk what it does but it throws on some bindings from https://vitejs.dev/guide/ssr.html
			// html = await vite.transformIndexHtml(req.originalUrl, html);
	
			res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
		} catch (e) {
			// Uses maps for redirecting certain errors back to my own scripts supposedly
			vite.ssrFixStacktrace(e);
			next(e);
		}
	});

	app.listen(port, () => {
		console.log("Listening at port", port);
	});
}

createServer()