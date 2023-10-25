import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BuildItemDto } from '@dto';
import { BuildsRepoService } from '@repositories';
import { Public } from '@entities';
import { Mappers } from '@types';

@Controller('builds')
@ApiTags('builds')
@ApiBearerAuth()
export class BuildsController {
  constructor(private buildsRepo: BuildsRepoService) {}

  @Get(':branchId')
  @Public()
  @ApiResponse({
    status: HttpStatus.OK,
    type: BuildItemDto,
    isArray: true,
  })
  public async getBuilds(
    @Param('branchId') branchId: string,
  ): Promise<BuildItemDto[]> {
    const builds = await this.buildsRepo.getBuildsByBranch(branchId);
    return builds.map((x) => Mappers.buildEntityToDto(x));
  }
}
