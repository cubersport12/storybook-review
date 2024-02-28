import { Public } from '@entities';
import { Controller, Get, HttpStatus, Param, Req, Res } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { StoriesDistService } from '../services/stories-dist.service';
import { join } from 'path';

@ApiTags('dist')
@ApiBearerAuth()
@Controller('stories-dist')
export class StoriesDistController {
  constructor(private storiesRepo: StoriesDistService) {}

  private getPathToFolder(branchId: string, url: string): string {
    const params = url.split('/');
    const startIndex = params.indexOf(branchId);
    return join(...params.slice(startIndex + 1).map((x) => x.split('?').at(0)));
  }

  @Get(':repoId/:branchId/**')
  @Public()
  @ApiSecurity('basic')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  public async storyDist(
    @Res() response: Response,
    @Req() request: Request,
    @Param('repoId') repoId: string,
    @Param('branchId') branchId: string,
  ) {
    const pathToFile = this.getPathToFolder(branchId, request.url);
    const path = await this.storiesRepo.unzipDist(repoId, branchId);
    return response.sendFile(join(path, pathToFile));
  }
}
