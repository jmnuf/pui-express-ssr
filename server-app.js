// @ts-check
const { ClientApp } = await import("./server/client.js");

/**
 * A component that's used by the server only
 * to generate the FULL html page that should be sent to the client.
 * This is essentially just boiler plate
 * that the user can edit for more page customization.
 * 
 */
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
	 * This method takes a normal http request.
	 * And in theory do stuff according to the request
	 * to reply with the correct data.
	 * 
	 * @param {Request} request server HTTP request to adapt data to
	 */
	async setup(request) {
		if (!ClientApp) {
			throw new TypeError("Missing client app class");
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
