import Base, { ShapeProps } from './base'
import React from 'react'
import animData from './data/editingshapes(female)-animated-illustration.json'

/**
 * A person editing shapes
 * @param props properties
 */
export const EditingShapes = (props: ShapeProps) => (
  <Base animation={animData} {...props} />
)
