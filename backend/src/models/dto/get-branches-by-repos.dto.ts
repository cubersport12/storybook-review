import { ApiProperty } from '@nestjs/swagger';

export class GetBranchesByRepoIdsQuery {
  @ApiProperty({ description: 'Иды репов', nullable: false })
  public readonly reposIds: string[];
}
