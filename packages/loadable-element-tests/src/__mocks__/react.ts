import React from 'react'

/**
 * In our elements tests, we don't need to actually support loading react
 * As all we'd be doing is loading the same version over itself
 *
 * Instead, we mock React, as itself, but with this new do-nothing sideloadFrom fn
 */
;(React as any).__sideloadFrom = jest.fn()

module.exports = React
