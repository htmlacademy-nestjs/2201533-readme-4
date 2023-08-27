import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const NonFile = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return (request.file.originalname === null && request.file.size === 0);
  },
);
