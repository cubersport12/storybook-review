import { program } from 'commander'
import { OpenAPI, PublisherService } from './../api'
import { ZipFile } from 'yazl'
import { existsSync, readdirSync } from 'fs'
import { join } from 'path'
// @ts-ignore
import streamToBlob from 'stream-to-blob'

type OptionsType = Record<'api' | 'dir' | 'branch' | 'who' | 'projectId', string>

program.option('--api <api>', '--api=<api>')
program.option('--dir <dir>', '--api=<api>')
program.option('--branch <branch>', '--api=<api>')
program.option('--who <who>', '--api=<api>')
program.option('--projectId <projectId>', '--api=<api>')

const command = program.parse(process.argv)
const options = command.opts() as OptionsType
OpenAPI.BASE = options.api
if (!existsSync(options.dir)) {
  throw new Error(`Нет папки по пути [${options.dir}]`)
}

const publishData = async () => {
  console.info(`Начинаем архивирование папки [${options.dir}]`)
  const files = readdirSync(options.dir)
  const zip = new ZipFile()
  files.forEach(file => zip.addFile(join(options.dir, file), file))
  zip.end()

  const blob = await streamToBlob(zip.outputStream)
  console.info(blob)

  console.info('Начинаем публикацию...')
  await PublisherService.metadataPublisherControllerPublishMetadata({
    projectId: options.projectId,
    who: options.who,
    file: blob,
    branchName: options.branch
  })
  console.info('Публикаия успешно завершена')
}

(async () => {
  await publishData()
})()
