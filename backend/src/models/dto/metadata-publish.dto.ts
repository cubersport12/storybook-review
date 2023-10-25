import { ApiProperty } from '@nestjs/swagger';
import { File } from '@types';

export class MetadataPublishDto {
  @ApiProperty({
    description: 'Ид проекта',
    nullable: false,
    required: true,
  })
  projectId: string;
  @ApiProperty({
    description: 'Файл данных',
    nullable: false,
    type: 'file',
    required: true,
  })
  file: File;
  @ApiProperty({
    description: 'Кто публикует',
    nullable: false,
    required: true,
  })
  public who: string;
  @ApiProperty({
    description: 'С какой ветки',
    nullable: false,
    required: true,
  })
  public branchName: string;
}
