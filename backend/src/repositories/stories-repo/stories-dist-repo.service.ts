import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoryDistEntity } from '@entities';
import { Repository } from 'typeorm';

@Injectable()
export class StoriesDistRepoService {
  constructor(
    @InjectRepository(StoryDistEntity)
    private readonly storyDistRepo: Repository<StoryDistEntity>,
  ) {}

  public async getDistByBranchId(id: string): Promise<StoryDistEntity> {
    return await this.storyDistRepo.findOneBy({
      branch: { id: id },
    });
  }

  public async uploadDist(branchId: string, dist: Buffer) {
    let found = (await this.storyDistRepo.findOneBy({
      branch: { id: branchId },
    })) as Partial<StoryDistEntity>;
    if (Boolean(found)) {
      found.buffer = dist;
    } else {
      found = {
        branch: { id: branchId },
        buffer: dist,
      };
    }
    const newDist = await this.storyDistRepo.save(found);
    return newDist.id;
  }
}
