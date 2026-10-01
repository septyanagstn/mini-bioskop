import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '@prisma/client';
import { compare, hash } from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { AuthenticatedUser } from './interfaces/authenticated-user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const email = signupDto.email.trim().toLowerCase();
    const passwordHash = await hash(signupDto.password, 12);

    const generatedId = BigInt(Date.now());     

    try {
      const user = await this.prisma.user.create({
        data: {
          id: generatedId,
          email,
          password: passwordHash,
          role: UserRole.USER,
        },
        select: { id: true, email: true, role: true },
      });

      return this.issueToken({
        user_id: user.id.toString(),
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      if (this.isUniqueConstraintError(error)) {
        throw new ConflictException('An account with this email already exists');
      }
      throw error;
    }
  }

  async validateCredentials(email: string, password: string): Promise<AuthenticatedUser> {
    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new UnauthorizedException('Invalid email or password');
    }

    const user = await this.prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {
      user_id: user.id.toString(),
      email: user.email,
      role: user.role,
    };
  }

  async login(user: AuthenticatedUser) {
    return this.issueToken(user);
  }

  private async issueToken(user: AuthenticatedUser) {
    const accessToken = await this.jwtService.signAsync({
      sub: user.user_id,
      email: user.email,
      role: user.role,
    });

    return {
      access_token: accessToken,
      user,
    };
  }

  private isUniqueConstraintError(error: unknown): boolean {
    return typeof error === 'object'
      && error !== null
      && 'code' in error
      && error.code === 'P2002';
  }
}
