import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRepoDto, ListProjectsDto, ProjectItemDto } from '@dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '@entities';
import { RepositoriesRepoService } from '@repositories';
import { Mappers } from '@types';

@ApiTags('repos')
@Controller('repos')
@ApiBearerAuth()
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

  @Post('generate')
  @ApiResponse({
    type: ProjectItemDto,
  })
  public async generateRepo(@Body() cmd: CreateRepoDto) {
    const newName = cmd.name ?? 'Без имени';
    const newProject = await this.service.createRepository({ name: newName });

    const dto: ProjectItemDto = Mappers.repoEntityToDto({
      id: newProject,
      name: newName,
    });
    return dto;
  }
}
