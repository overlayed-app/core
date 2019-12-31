import Base, { ShapeProps } from './base'
import React from 'react'
import animData from './data/homeoffice-animated-illustration.json'

/**
 * A desk and computer
 * @param props properties
 */
export const HomeOffice = (props: ShapeProps) => <Base animation={animData} {...props} />
