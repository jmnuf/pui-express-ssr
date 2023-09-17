
/**
 * generateHtml
 * @param {{ template: string }} component Component to render onto HTML on the server
 * @returns {string} The generated HTML with PUI bindings so the client can attach to it as well
 */
export function generateHtml(component) {
	return component.template;
}
