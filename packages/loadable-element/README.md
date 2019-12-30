# loadable-element

Loadable element logic for overlayed. You need this if you're trying to create an element that the system can load. It contains two key components:

- `injectableElement` - the function that converts a React component into something loadable
- `rollupConfig` - the config rollup needs to swap out your React import for our loader

## Usage

In `your-component.tsx`:

```
import React from 'react'
import { injectableElement } from '@overlayed-app/loadable-element'

const MyComponent = () => <p>Hello world</p>

// wrap your component in our injectableElement wrapper before exposing it
export default injectableElement(MyComponent)
```

In `rollup.config.js`:

```
import typescript from '@rollup/plugin-typescript'
import { rollupConfig } from '@overlayed-app/loadable-element'

export default {
  /* .. some valid rollup config .. */
  plugins: [
    typescript({
      ...rollupConfig,
      baseUrl: 'src',
    }),
    /* .. more config .. */
  ],
})

```

For a complete example, see [@overlayed-app/typescript-element-template](https://github.com/overlayed-app/typescript-element-template).

## License

MIT
