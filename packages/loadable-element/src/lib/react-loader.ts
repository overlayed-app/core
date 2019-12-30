let currentReactVersion: any = {}

/**
 * Allows one to sideload a react instance into the loader
 *
 * Note: this is made possible by rollup and
 * the config overloading in rollup.config.json for the typescript plugin
 */
function __sideloadFrom(obj: any) {
  currentReactVersion = obj
}

const reactProxy = new Proxy(
  {},
  {
    get: function(_: any, prop) {
      if (prop === '__sideloadFrom') {
        return __sideloadFrom
      } else {
        return currentReactVersion[prop]
      }
    },
  }
)

/**
 * Export the sideloaded version
 */
export default reactProxy
