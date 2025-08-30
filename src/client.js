// waiting on renderComponent
// https://github.com/emberjs/ember.js/pull/20962
import { renderApp } from "./render-app-island.js";
import { template } from "@ember/template-compiler";

function withProps(props, slots, component) {
	return template(`<EmberAstro_client_component__ @props={{props}} @slots={{slots}} />`, {
		scope: () => ({
			props,
			slots,
			EmberAstro_client_component__: component,
		}),
	});
}

/**
 * @type {WeakMap<HTMLElement, unknown>}
 */
const existingApplications = new WeakMap();

export default function emberAstroClientRenderer(element) {
	return async (component, props, slots) => {
		if (!element.hasAttribute("ssr")) return;

		if (existingApplications.has(element)) {
			console.log("Should update props?");
			// existingApplications.get(element)!.setProps(resolvedProps);
			return;
		}

		let result = await renderApp({ element, component: withProps(props, slots, component) });

		existingApplications.set(element, result);
		element.addEventListener("astro:unmount", () => result.destroy(), { once: true });
	};
}
