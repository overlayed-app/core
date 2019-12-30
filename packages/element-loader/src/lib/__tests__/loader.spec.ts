jest.mock('ky', () => {
  return {
    get: jest.fn(),
  }
})
jest.mock('../importer')

import url from 'url'
import ky from 'ky'
import loader from '../loader'
import importer from '../importer'

const makeResponse = (data: any) => {
  return {
    json: jest.fn().mockReturnValue(data),
  }
}

const testRunWithData = async (entrypoint: string, data: any) => {
  const reactModule = {}
  const reactVersion = '0.0.0'
  const expectedUrl = url.format('https://example.com/')
  const expectedEntrypoint = entrypoint
  const expectedPackageUrl = url.format(`${expectedUrl}package.json`)
  const expectedEntrypointUrl = url.format(`${expectedUrl}${expectedEntrypoint}`)
  const expectedComponent = {
    pretendIAmAReactComponent: {
      becauseReasons: true,
    },
  }
  const expectedImporter = (React: any, version: string) => {
    return expectedComponent
  }

  const mockKy = (ky.get as unknown) as jest.Mock<any>
  const mockImporter = (importer as unknown) as jest.Mock<any>
  mockImporter.mockResolvedValueOnce({
    default: expectedImporter,
  })
  mockKy.mockReturnValueOnce(makeResponse(data))

  const loaded = await loader(expectedUrl, reactModule, reactVersion)

  expect(mockImporter).toHaveBeenCalledTimes(1)
  expect(mockImporter).toHaveBeenCalledWith(expectedEntrypointUrl)
  expect(mockKy).toHaveBeenCalledTimes(1)
  expect(mockKy).toHaveBeenCalledWith(expectedPackageUrl)
  expect(loaded.element).toBe(expectedComponent)
  expect(loaded.contributes).toEqual(data.contributes)
}

describe('loader', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should load (browser field)', async () => {
    const browserEntry = 'entrypoint.js'
    await testRunWithData(browserEntry, {
      name: 'test',
      version: '1.0.0',
      browser: browserEntry,
    })
  })

  it('should load (main field)', async () => {
    const mainEntry = 'index.js'
    await testRunWithData(mainEntry, {
      name: 'test',
      version: '1.0.0',
      main: mainEntry,
    })
  })

  it('should load (contributes field)', async () => {
    const browserEntry = 'entrypoint.js'
    await testRunWithData(browserEntry, {
      name: 'test',
      version: '1.0.0',
      browser: browserEntry,
      contributes: {
        any: {
          arbitrary: 'data',
        },
      },
    })
  })

  it('should fail with no entry', async () => {
    const mockKy = (ky.get as unknown) as jest.Mock<any>
    mockKy.mockReturnValueOnce(
      makeResponse({
        name: 'bad-element',
        version: '0.1.2',
      })
    )
    await expect(loader('https://example.com', {}, '0.0.0')).rejects.toThrowError()
  })
})
