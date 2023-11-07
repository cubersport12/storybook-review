import { program } from 'commander'
import { OpenAPI, PublisherService } from './api'
import { readFileSync } from 'fs'

program.option('--api <api>', '--api=<api>')
program.option('--file <file>', '--api=<api>')
program.option('--branch <branch>', '--api=<api>')
program.option('--who <who>', '--api=<api>')
program.option('--projectId <projectId>', '--api=<api>')

const command = program.parse(process.argv)
const options = command.opts()
OpenAPI.BASE = options.api
// const file = readFileSync(options)
PublisherService.metadataPublisherControllerPublishMetadata({
  projectId: options.projectId,
  who: options.who,
  file: new Blob(),
  branchName: options.branchName
})
console.info(OpenAPI.BASE)
