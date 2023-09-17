// @ts-check
import {readFileSync, readdirSync } from "node:fs";

export class ServerApp {
	title;
	/** @type {any} */
	client;
	/** @type {{template: string}[]} */
	extraData;
	constructor() {
		this.title = "";
		this.extraData = [];
		this.client = null;
	}
	/**
	 * 
	 * @param {Request} request server request to handle
	 */
	async setup(request) {
		const ClientScript = await import("./server/client.js");
		const ClientApp = ClientScript.ClientApp;
		if (!ClientApp) {
			throw new TypeError("Missing client app export");
		}
		this.client = new ClientApp();
		const url = new URL(request.url);
		this.title = url.pathname.replace("/", "Home").replace(/\//g, ">");
	}

	get template() {
		return ServerApp.template;
	}
	static template = `
<!DOCType html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>\${title}</title>
		<script type="module" src="/src/index.ts"></script>
		<\${ data === } \${ data <=* extraMeta }/>
  </head>
  <body>
    <ClientApp/>
  </body>
</html>`;
}
