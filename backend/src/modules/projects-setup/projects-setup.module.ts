import { Logger, Module } from '@nestjs/common';
import { ReposController } from './controllers/repos.controller';
import { RepositoriesModule } from '@repositories';
import { BranchesController } from './controllers/branches.controller';
import { MetadataPublisherController } from './controllers/metadata-publisher.controller';
import { PublisherService } from './services/publisher.service';
import { BuildsController } from './controllers/builds.controller';
import { StoriesController } from './controllers/stories.controller';
import { BranchesQueriesService } from './services/branches-queries.service';

@Module({
  controllers: [
    ReposController,
    BranchesController,
    MetadataPublisherController,
    BuildsController,
    StoriesController,
  ],
  imports: [RepositoriesModule],
  providers: [PublisherService, BranchesQueriesService, Logger],
})
export class ProjectsSetupModule {}
