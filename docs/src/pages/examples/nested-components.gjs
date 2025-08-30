export const Outer = <template>
	<fieldset><legend>Outer</legend>

		{{{@slots.default}}}

	</fieldset>
</template>;

export const Inner = <template>
	<fieldset><legend>Inner</legend>

		{{{@slots.default}}}

	</fieldset>
</template>;
