import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest()
      const jwt = request.headers.authorization.split(" ")[1]
      //const jwt = request.cookies['jwt']

      if (!jwt) {
        throw new UnauthorizedException({ message: "Unauthorized User" })
      }

      const user = this.jwtService.verifyAsync(jwt)

      if (!user) {
        throw new UnauthorizedException({ message: "Unauthorized User" })
      }

      request.user = user

      return true
    }
    catch (e) {
      throw new HttpException("Access restricted", HttpStatus.FORBIDDEN)
    }
  }
}