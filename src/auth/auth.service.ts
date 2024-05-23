import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersModel } from '../users/entity/users.entity';
import { ENV_HASH_ROUND, ENV_JWT_SECRET } from '../common/const/env-keys.const';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * payLoad
   * 1) email
   * 2) sub : id
   * 3) type : 'access' | 'refresh'
   */
  signToken(user: Pick<UsersModel, 'email' | 'id'>, isRefreshToken: boolean) {
    const payload = {
      email: user.email,
      sub: user.id,
      type: isRefreshToken ? 'refresh' : 'access',
    };

    return this.jwtService.sign(payload, {
      secret: ENV_JWT_SECRET,
      expiresIn: isRefreshToken ? 3600 : 300,
    });
  }

  loginUser(user: Pick<UsersModel, 'email' | 'id'>) {
    return {
      accessToken: this.signToken(user, false),
      refreshToken: this.signToken(user, true),
    };
  }

  async authenticateWithEmailAndPassword(
    user: Pick<UsersModel, 'email' | 'password'>,
  ) {
    const existingUser = await this.usersService.getUserByEmail(user.email);
    if (!existingUser) {
      throw new UnauthorizedException('존재하지 않는 사용자 입니다.');
    }

    const passOk = await bcrypt.compare(user.password, existingUser.password);

    if (!passOk) {
      throw new UnauthorizedException('비밀번호가 틀렸습니다.');
    }

    return existingUser;
  }

  async loginWithEmail(user: Pick<UsersModel, 'email' | 'password'>) {
    const existingUser = await this.authenticateWithEmailAndPassword(user);

    return this.loginUser(existingUser);
  }

  async registerWithEmail(
    user: Pick<UsersModel, 'nickname' | 'email' | 'password'>,
  ) {
    const hash = await bcrypt.hash(user.password, Number(ENV_HASH_ROUND));

    const newUser = await this.usersService.createUser({
      ...user,
      password: hash,
    });

    return this.loginUser(newUser);
  }

  extractTokenFromHeader(rowToken: string, isBearer: boolean) {
    const splitToken = rowToken.split(' ');

    const prefix = isBearer ? 'Bearer' : 'Basic';

    if (splitToken.length !== 2 || splitToken[0] !== prefix) {
      throw new UnauthorizedException('잘못된 토큰 형식입니다.');
    }

    return splitToken[1];
  }

  decodeBasicToken(rowToken: string) {
    const decodedToken = Buffer.from(rowToken, 'base64').toString('utf8');
    const splitDecodedToken = decodedToken.split(':');

    if (splitDecodedToken.length !== 2) {
      throw new UnauthorizedException('잘못된 Basic token 형식입니다');
    }

    return {
      email: splitDecodedToken[0],
      password: splitDecodedToken[1],
    };
  }

  verifyToken(token: string) {
    return this.jwtService.verify(token, {
      secret: ENV_JWT_SECRET,
    });
  }

  rotateToken(token: string, isRefreshToken: boolean) {
    const decoded = this.jwtService.verify(token, {
      secret: ENV_JWT_SECRET,
    });

    if (decoded.type !== 'refresh') {
      throw new UnauthorizedException(
        '토큰 재 발급은 refresh 토큰으로만 가능합니다.',
      );
    }
    return this.signToken(
      {
        ...decoded,
      },
      isRefreshToken,
    );
  }
}
