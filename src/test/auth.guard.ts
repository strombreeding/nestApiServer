import { Observable } from "rxjs";
import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { TestService } from "./test.service";
import { IsEmpty } from "class-validator";

@Injectable()
export class AuthGuard implements CanActivate {
  // auth validate 를 할 service 설정. service설정
  // refresh토큰 재발급 로직도있는 모듈을 불러와야함.
  constructor(private authService: TestService) {}
  //
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    return this.validateRequest(req);
  }

  private async validateRequest(req: any) {
    if (!Object.keys(req.headers).includes("authorization")) {
      throw new BadRequestException("똑바로 보내라 토큰");
    }
    const jwtString = req.headers.authorization.split("Bearer ")[1];
    const a = await this.authService.validate(jwtString);
    req.headers.user = a;
    return true;
  }
}
