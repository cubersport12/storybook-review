import { ApiProperty } from '@nestjs/swagger';

export class StoryItemDto {
  @ApiProperty()
  public id: string;
  @ApiProperty()
  public name: string;
  @ApiProperty()
  public status: number;
  @ApiProperty()
  public reviewerId: string;
}
