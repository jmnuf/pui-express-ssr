// @ts-ignore IDK, my TS server struggles with importing peasy-ui sometimes and this is one of those times
import { UI } from "@peasy-lib/peasy-ui";
import { ClientApp } from "./client";

async function main() {
	const app = new ClientApp();
	app.hello_msg = "Fetching hello...";
	UI.create("#app", app);
	Promise.allSettled([
		fetch_hello(app),
		fetch_name(app),
	]);
}

async function fetch_hello(app: ClientApp): Promise<string> {
	const res = await fetch("/api/hello").then(res => res.json());
	if ("message" in res) {
		app.hello_msg = res.message;
		return res.message;
	} else {
		app.hello_msg = "Hello anon!";
	}
	return "Anon intercepted message";
}

async function fetch_name(app: ClientApp): Promise<string> {
	const res = await fetch("/api/random-name").then(res => res.json());
	if (typeof res != "object") {
		console.error("Failed fetch random name");
		return "Anon intercepted name";
	}
	console.log("Name passed after:", res.timeout_time);
	app.greet.name = res.name;
	return res.name;
}

main();
