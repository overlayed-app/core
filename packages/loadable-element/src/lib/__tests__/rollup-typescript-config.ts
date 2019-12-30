import path from 'path'
import config from '../rollup-typescript-config'

describe('rollup-typescript-config', () => {
  it('should match our snapshot', () => {
    const snapshot = {
      paths: {
        react: [`${path.resolve(__dirname, '..')}/react-loader.js`],
      },
    }

    expect(config).toEqual(snapshot)
  })
})
