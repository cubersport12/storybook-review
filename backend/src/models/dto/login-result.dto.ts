import { ApiProperty } from '@nestjs/swagger';

export class LoginResultDto {
  @ApiProperty({
    description: 'Токен',
    nullable: false,
  })
  access_token: string;
}
