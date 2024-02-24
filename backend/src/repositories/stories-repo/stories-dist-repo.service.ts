import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoryDistEntity } from '@entities';
import { In, Repository } from 'typeorm';

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

  public async load(branchesIds: string[]): Promise<StoryDistEntity[]> {
    const s = await this.storyDistRepo.find({
      relations: ['branch'],
      select: ['timestamp', 'branch', 'id', 'owner'],
      where: { branch: { id: In(branchesIds) } },
    });

    return s;
  }

  public async uploadDist(branchId: string, dist: Buffer, who: string) {
    let found = (await this.storyDistRepo.findOneBy({
      branch: { id: branchId },
    })) as Partial<StoryDistEntity>;
    if (Boolean(found)) {
      found.buffer = dist;
      found.timestamp = new Date();
      found.owner = who;
    } else {
      found = {
        branch: { id: branchId },
        buffer: dist,
        timestamp: new Date(),
        owner: who,
      };
    }
    const newDist = await this.storyDistRepo.save(found);
    return newDist.id;
  }
}
