import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const QueryRaw = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.url.substring(request.url.indexOf('?'));
  },
);
