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

@Module({
  providers: [
    BranchesRepoService,
    BuildsRepoService,
    RepositoriesRepoService,
    StoriesRepoService,
  ],
  exports: [
    BranchesRepoService,
    BuildsRepoService,
    RepositoriesRepoService,
    StoriesRepoService,
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
