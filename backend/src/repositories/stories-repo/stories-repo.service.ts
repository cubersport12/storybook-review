import { Injectable } from '@nestjs/common';
import { SnapshotEntity, StoryItemEntity } from '@entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoryItemStatus } from '@types';

@Injectable()
export class StoriesRepoService {
  private readonly _images = new Map<string, Buffer[]>();
  private readonly _stories: StoryItemEntity[] = [];

  constructor(
    @InjectRepository(StoryItemEntity)
    private readonly storiesRepo: Repository<StoryItemEntity>,
    @InjectRepository(SnapshotEntity)
    private readonly snapshotRepo: Repository<SnapshotEntity>,
  ) {}

  public async getStoryByTitle(
    buildId: number,
    title: string,
  ): Promise<StoryItemEntity> {
    return undefined;
  }

  public async getSnapshot(storyId: string): Promise<SnapshotEntity> {
    return await this.snapshotRepo.findOneBy({ storyItem: { id: storyId } });
  }

  public async getStories(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    buildId: number | number[],
  ): Promise<StoryItemEntity[]> {
    return [];
    // if (Array.isArray(buildId)) {
    //   if (buildId.length === 0) {
    //     return [];
    //   }
    //   return this.storiesRepo.findBy(
    //     buildId.map((x) => ({ build: { id: x } })),
    //   );
    // }
    // if (!buildId) {
    //   return [];
    // }
    // return this.storiesRepo.findBy({ build: { id: buildId } });
  }

  public async createStory(
    buildId: number,
    story: Omit<StoryItemEntity, 'id'>,
  ): Promise<string> {
    const newStoryItem = await this.storiesRepo.save({
      name: story.name,
      build: {
        id: buildId,
      },
      status: StoryItemStatus.Wait,
    });
    return newStoryItem.id;
  }

  public async uploadImages(storyId: string, images: Buffer[]): Promise<void> {
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      await this.snapshotRepo.save({
        storyItem: {
          id: storyId,
        },
        buffer: image,
      });
    }
  }
}
