import { ProjectItemDto } from './project-item.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ListProjectsDto {
  @ApiProperty({
    description: 'Список проектов',
    nullable: true,
    isArray: true,
    type: ProjectItemDto,
  })
  public readonly projects: ProjectItemDto[];
}
