import Ajv from 'ajv'
import schema from './schema.json'

interface INodeData {
  description: string
  type: string
  default?: any
}

interface INodeSchema extends INodeData {
  name: string
}

interface IPartialSchema {
  title: string
  properties: { [key: string]: INodeData }
}

interface ISchema extends IPartialSchema {
  type: string
}

interface IPkg {
  name: string
  version: string
  contributes?: {
    configuration: IPartialSchema
  }
}

export default class Contributes {
  /**
   * Parses a package, validating it (and throwing if invalid) in the process
   *
   * @param pkg the package to parse
   */
  public static parse(pkg: IPkg) {
    return new Contributes(pkg)
  }

  private _ajv: Ajv.Ajv
  private _pkg: IPkg
  private _schema: ISchema
  private _validator: Ajv.ValidateFunction

  private constructor(pkg: IPkg) {
    this._ajv = new Ajv({ allErrors: true, useDefaults: true, coerceTypes: true })

    const pkgSchemaValidator = this._ajv.compile(schema)

    this._pkg = pkg

    const pkgSchema = this._pkg.contributes

    // if we don't have a schema, just mock out one (don't error)
    if (!pkgSchema) {
      this._schema = { type: 'object', properties: {} } as any
      this._validator = () => {
        return true
      }
    } else {
      // your contributes is no bueno
      if (!pkgSchemaValidator(pkgSchema)) {
        throw new Error(this._ajv.errorsText(pkgSchemaValidator.errors))
      }

      this._schema = { ...pkgSchema.configuration, type: 'object' }
      this._validator = this._ajv.compile(this._schema)
    }
  }

  /**
   * The package name
   */
  public get name() {
    return this._pkg.name
  }

  /**
   * The package version
   */
  public get version() {
    return this._pkg.version
  }

  /**
   * The package configuration title
   */
  public get title() {
    return this._schema.title
  }

  /**
   * Maps the raw data, without pulling it out first
   *
   * @param it map function
   */
  public map<T>(it: (node: INodeSchema) => T) {
    return this.data.map(it)
  }

  /**
   * Pulls out the raw data
   */
  public get data() {
    return Object.keys(this._schema.properties)
      .map(key => ({ key: key, data: this._schema.properties[key] }))
      .map(raw => ({ ...raw.data, name: raw.key }))
  }

  /**
   * Validates some data against the configuration schema for this package
   *
   * @param data see if data is valid
   */
  public validate(data?: any) {
    if (!this._validator(data)) {
      throw new Error(this._ajv.errorsText(this._validator.errors))
    }
    return this
  }
}
