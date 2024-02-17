import { Injectable, Logger } from '@nestjs/common';
import {
  BranchesRepoService,
  BuildsRepoService,
  StoriesDistRepoService,
  StoriesRepoService,
} from '@repositories';
import { MetadataPublishDto, PublishResultDto } from '@dto';
import * as pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { StoryItemEntity } from '@entities';
import { findLast } from 'lodash';
import { existsSync, rmSync } from 'fs';
import { distFolder } from '@utils';

@Injectable()
export class PublisherService {
  constructor(
    private readonly buildsService: BuildsRepoService,
    private readonly branchesService: BranchesRepoService,
    private readonly storiesService: StoriesRepoService,
    private readonly storiesDistService: StoriesDistRepoService,
    private readonly logger: Logger,
  ) {}

  private async hasDiffPrevBuild(
    currentBuildId: number,
    data: PublishResultDto,
    stories: StoryItemEntity[],
  ): Promise<boolean> {
    const sortedStories = stories;

    const prevStory = findLast(sortedStories, (x) => x.name === data.title);

    if (!prevStory) {
      return true;
    }

    const snapshot = await this.storiesService.getSnapshot(prevStory.id);
    if (!snapshot) {
      console.info('snapshot is null');
      return true;
    }
    const prev = PNG.sync.read(snapshot.buffer);
    const curr = PNG.sync.read(Buffer.from(data.snapshot.data));
    const width = prev.width;
    const height = prev.height;
    const diff = new PNG({ width: width, height: height });
    const res = pixelmatch(prev.data, curr.data, diff.data, width, height, {
      threshold: 0.1,
    });
    return res > 0;
  }

  public async publishMetadata(
    storybookZipFile: Express.Multer.File,
    params: MetadataPublishDto,
  ): Promise<void> {
    this.logger.log(
      `Начало публикации. Ветка: ${params.branchName}. Кто: ${params.who}. ID: ${params.projectId}`,
    );
    const branches = await this.branchesService.getBranches(params.projectId);
    let branchId = branches.find((x) => x.name === params.branchName)?.id;
    if (!branchId) {
      branchId = await this.branchesService.createBranch(
        params.projectId,
        params.branchName,
      );
    }
    await this.buildsService.createBuild(params.branchName);
    /*const buildsInBranch = await this.buildsService.getBuildsByBranch(
      foundBranch.id,
    );
    const storiesInBuilds = await this.storiesService.getStories(
      buildsInBranch.map((x) => x.id),
    );*/
    await this.storiesDistService.uploadDist(branchId, storybookZipFile.buffer);

    if (existsSync(distFolder)) {
      rmSync(distFolder, { recursive: true, force: true });
      this.logger.log(
        `Папка "${distFolder}" из ветки ${params.branchName} удалена!`,
      );
    }
  }
}
