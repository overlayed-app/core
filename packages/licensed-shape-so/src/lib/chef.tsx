import Base, { ShapeProps } from './base'
import React from 'react'
import animData from './data/food-animated-illustration.json'

/**
 * A chef steaming tray
 * @param props properties
 */
export const Chef = (props: ShapeProps) => <Base animation={animData} {...props} />
