import { ApiProperty } from '@nestjs/swagger';

export class CreateRepoDto {
  @ApiProperty({ description: 'Имя репозитория', nullable: false })
  public readonly name: string;
}
