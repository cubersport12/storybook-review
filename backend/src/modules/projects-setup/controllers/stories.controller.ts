import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BuildItemDto, StoryItemDto } from '@dto';
import { Public } from '@entities';
import { StoriesRepoService } from '@repositories';
import { Mappers } from '@types';

@Controller('stories')
@ApiTags('stories')
export class StoriesController {
  constructor(private storiesRepo: StoriesRepoService) {}

  @Get(':buildId')
  @Public()
  @ApiResponse({
    status: HttpStatus.OK,
    type: BuildItemDto,
    isArray: true,
  })
  public async getStories(
    @Param('buildId') buildId: number,
  ): Promise<StoryItemDto[]> {
    const result = await this.storiesRepo.getStories(buildId);
    return result.map((x) => Mappers.storyItemEntityToDto(x));
  }
}
