import { Public } from '@entities';
import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
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

  @Get(':repoId/:branchId/:fileName')
  @Public()
  @ApiSecurity('basic')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  public async storyDist(
    @Res() response: Response,
    @Param('repoId') repoId: string,
    @Param('branchId') branchId: string,
    @Param('fileName') fileName?: string,
  ) {
    console.info(repoId, branchId, fileName);
    const path = await this.storiesRepo.unzipDist(repoId, branchId);
    return response.sendFile(join(path, fileName ?? 'index.html'));
  }
}
