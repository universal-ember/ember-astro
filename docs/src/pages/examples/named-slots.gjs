/**
 * Slots are HTML passed as strings, so we have to
 * triple-equals (render-raw) them
 */
export const Demo = <template>
	<div class="container">

		<fieldset><legend>@slots.one</legend>
			{{{@slots.one}}}
		</fieldset>
		<fieldset><legend>@slots.two</legend>
			{{{@slots.two}}}
		</fieldset>
		<fieldset><legend>@slots.three</legend>
			{{{@slots.three}}}
		</fieldset>
	</div>
	<style>
		.container {
			display: flex;
			gap: 1rem;
		}
	</style>
</template>;
