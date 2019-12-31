# grommet-theme

> Note: this has no external dependencies.

The overlayed grommet-theme. You probably also want these things:

```
npm i @openfonts/poppins_all grommet styled-components react
```

Mostly useful when coupled with a [`<Grommet/>`](https://v2.grommet.io/grommet) component, but can be consumed as raw data as well (for instance, when referencing a particular hex color as data).

## Usage

```
import theme from '@overlayed-app/grommet-theme'

// theme is a grommet theme object
// if you have grommet, you can pass it to a Grommet component
// or you can access it as raw data
//
// outputs: "#640FC4" (at the time or writing)
console.log(theme.global.colors.brand)

```

Note: this data is generated at build-time, based on overrides applied to the devDependency version of `grommet`.

## License

MIT
