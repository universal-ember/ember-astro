import { on } from "@ember/modifier";

export const Static = <template>{{@props.greeting}}, {{@props.who}}</template>;

/**
 * NOTE: Astro doesn't support passing non-serializable data.
 *      So only stringish things can be passed to components.
 *
 *      @props.update here is *null* if
 *
 *
 *      let count = 0;
 *      let update = () => count++;
 *      ---
 *
 *       <fieldset><legend>Dynamic</legend>
 *	        <Dynamic client:only="ember" count={count} update={update} />
 *       </fieldset>

 */
export const Dynamic = <template>
	{{@props.count}}

	<button {{on "click" @props.update}}>++</button>
</template>;
