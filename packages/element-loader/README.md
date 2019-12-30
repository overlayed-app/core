# element-loader

overlayed element loader. This is the logic that loads elements. It is used by the core overlayed runtime to do the following, in sequence:

- parse `package.json` from `url` (ie: `https://site.com/package.json`)
- find `browser` or `main` entry (in that order)
- (optional) find `contributes` if it exists
- attempt to import `url`+`<entryFromAbove>` (ie: `https://site.com/index.js`)
- expect that the result is an esm module (ie: `{default: value}`)
- expect that `default` is an element allocator function
- return the result of calling the allocator function, and `contributes` (if it exists)

The provided url may or may not contain `package.json` suffice. If it isn't there, it will be automatically appended.

Throws if there is no `browser` or `main` entry.

Throws if `import` does not succeed.

Note: expects that calling the allocator function will result in a React Component.

## Usage

```
import React from 'react'
import {loader} from '@overlayed-app/element-loader`

loader("https://site.com", React, React.version).then((result) => {
  // result.element is the allocator fn result (a React component)
  // result.contributes is (possibly) the contributes object (or undefined)
})
```

## License

MIT
