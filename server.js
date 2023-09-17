// @ts-check
import express from 'express';
import { createServer as createViteServer } from 'vite'
import { ServerApp } from './server-app.js';
import { generateHtml } from './pui-ssr.js';

async function createServer() {
	const port = 3000;
	const app = express()

	// An api space for other stuff
	app.get("/api/*", (req, res) => {
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

	// The actual SSR
	app.use('*', async (req, res, next) => {
		try {
			const app = new ServerApp();
			const r = new Request(new URL(`${req.protocol}://${req.hostname}${
				req.hostname == "localhost" ? `:${port}` : ""
				}${req.url}`), {
				body: req.body,
					method: req.method,
			});
			console.log(r.url);
			await app.setup(r);
			let html = generateHtml(app);
			
			// This is some vite stuff from https://vitejs.dev/guide/ssr.html
			// html = await vite.transformIndexHtml(req.originalUrl, html);
	
			res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
		} catch (e) {
			vite.ssrFixStacktrace(e);
			next(e);
		}
	});

	app.listen(port, () => {
		console.log("Listening at port", port);
	});
}

createServer()