import React, { FunctionComponent, ComponentClass } from 'react'

type Allocator = (
  React: any,
  version: string
) => FunctionComponent<any> | ComponentClass<any, any>

/**
 * Includes common tests
 *
 * @param elementAllocator the element allocator to test
 */
export const includeCommonTests = (elementAllocator: Allocator) => {
  describe('@overlayed-app/loadable-element-tests', () => {
    it('should be renderable', () => {
      const elem = React.createElement(elementAllocator(React, React.version))

      expect(elem).not.toBeUndefined()
    })

    it('should be checking react versioning', () => {
      expect(() => elementAllocator(React, '0.0.0')).toThrowError(
        /Unsupported React version/
      )
    })
  })
}
