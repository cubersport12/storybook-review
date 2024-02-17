import { ApiProperty } from '@nestjs/swagger';

export class ProjectItemDto {
  @ApiProperty({
    description: 'Ид проекта',
    nullable: false,
  })
  public id: string;
  @ApiProperty({
    description: 'Имя проекта',
    nullable: true,
  })
  public name: string;
  @ApiProperty({
    description: 'Изображение проекта',
    nullable: true,
  })
  public image: string;
}
