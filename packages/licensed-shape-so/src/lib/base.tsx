import React from 'react'
import Lottie, { EventListener } from 'react-lottie'
import { Box, BoxProps } from 'grommet'
import animData from './data/sandglass-animated-illustration.json'

/**
 * Shape options
 *
 * Note: most of these are surfaced from @see Lottie
 */
export interface ShapeProps {
  /**
   * Configuration for the shape
   */
  shape?: {
    /**
     * Does the animation loop
     */
    loop?: boolean

    /**
     * Does the animation autoplay
     */
    autoplay?: boolean

    /**
     * Is the animation stopped
     */
    isStopped?: boolean

    /**
     * Is the animation paused
     */
    isPaused?: boolean

    /**
     * Event listeners
     *
     * Note: see the react-lottie documentation
     */
    eventListeners?: EventListener[]

    /**
     * The animation speed
     */
    speed?: number

    /**
     * The animation direction
     */
    direction?: number

    /**
     * Should the animation pause when it is clicked on
     */
    isClickToPauseDisabled?: boolean

    /**
     * A title for the animation
     */
    title?: string
  }
  /**
   * The element height
   */
  height?: BoxProps['height']

  /**
   * The element width
   */
  width?: BoxProps['width']
}

/**
 * Properties for the base shape
 *
 * Note: sub-shapes should use prop type of @see ShapeProps
 */
interface BaseShapeProps extends ShapeProps {
  /**
   * The animation data that your sub-shape is made of
   */
  animation: unknown
}

/**
 * A base shape
 */
export default class BaseShape extends React.Component<BaseShapeProps> {
  static defaultProps: BaseShapeProps = {
    animation: undefined,
    shape: { loop: true, autoplay: true, isClickToPauseDisabled: true },
    width: 'medium',
  }

  render() {
    const shapeDefault = this.props.shape || {
      loop: true,
      autoplay: true,
    }

    const options = {
      loop: shapeDefault.loop,
      autoplay: shapeDefault.autoplay,
      animationData: this.props.animation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    }

    const shapeProps = {
      ...this.props.shape,
      options,
    }

    return (
      <Box width={this.props.width} height={this.props.height}>
        <Lottie {...shapeProps} />
      </Box>
    )
  }
}

BaseShape.defaultProps.animation = animData
