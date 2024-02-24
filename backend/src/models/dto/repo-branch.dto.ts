import { ApiProperty } from '@nestjs/swagger';
import { BranchDto } from './branch.dto';

export class RepoBranchDto {
  @ApiProperty()
  public repoId: string;
  @ApiProperty({
    type: BranchDto,
    isArray: true,
  })
  public branches: BranchDto[];
}
