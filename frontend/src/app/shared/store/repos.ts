import { ProjectItemDto, ReposService } from '@shared/api';
import { action, makeAutoObservable, observable } from 'mobx';

export class ReposStore {
  public isLoading: boolean = false;
  public repos: ProjectItemDto[] = [];

  constructor() {
    makeAutoObservable(this, {
      repos: observable
    });
  }

  public fetchRepos(): void {
    if (this.isLoading || this.repos.length > 0) {
      return;
    }

    this.isLoading = true;

    ReposService.reposControllerGetRepos().then(
      action(result => {
        this.repos = result.projects ?? [];
        this.isLoading = false;
      })
    );
  }
}
