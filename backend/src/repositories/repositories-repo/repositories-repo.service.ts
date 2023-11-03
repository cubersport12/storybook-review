import { Injectable } from '@nestjs/common';
import { RepositoryEntity } from '@entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RepositoriesRepoService {
  constructor(
    @InjectRepository(RepositoryEntity)
    private readonly repository: Repository<RepositoryEntity>,
  ) {}

  public async getRepositories(): Promise<RepositoryEntity[]> {
    const repos = await this.repository.find();
    return repos;
  }

  public findReporById(id: string) {
    return this.repository.findOneBy({
      id: id,
    });
  }

  public async createRepository(
    repository: Omit<RepositoryEntity, 'id'>,
  ): Promise<string> {
    const newRepo = await this.repository.save({
      name: repository.name,
      branches: [],
    });
    return newRepo.id;
  }
}
