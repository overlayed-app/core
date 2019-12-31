import Base, { ShapeProps } from './base'
import React from 'react'
import animData from './data/working(maleandfemale)-animated-illustration.json'

/**
 * An under construction graphic
 * @param props properties
 */
export const Working = (props: ShapeProps) => <Base animation={animData} {...props} />
