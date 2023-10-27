import { Module } from '@nestjs/common';
import { BranchesRepoService } from './branches-repo/branches-repo.service';
import { BuildsRepoService } from './builds-repo/builds-repo.service';
import { RepositoriesRepoService } from './repositories-repo/repositories-repo.service';
import { StoriesRepoService } from './stories-repo/stories-repo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  BranchEntity,
  BuildEntity,
  RepositoryEntity,
  SnapshotEntity,
  StoryDistEntity,
  StoryItemEntity,
} from '@entities';
import { StoriesDistRepoService } from './stories-repo';

@Module({
  providers: [
    BranchesRepoService,
    BuildsRepoService,
    RepositoriesRepoService,
    StoriesRepoService,
    StoriesDistRepoService,
  ],
  exports: [
    BranchesRepoService,
    BuildsRepoService,
    RepositoriesRepoService,
    StoriesRepoService,
    StoriesDistRepoService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      BranchEntity,
      BuildEntity,
      RepositoryEntity,
      StoryItemEntity,
      SnapshotEntity,
      StoryDistEntity,
    ]),
  ],
})
export class RepositoriesModule {}
