import Base, { ShapeProps } from './base'
import React from 'react'
import animData from './data/animation-animated-illustration.json'

/**
 * A clapper
 * @param props properties
 */
export const Animation = (props: ShapeProps) => <Base animation={animData} {...props} />
