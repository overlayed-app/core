import Base, { ShapeProps } from './base'
import React from 'react'
import animData from './data/editing(male)-animated-illustration.json'

/**
 * A person editing shapes
 * @param props properties
 */
export const Editing = (props: ShapeProps) => <Base animation={animData} {...props} />
