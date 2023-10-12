import {
  Injectable,
  Logger,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy } from 'passport-local';
import { User } from 'src/db/entities/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super();
  }

  async validate(phoneOrEmail: string, password: string): Promise<any> {
    try {
      const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const phoneReg = /^1[3456789]\d{9}$/;
      if (!emailReg.test(phoneOrEmail) && !phoneReg.test(phoneOrEmail))
        throw new UnauthorizedException(
          'Please input correct mobile phone number or email address.',
        );
      const user = await this.userRepository.findOne({
        where: [{ email: phoneOrEmail }, { mobilePhone: phoneOrEmail }],
      });

      if (!user) {
        this.logger.debug(`user is NOT Found.`);
        throw new UnauthorizedException('User is NOT FOUND.');
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new UnauthorizedException('Invalid password.');

      return user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
