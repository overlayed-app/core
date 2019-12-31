const fs = require('fs')
const themes = require('grommet/themes')
const utils = require('grommet/utils')

const theme = utils.deepMerge(
  themes.base,
  utils.deepMerge(themes.dark, {
    global: {
      font: {
        family: '"Poppins", sans-serif',
      },
      colors: {
        brand: '#640FC4',
        'accent-1': '#FFB2B2',
        'accent-2': '#129EB7',
      },
    },
  })
)

fs.writeFileSync(`${__dirname}/../src/theme.json`, JSON.stringify(theme))
