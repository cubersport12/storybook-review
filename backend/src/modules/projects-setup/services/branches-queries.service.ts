import { Injectable } from '@nestjs/common';
import { BranchesRepoService, StoriesDistRepoService } from '@repositories';
import { BranchDto } from '@dto';

@Injectable()
export class BranchesQueriesService {
  constructor(
    private readonly branchesRepo: BranchesRepoService,
    private readonly distRepo: StoriesDistRepoService,
  ) {}

  public async getBranches(repoId: string | string[]): Promise<BranchDto[]> {
    const ids = Array.isArray(repoId) ? repoId : [repoId];
    if (!ids || ids.length === 0) {
      return [];
    }
    const t = await this.distRepo.load(ids);
    return t.map((x) => {
      return {
        id: x.branch.id,
        user: x.owner,
        name: x.branch.name,
        lastPublished: x.timestamp,
        repositoryId: x.branch.repositoryId,
      };
    });
  }
}
