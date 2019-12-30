import { FunctionComponent, ComponentClass } from 'react'
import ky from 'ky'
import { format } from 'url'
import importer from './importer'

type Allocator = (
  React: any,
  version: string
) => FunctionComponent<any> | ComponentClass<any, any>

type Pkg = {
  name: string
  version: string
  main?: string
  browser?: string
  contributes?: any
}

/**
 * Format a given url into a baseUrl and packageUrl
 *
 * @param url given url
 */
const formatUrl = (url: string) => {
  const postfix = 'package.json'

  let urn = format(url)

  if (!urn.endsWith(postfix)) {
    urn += postfix
  }

  return {
    baseUrl: urn.substring(0, urn.length - postfix.length),
    packageUrl: urn,
  }
}

/**
 * Determine the entrypoint to the element
 *
 * @param pkg pkg config
 */
const determineEntry = (pkg: Pkg) => {
  return pkg.browser ? pkg.browser : pkg.main ? pkg.main : undefined
}

/**
 * Loads an element from it's url
 * @param url the element url
 */
export default async function loader(url: string, React: any, version: string) {
  const { baseUrl, packageUrl } = formatUrl(url)
  const pkg = await ky.get(packageUrl).json<Pkg>()

  const entry = determineEntry(pkg)

  if (!entry) {
    throw new Error(`Invalid element, could not find entry from ${packageUrl}.`)
  }

  // baseUrl ends with / so no extra / is needed here
  const entryUrl = `${baseUrl}${entry}`

  const module = await importer(entryUrl)
  const AllocElement = module.default as Allocator

  return {
    element: AllocElement(React, version),
    contributes: pkg.contributes,
  }
}
