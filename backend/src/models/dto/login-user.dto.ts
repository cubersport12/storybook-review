import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'Имя пользователя',
    nullable: false,
  })
  public readonly username: string;

  @ApiProperty({
    description: 'Хэш пароля',
    nullable: false,
  })
  public readonly password: string;
}
