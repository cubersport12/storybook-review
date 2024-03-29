import { Injectable } from '@nestjs/common';
import { BranchEntity } from '@entities';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class BranchesRepoService {
  constructor(
    @InjectRepository(BranchEntity)
    private readonly branchRepo: Repository<BranchEntity>,
  ) {}

  public async getBranches(repoId: string | string[]): Promise<BranchEntity[]> {
    if (Array.isArray(repoId)) {
      return await this.branchRepo.find({
        where: [{ repositoryId: In(repoId) }],
      });
    }
    return await this.branchRepo.findBy({ repository: { id: repoId } });
  }

  public async getBranchByName(name: string): Promise<BranchEntity> {
    return await this.branchRepo.findOneBy({ name: name });
  }

  public async createBranch(
    repositoryId: string,
    name: string,
  ): Promise<string> {
    const newBranch = await this.branchRepo.save({
      name: name,
      repository: { id: repositoryId },
    });
    return newBranch.id;
  }
}
