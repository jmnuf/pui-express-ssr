// src/components/greet.ts
function Greet(name) {
  return {
    name,
    tempate: `<p>Greetings \${name}</p>`
  };
}

// src/client.ts
class ClientApp {
  subtitle;
  hello_msg;
  greet;
  constructor() {
    this.subtitle = "Foot Loose is the best cinematic musical, don't @ me";
    this.hello_msg = "";
    this.greet = Greet("Anon");
  }
  set element(div) {
    this._elem = div;
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
		<p>\${ hello_msg }</p>
		<\${ greet === }>
	</div>`;
}
export {
  ClientApp
};
