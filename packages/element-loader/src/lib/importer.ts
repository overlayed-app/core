/**
 * Wrapper around import
 *
 * @param moduleSpec the module spec to import
 */
export default function importer(moduleSpec: string) {
  return import(moduleSpec)
}
