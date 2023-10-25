import { Injectable } from '@nestjs/common';
import { BranchEntity, BuildEntity } from '@entities';
import { findLast, orderBy, maxBy } from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BuildsRepoService {
  constructor(
    @InjectRepository(BuildEntity)
    private readonly buildRepo: Repository<BuildEntity>,
    @InjectRepository(BranchEntity)
    private readonly branchRepo: Repository<BranchEntity>,
  ) {}

  public async getBuildsByBranch(branchId: string): Promise<BuildEntity[]> {
    return await this.buildRepo.findBy({ branch: { id: branchId } });
  }

  public async findBuildBy(data: BuildEntity): Promise<BuildEntity> {
    return await this.buildRepo.findOneBy(data);
  }

  public async getLastBuildInBranch(branchId: string): Promise<BuildEntity> {
    const builds = await this.buildRepo.findBy({
      branchId: branchId,
    });
    const sorted = orderBy(builds, (x) => x.id);
    return maxBy(sorted, (x) => x.id);
  }

  public async getPrevBuild(id: number): Promise<BuildEntity> {
    const currBuild = await this.buildRepo.findOneBy({ id: id });
    const builds = await this.buildRepo.findBy({
      branchId: currBuild.branchId,
    });
    const sorted = orderBy(builds, (x) => x.id);
    const prev = findLast(sorted, (x) => x.id < currBuild.id);
    return prev;
  }

  public async getBuildById(buildId: number): Promise<BuildEntity> {
    return await this.buildRepo.findOneBy({ id: buildId });
  }

  public async createBuild(
    branchName: string,
    build?: Omit<BuildEntity, 'id'>,
  ): Promise<number> {
    const branch = await this.branchRepo.findOneBy({ name: branchName });
    const lastBuild = await this.getLastBuildInBranch(branch.id);
    const newBuild = await this.buildRepo.save({
      lastChanged: build?.lastChanged ?? new Date(),
      name: build?.name ?? `Сборка ${lastBuild?.id ?? 0 + 1}`,
      branch: {
        id: branch.id,
      },
    });
    return newBuild.id;
  }
}
