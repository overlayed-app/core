# contributes-parser

Parse JSONSchema contribution entries, and validate data against them.

## Why

Overlayed makes use of a common format for defining settings as an extension author. It's very similar to the [vscode configuration contribution point](https://code.visualstudio.com/docs/extensionAPI/extension-points#_contributesconfiguration), so if you're familiar with that you'll understand this easily. This module is specifically designed to allow one to work with this schema - to enumerate expected settings (and what they're for) and to validate settings objects.

## How

`npm i @overlayed-app/contributes-parser`

```
import contributes from '@overlayed-app/contributes'

// load a schema (validating it's legit too)
const contrib = contributes
  .parser({
    "name": "test-fixture",
    "version": "1.1.1",
    "contributes": {
      "configuration": {
        "title": "test settings",
        "properties": {
          "str": {
            "default": "abc123",
            "description": "string field",
            "type": "string"
          },
          "num": {
            "default": 12,
            "description": "number field",
            "type": "number"
          }
        }
      }
    }
  })

// get the title for these settings
const title = contrib.title

// get the settings data objects (describing each setting)
const data = contrib.data

// access one particular setting
const mySetting = data[0]

// prints '{name: 'mySetting', type: 'string', default: 'hi mom', description: 'your setting' }'
console.log(mySetting)
```

## API

Create a `contributes` object from some `package.json` config object:

```
// will throw if there's an error
const contrib = contributes.parse({})
```

This will validate that the included schema is legit, and then expose some ways to use the data.

To access the title, use title:

```
const title = contrib.title
```

To access the settings description data, as an array:

```
const data = contrib.data
```

You can use map to manipulate the data without pulling it out beforehand:

```
const names = contrib.map(entry => entry.data)
```

Note that each data entry contains the following data format:

```
{
  "name": "settingName, from the schema properties key",
  "description": "describing the settings purpose",
  "default": "a default value",
  "type": "string"
}
```

Where type is a [valid json schema type](https://github.com/epoberezkin/ajv/blob/master/KEYWORDS.md#type).

If you wish to validate some settings object against the schema:

```
const settings = { settingName: 'settingValue' }

// will throw if there's an error
contib.validate(settings)
```

Note that when you validate settings objects, types may [be coerced](https://github.com/epoberezkin/ajv/blob/master/COERCION.md) automatically to ensure consistency with the schema. If you wish to prevent this [freeze your object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze).

## License

MIT
