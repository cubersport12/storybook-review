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

  public async getDistByBranchId(id: number): Promise<StoryDistEntity> {
    return await this.storyDistRepo.findOneBy({
      build: { id: id },
    });
  }

  public async uploadDist(buildId: number, dist: Buffer) {
    const newDist = await this.storyDistRepo.save({
      build: { id: buildId },
      buffer: dist,
    });
    return newDist.id;
  }
}
