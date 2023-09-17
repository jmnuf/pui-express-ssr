/**
 * @typedef { { template: string } } PUIComponent
 */

/**
 * Generates full html based on the passed component's state with pui bindings so it can be hydrated with interactivity on the client with pui once again.
 * Maybe have an optional flag for not adding the flags for incremental static site generation?
 * 
 * @param { PUIComponent & { client: PUIComponent }} component Component to render onto HTML on the server
 * @returns {string} The generated HTML with PUI bindings so the client can attach to it as well
 */
export function generateHtml(component) {
	return component.template.replace(/<ClientApp *\/>/, component.client.template);
}
