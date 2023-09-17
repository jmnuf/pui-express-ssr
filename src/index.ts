// @ts-ignore IDK, my TS server struggles with importing peasy-ui sometimes and this is one of those times
import { UI } from "@peasy-lib/peasy-ui";
import { ClientApp } from "./client";

async function main() {
	const app = new ClientApp();
	app.hello_msg = "Fetching hello...";
	UI.create("#app", app);
	const res = await (await fetch("/api/hello")).json();
	if ("message" in res) {
		app.hello_msg = res.message;
	} else {
		app.hello_msg = "Hello anon!";
	}
}

main();
