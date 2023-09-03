import {Controller, Inject} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {appsConfig} from '@project/config/config-modules';
import {ConfigType} from '@nestjs/config';
import {UploadedFileRdo} from '@project/shared/shared-dto';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('upload')
@Controller('files')
export class FilesController {
  constructor(
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
  ) {}

  public async upload(file: Express.Multer.File): Promise<UploadedFileRdo> {
    const uploadUrl = this.config.files;
    const form = new FormData();
    form.append('file', new Blob([file.buffer]), file.originalname);
    const image = await this.httpService.axiosRef.post(
      `${uploadUrl}/upload`, form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      });
    return image.data;
  }
}
