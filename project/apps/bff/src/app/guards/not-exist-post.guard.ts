import {CanActivate, ExecutionContext, Inject, Injectable} from "@nestjs/common";
import {BffService} from "../bff.service";
import {appsConfig} from "@project/util/util-core";
import {ConfigType} from "@nestjs/config";
import {NotExistsPostException} from "@project/util/util-core";

@Injectable()
export class NotExistPost implements CanActivate {
  constructor(
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
    private readonly bffService: BffService
  ) {}
  async canActivate(context:ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const idPost = context.getClass().name === 'CommentsController' ? req.body.idPost : req.params.id;
    const foundPost = await this.bffService.findPost(parseInt(idPost, 10));
    if (!foundPost) {
      throw new NotExistsPostException(idPost);
    }

    return true;
  }
}
