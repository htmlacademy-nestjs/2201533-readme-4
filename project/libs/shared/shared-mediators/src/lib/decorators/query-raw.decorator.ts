import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const QueryRaw = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const index = request.url.indexOf('?')
    return index > -1 ? request.url.substring(index) : '';
  },
);
