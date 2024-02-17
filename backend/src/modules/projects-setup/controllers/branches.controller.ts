import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { BranchesRepoService } from '@repositories';
import { BranchDto, CreateBranchDto, RepoBranchDto } from '@dto';
import { Public } from '@entities';
import { Mappers } from '@types';
import { groupBy, map } from 'lodash';

@ApiTags('branches')
@ApiBearerAuth()
@Controller('branches')
export class BranchesController {
  constructor(private branchRepo: BranchesRepoService) {}

  @Get('list/:repoId')
  @Public()
  @ApiSecurity('basic')
  @ApiResponse({
    status: HttpStatus.OK,
    type: BranchDto,
    isArray: true,
  })
  public async getBranches(
    @Param('repoId') repoId: string,
  ): Promise<BranchDto[]> {
    const branches = await this.branchRepo.getBranches(repoId);
    return branches.map((x) => Mappers.branchEntityToDto(x));
  }

  @Post('listByReporIds/:ids')
  @Public()
  @ApiSecurity('basic')
  @ApiResponse({
    status: HttpStatus.OK,
    type: RepoBranchDto,
    isArray: true,
  })
  public async getBranchesByRepoIds(
    @Param('ids') ids: string[],
  ): Promise<RepoBranchDto[]> {
    const branches = await this.branchRepo.getBranches(ids);
    const result = map(
      groupBy(branches, (x) => x.repositoryId),
      (branches, repoId) => {
        return {
          repoId,
          branches,
        } as RepoBranchDto;
      },
    );
    console.info(result);
    return result;
  }

  @Post()
  @Public()
  @ApiResponse({
    status: HttpStatus.OK,
  })
  public async createBranch(@Body() request: CreateBranchDto): Promise<string> {
    const res = await this.branchRepo.createBranch(
      request.repositoryId,
      request.branchName,
    );
    return res;
  }
}
