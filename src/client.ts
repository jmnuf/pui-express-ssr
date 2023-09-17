
export class ClientApp {
	declare private _elem: HTMLDivElement;
	subtitle: string;
	hello_msg: string;

	constructor() {
		this.subtitle = "Foot Loose is the best cinematic musical, don't @ me";
		this.hello_msg = "";
	}

	// This setter only runs on client, SSR should preferably not trigger events or bind to fake elements
	// This limits things but it's also a better design decision IMO cause
	// element handling should be done on the client where you have the actual DOM
	set element(div: HTMLDivElement) {
		this._elem = div;
		// @ts-ignore Just queueing to be sure everything is setup since a child might get their element after this class, IDK
		UI.queue(() => {
			console.log("Client has been hydrated");
		});
	}

	get element() {
		return this._elem;
	}

	get template() {
		return ClientApp.template;
	}

	static template = `<div id="app" pui="==>element">
		<h1>Being sane is the most insane thing to do</h1>
		<h2>\${ subtitle }</h2>
		<p>\${ hello_message }</p>
	</div>`;
}
