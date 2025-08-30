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
	integrations: [
		ember(),
	],
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
