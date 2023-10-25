import { Injectable } from '@nestjs/common';
import {
  BranchesRepoService,
  BuildsRepoService,
  StoriesRepoService,
} from '@repositories';
import { MetadataPublishDto, PublishResultDto } from '@dto';
import * as pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { StoryItemEntity } from '@entities';
import { orderBy, findLast } from 'lodash';
import { fromBuffer } from 'yauzl';

@Injectable()
export class PublisherService {
  constructor(
    private readonly buildsService: BuildsRepoService,
    private readonly branchesService: BranchesRepoService,
    private readonly storiesService: StoriesRepoService,
  ) {}

  private async hasDiffPrevBuild(
    currentBuildId: number,
    data: PublishResultDto,
    stories: StoryItemEntity[],
  ): Promise<boolean> {
    const sortedStories = orderBy(stories, (x) => x.buildId);

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

  private unzipFile(buffer: Buffer): Promise<Buffer> {
    return new Promise<any>((resolve, reject) => {
      fromBuffer(buffer, (error, zipfile) => {
        if (error) {
          reject(error);
          return;
        }

        // console.log('entry', zipfile.);
        resolve(null);
      });
    });
  }

  public async publishMetadata(
    storybookZipFile: Express.Multer.File,
    params: MetadataPublishDto,
  ): Promise<void> {
    const foundBranch = await this.branchesService.getBranchByName(
      params.branchName,
    );
    if (!foundBranch) {
      await this.branchesService.createBranch(
        params.projectId,
        params.branchName,
      );
    }
    const newBuildId = await this.buildsService.createBuild(params.branchName);
    const buildsInBranch = await this.buildsService.getBuildsByBranch(
      foundBranch.id,
    );
    const storiesInBuilds = await this.storiesService.getStories(
      buildsInBranch.map((x) => x.id),
    );

    const unzipped = await this.unzipFile(storybookZipFile.buffer);
    console.log(unzipped);
    // for (let i = 0; i < data.length; i++) {
    //   const item = data[i];
    //   if (!(await this.hasDiffPrevBuild(newBuildId, item, storiesInBuilds))) {
    //     return;
    //   }
    //   const newStoryId = await this.storiesService.createStory(newBuildId, {
    //     name: item.title,
    //     status: StoryItemStatus.Wait,
    //   });
    //   await this.storiesService.uploadImages(newStoryId, [
    //     Buffer.from(item.snapshot.data),
    //   ]);
    // }
  }
}
