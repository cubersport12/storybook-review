import { ApiProperty } from '@nestjs/swagger';

export class BranchDto {
  @ApiProperty()
  public id: string;
  @ApiProperty({ description: 'Имя ветки' })
  public name: string;
  @ApiProperty({ description: 'Ид репо, где эта ветка находится' })
  public repositoryId: string;
  @ApiProperty({ description: 'Последнее время публикации' })
  public lastPublished: Date;
  @ApiProperty({ description: 'Кто опубликовал' })
  public user: string;
}
