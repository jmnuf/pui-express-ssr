// @ts-ignore IDK, my TS server struggles with importing peasy-ui sometimes and this is one of those times
import { UI } from "@peasy-lib/peasy-ui";
import { ClientApp } from "./client";

UI.create("#app", new ClientApp());
