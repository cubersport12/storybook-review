import { program } from 'commander'
import { OpenAPI, PublisherService } from './api'
import { ZipFile } from 'yazl'
import { existsSync, createWriteStream } from 'fs'
import streamToBlob from 'stream-to-blob'
import * as path from "path";
import glob from 'glob';

type OptionsType = Record<'api' | 'dir' | 'branch' | 'who' | 'projectId', string>

program.option('--api <api>', '--api=<api>')
program.option('--dir <dir>', '--api=<api>')
program.option('--branch <branch>', '--api=<api>')
program.option('--who <who>', '--api=<api>')
program.option('--projectId <projectId>', '--api=<api>')

const command = program.parse(process.argv)
const options = command.opts() as OptionsType
OpenAPI.BASE = options.api
const dir =path.join(path.dirname(require.main.filename),path.relative(path.dirname(require.main.filename), options.dir));
if (!existsSync(dir)) {
  throw new Error(`Нет папки по пути [${dir}]`)
}

const publishData = async () => {
  glob(dir + '/**/*.*', async (e, files) => {
    console.info(files)
    console.info(`Начинаем архивирование папки [${dir}]`)
    const zip = new ZipFile()
    files.forEach((file: string) => {
      zip.addFile(file, path.relative(dir, file))
    })
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
  })

}

(async () => {
  await publishData()
})()
