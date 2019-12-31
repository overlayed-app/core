import React from 'react'
import { render, cleanup } from '@testing-library/react'
import All from '../../'

const assertRender = (comp: React.ReactElement, name: string) => {
  expect(render(comp).asFragment()).toMatchSnapshot(name)
}

describe('licensed-shape-so', () => {
  afterEach(cleanup)

  it('Animation', () => {
    assertRender(React.createElement(All.Animation), 'animation')
  })

  it('Chef', () => {
    assertRender(React.createElement(All.Chef), 'chef')
  })

  it('EditingShapes', () => {
    assertRender(React.createElement(All.EditingShapes), 'editing-shapes')
  })

  it('Editing', () => {
    assertRender(React.createElement(All.Editing), 'editing')
  })

  it('HomeOffice', () => {
    assertRender(React.createElement(All.HomeOffice), 'home-office')
  })

  it('Portfolio', () => {
    assertRender(React.createElement(All.Portfolio), 'portfolio')
  })

  it('Working', () => {
    assertRender(React.createElement(All.Working), 'working')
  })
})
