import { ApiProperty } from '@nestjs/swagger';

export class CreateBranchDto {
  @ApiProperty({
    description: 'Ид  репо, где ветка будет создана',
    nullable: false,
  })
  public readonly repositoryId: string;
  @ApiProperty({ description: 'Имя ветки', nullable: false })
  public readonly branchName: string;
}
