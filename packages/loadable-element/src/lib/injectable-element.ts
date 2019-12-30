import React from 'react'
import semver from 'semver'

/**
 * React semver that overlayed supports
 */
const SUPPORTED_REACT_VERSION = '^16.12.0'

/**
 * Creates an injectable version of a react component
 *
 * This generates the expected signature for remote loading
 */
export function injectableElement(
  element: React.FunctionComponent<any> | React.ComponentClass<any, any>
) {
  return function loadElement(remoteReact: any, version: string) {
    if (!semver.satisfies(version, SUPPORTED_REACT_VERSION)) {
      throw new Error(
        `Unsupported React version: '${version}'. Supported range: '${SUPPORTED_REACT_VERSION}'.`
      )
    }

    // ensure the react import is correctly set to the runtime-passed instance
    const loadableReact = React as any

    // you'll see this error if your component is actually referencing react
    // and is not, instead, referencing a writable shim that we can use to
    // replace React during the component allocation process.
    //
    // If you see this, ensure your rollup config is patching react out
    // If you need to manually verify, look at the dist/ output and see that React is not inlined.
    if (typeof loadableReact.__sideloadFrom !== 'function') {
      throw new Error(`Element references real React, not writable.`)
    }

    loadableReact.__sideloadFrom(remoteReact)

    return element
  }
}
