import { BranchDto, BranchesService } from '@shared/api';
import { action, makeAutoObservable, observable } from 'mobx';

export class BranchesStore {
  public isLoading: boolean = false;
  public branches: BranchDto[] | undefined;

  constructor() {
    makeAutoObservable(this, {
      isLoading: observable,
      branches: observable,
      fetchBranchesByRepos: action
    });
  }

  public fetchBranchesByRepos(ids: string[]): void {
    if (this.isLoading || (this.branches != null && this.branches.length > 0)) {
      return;
    }

    this.isLoading = true;

    BranchesService.branchesControllerGetBranchesByRepoIds({ reposIds: ids }).then(
      action(result => {
        this.branches = result.map(x => x.branches).flat();
        this.isLoading = false;
      })
    );
  }
}
