import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

export class SocketIoAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }

  handleRequest(err, user, info, context) {
    const isPublic =
      this.reflector.get<boolean>('is-public', context.getHandler()) ||
      this.reflector.get<boolean>('is-public', context.getClass());
    if (!isPublic && (err || !user)) {
      throw err || new UnauthorizedException();
    }
    return user || null;
  }
}
