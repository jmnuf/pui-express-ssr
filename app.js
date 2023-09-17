export class ServerApp {
	title;
	/** @type {{template: string}[]} */
	extraData;
	/**
	 * 
	 * @param {Request} request server request to handle
	 */
	constructor(request) {
		const url = new URL(request.url);
		console.log(url);
		this.title = url.pathname.replace("/", "Home").replace(/\//g, ">");
		this.extraMeta = [];
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
		<\${ data === } \${ data <=* extraMeta }/>
    <title>\${title}</title>
		<script type="module" src="/src/main.ts"></script>
  </head>
  <body>
    <div id="app" pui="client ==="></div>
  </body>
</html>`;
}
