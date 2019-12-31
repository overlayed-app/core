import theme from '../'

describe('game-quotes', () => {
  it('should match snapshot', () => {
    expect(theme).toMatchSnapshot('quotes-snapshot')
  })
})
