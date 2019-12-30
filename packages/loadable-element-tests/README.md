# loadable-element-tests

A common set of tests that all loadable elements should satisfy. If you're creating a loadable element, you probably want to include these in your testbed.

## Usage

In `your-component.spec.tsx` (a test file for `your-component.tsx`):

```
import { includeCommonTests } from '@overlayed-app/loadable-element-tests'
import YourComponent from '../your-component'

// where YourComponent is really an element allocator (ie: wrapped in injectableElement call)

includeCommonTests(YourComponent)

/* .. your other tests .. */

```

Should produce the following jest output:

```
  @overlayed-app/loadable-element-tests
    √ should be renderable (22ms)
    √ should be checking react versioning (2ms)
```

For a complete example, see [@overlayed-app/typescript-element-template](https://github.com/overlayed-app/typescript-element-template).

## License

MIT
