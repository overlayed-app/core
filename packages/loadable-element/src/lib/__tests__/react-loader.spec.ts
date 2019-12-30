/**
 * This is probably confusing - we're treating react-loader as if it was a react instance itself
 * and then simulating sideloading that react instance at "runtime" in our test body
 *
 * This is consistent with how the runtime will work when overlayed loads a remote element
 */
import react from '../react-loader'

describe('react-loader', () => {
  it('works', () => {
    // allocate a "mock" of react. this emulates the case of a remote runtime
    // passing it's own react instance
    const remoteReact = {
      createElement: jest.fn(),
    }

    // do the sideload
    const loadableReact = react as any
    loadableReact.__sideloadFrom(remoteReact)

    // ensure that the react global now looks like the remoteReact module
    expect(react.createElement).toBe(remoteReact.createElement)
    expect(react.useState).toBe(undefined)
  })
})
