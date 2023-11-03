import { Injectable } from '@nestjs/common';
import {
  BranchesRepoService,
  RepositoriesRepoService,
  StoriesDistRepoService,
} from '@repositories';
import { distFolder, unzipBuffer } from '@utils';
import { join } from 'path';
import { existsSync } from 'fs';

@Injectable()
export class StoriesDistService {
  constructor(
    private readonly distService: StoriesDistRepoService,
    private readonly repoService: RepositoriesRepoService,
    private readonly branchesService: BranchesRepoService,
  ) {}

  public async unzipDist(repoId: string, branchId: string) {
    const repo = await this.repoService.findReporById(repoId);
    const branches = await this.branchesService.getBranches(repoId);
    const branch = branches.find((x) => x.id === branchId);
    const dist = await this.distService.getDistByBranchId(branchId);
    const r = join(distFolder, repo.name, branch.name);
    if (existsSync(r)) {
      return r;
    }
    await unzipBuffer(dist.buffer, r);
    return r;
  }
}
