import contributes from '../parser'
import badFixture from './fixtures/badfixture.package.json'
import fixture from './fixtures/fixture.package.json'
import noContribFixture from './fixtures/nocontribfixture.package.json'

describe('contributes-parser', () => {
  it('should fail bad schemas', () => {
    expect(() => {
      // any cast necessary, otherwise the compiler saves us from passing bad config
      contributes.parse(badFixture as any)
    }).toThrow(/shorter than 1 characters/)
  })

  it('should expose title', () => {
    // gets the title
    const title = contributes.parse(fixture).title

    expect(title).toBe('test settings')
  })

  it('should expose name', () => {
    // gets the name
    const name = contributes.parse(fixture).name

    expect(name).toBe('test-fixture')
  })

  it('should expose version', () => {
    // gets the version
    const version = contributes.parse(fixture).version

    expect(version).toBe('1.1.1')
  })

  it('should enumerate settings', () => {
    // enumerates all the settings
    const data = contributes.parse(fixture).data

    expect(data).toEqual([
      {
        name: 'str',
        default: 'abc123',
        description: 'string field',
        type: 'string',
      },
      {
        name: 'num',
        default: 12,
        description: 'number field',
        type: 'number',
      },
    ])
  })

  it('should map settings', () => {
    const data = contributes.parse(fixture).map(s => s)

    expect(data).toEqual([
      {
        name: 'str',
        default: 'abc123',
        description: 'string field',
        type: 'string',
      },
      {
        name: 'num',
        default: 12,
        description: 'number field',
        type: 'number',
      },
    ])
  })

  it('should validate settings data is ok', () => {
    const newSettings = {
      str: 'i am valid',
      num: 1337,
    }

    const frozenSettings = Object.assign({}, newSettings)
    Object.freeze(frozenSettings)

    const t = contributes.parse(fixture).validate(newSettings)

    expect(newSettings).toStrictEqual(frozenSettings)
  })

  it('should coerce basic types', () => {
    const newSettings = {
      str: 12,
      num: '1337',
    }

    const t = contributes.parse(fixture).validate(newSettings)

    expect(newSettings).toStrictEqual({
      str: '12',
      num: 1337,
    })
  })

  it('should not tolerate bad data', () => {
    const newSettings = {
      str: {
        cantCoerceToString: true,
      },
    }

    expect(() => {
      contributes.parse(fixture).validate(newSettings)
    }).toThrow(/should be string/)
  })

  it('should support no-contribute packages', () => {
    const result = contributes.parse(noContribFixture)

    expect(result.data).toEqual([])
    expect(result.title).toBeUndefined()
    expect(result.name).toBe('test-fixture')
    expect(result.version).toBe('1.1.1')
    expect(result.validate()).toBe(result)
  })
})
