import React from 'react'
import { injectableElement } from '@overlayed-app/loadable-element'
import { includeCommonTests } from '../'

const TestComponent = () => {
  return React.createElement('h1', undefined, 'Hello world')
}

const TestComponentAllocator = injectableElement(TestComponent)

includeCommonTests(TestComponentAllocator)
