import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context) {
    const isPublic =
      this.reflector.get<boolean>('is-public', context.getHandler()) ||
      this.reflector.get<boolean>('is-public', context.getClass());
    if (!isPublic && (err || !user || user?.isBanned)) {
      throw err || new UnauthorizedException();
    }
    return user || null;
  }
}
