import { Body, Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ListProjectsDto, ProjectItemDto } from '@dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@decorators';
import { Public, UserEntity } from '@entities';
import { RepositoriesRepoService } from '@repositories';
import { Mappers } from '@types';

@ApiTags('repos')
@Controller('repos')
export class ReposController {
  constructor(private readonly service: RepositoriesRepoService) {}

  @Get('list')
  @ApiResponse({
    type: ListProjectsDto,
  })
  @Public()
  public async getRepos() {
    const repos = await this.service.getRepositories();
    const result: ListProjectsDto = {
      projects: repos.map((x) => Mappers.repoEntityToDto(x)),
    };
    return result;
  }

  @Get('generate')
  @ApiResponse({
    type: ProjectItemDto,
  })
  public async generateRepo(@CurrentUser() user: UserEntity) {
    const newName = 'Без имени';
    const newProject = await this.service.createRepository({ name: newName });

    const dto: ProjectItemDto = Mappers.repoEntityToDto({
      id: newProject,
      name: newName,
    });
    return dto;
  }
}
