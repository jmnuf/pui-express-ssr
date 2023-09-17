export class ClientApp {
    subtitle;
    constructor() {
        this.subtitle = "Foot Loose is the best cinematic musical, don't @ me";
    }
    set element(div) {
        this._elem = div;
        console.log("Client has been hydrated");
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
	</div>`;
}
