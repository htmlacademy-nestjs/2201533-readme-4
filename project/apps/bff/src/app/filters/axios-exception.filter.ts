import {ArgumentsHost, Catch, ExceptionFilter, HttpStatus} from '@nestjs/common';
import { Response } from 'express';
import { AxiosError } from 'axios';

const INTERNAL_SERVER_ERROR_MESSAGE = 'Internal server error';

@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {

  makeMessage = (error: AxiosError) => {
    return {
      error: error.cause.message,
      url: error.config.url
    };
  }
  catch(error: AxiosError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const statusText = error.response?.statusText || INTERNAL_SERVER_ERROR_MESSAGE;
    const message = error.response ? error.response.data['message'] : this.makeMessage(error);
    response
      .status(status)
      .json({
        statusCode: status,
        statusText,
        message
      });
  }
}
