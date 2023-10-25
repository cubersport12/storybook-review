import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '@dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@entities';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  public async validateUser(
    username: string,
    password: string,
  ): Promise<UserDto> {
    const found = await this.usersRepository.findOneBy({
      username: username,
      password: password,
    });
    if (found) {
      return { username, password };
    }
    return null;
  }

  public login(user: UserDto): string {
    return this.jwtService.sign({ username: user.username });
  }
}
