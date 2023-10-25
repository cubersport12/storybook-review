import { ApiProperty } from '@nestjs/swagger';

export class BuildItemDto {
  @ApiProperty()
  public id: number;
  @ApiProperty()
  public name: string;
  @ApiProperty()
  public lastChanged: Date;
  @ApiProperty()
  public storiesCount: number;
  @ApiProperty()
  public changesCount: number;
}
