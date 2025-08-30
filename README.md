# ember-astro

Ember integration with [astro.build](https://astro.build/)

## Install

```
pnpm add ember-astro
```

## Setup

In your `astro.config.*`:

```js
import { defineConfig } from "astro/config";
import { ember } from "ember-astro";

// https://astro.build/config
export default defineConfig({
	integrations: [ember()],
});
```

## Usage

### Using `client:only`

<details><summary>src/components/demo.gjs</summary>

```gjs
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { on } from "@ember/modifier";

export default class HelloWorld extends Component {
	@tracked count = 0;

	increment = () => (this.count += 1);

	<template>
		<p>You have clicked the button {{this.count}} times.</p>

		<button type="button" {{on "click" this.increment}}>Click</button>
	</template>
}
```

</details>

In `src/pages/index.astro`:

```astro
---
import HelloWorld from '../components/demo.gjs';
---

<html>
  <body>
    <h1>Use Ember components directly in Astro!</h1>
    <HelloWorld client:only="ember-astro" />
  </body>
</html>
```

## Differences in using `.astro` vs `.gjs` (or `.gts`)

Normally, in Ember arguments start with `@` (e.g.: `@foo`) and element attributes without (e.g.:
`foo`).

```gjs
const foo = 2;

<template>
	<MyComponent @foo={{2}} foo={{2}} />
	^ argument | ^ attribute
</template>
```

However, in `.astro` files, there is no such differentiation.

In this astro template:

```astro
---
const two = 2;
---
<body>
	<MyComponent foo={2} style={{ background: 'blue' }} />
</body>
```

`foo` will be seen to `MyComponent` as `@foo`, and passing attributes directly is not possible -- so
`style` (normally passed along to whatever element MyComponent places `...attributes` on) will also
be an argument, `@style`. So `MyComponent` may look like this:

```gjs
<template>
	<div style={{@style}} ...attributes>
		^ this syntax is unusable when invoked from Astro components
		{{@foo}}
	</div>
</template>
```

With the manually specified attributes in the element space positioned _before_ `...attributes`, the
component can still _also_ be used in other ember components where `...attributes` would work, and
override any accidental attribute-as-argument passing.
