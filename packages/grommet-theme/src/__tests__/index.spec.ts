import theme from '../'

describe('grommet-theme', () => {
  it('should match snapshot', () => {
    expect(theme).toMatchSnapshot('theme-snapshot')
  })
})
