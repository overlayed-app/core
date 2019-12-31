import Base, { ShapeProps } from './base'
import React from 'react'
import animData from './data/portfolio-animated-illustration.json'

/**
 * A graphical portfolio
 * @param props properties
 */
export const Portfolio = (props: ShapeProps) => <Base animation={animData} {...props} />
