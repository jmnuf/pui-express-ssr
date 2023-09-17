import express from 'express'
import { createServer as createViteServer } from 'vite'
import { ServerApp } from './app';
import { generateHtml } from './pui-ssr';

async function createServer() {
	const app = express()

	// An api space for other stuff
	app.get("/api/*", (req, res) => {
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
			const app = new ServerApp(req);
			let html = generateHtml(app);
			
			// This is some vite stuff from https://vitejs.dev/guide/ssr.html
			html = vite.transformIndexHtml(url, html);
	
			res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
		} catch (e) {
			vite.ssrFixStacktrace(e);
			next(e);
		}
	});

	app.listen(3000);
}

createServer()