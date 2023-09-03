import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import * as process from 'process';
import {camelCaseToEnvStyle, envStyleToCamelCase} from '@project/util/util-core';
import {FIELD_SEPARATOR} from './constants';

const DEFAULT_RABBIT_PORT = 5672;
export interface Queue {
  [key: string]: {
    queue: string;
    exchange: string;
    binding: string;
  }
}

interface Options {
  bindings: Queue,
  exchanges: Set<string>
}

export interface RabbitConfig {
  host: string;
  password: string;
  user: string;
  port: number;
  bindingKeys: string;
  bindings?: Queue;
  exchanges?: string[];
}

const getExchangeErrorMessage = (error: Joi.ValidationError, prefix = '') =>
  `Expected: "${camelCaseToEnvStyle(error.details[0].context.key, prefix)}=rabbitRouting${FIELD_SEPARATOR}exchange${FIELD_SEPARATOR}queue"`;

const getErrorMessage = (error: Joi.ValidationError, prefix = '') =>
  `[Notify Config]: Environment : "${camelCaseToEnvStyle(error.details[0].context.key, prefix)}" failed validation. Please check .env file.
   Error message: ${error.message}`

const getOptionsFromRows = (rows: string[][]) => {
  const exchanges: Set<string> = new Set();
  const bindings = rows.map((row) => {
    const options = row[1].split(FIELD_SEPARATOR);
      exchanges.add(options[1]);
      return [row[0], {binding: options[0], exchange: options[1], queue: options[2]}];
  });

  const validationSchema = Joi.object()
    .keys(
      Object.fromEntries(bindings.map((item) =>
        [
          item[0],
          Joi.object().keys({
            queue: Joi.string().required(),
            exchange: Joi.string().required(),
            binding: Joi.string().required(),
          })
        ])
      )
    )

  const options = {bindings: Object.fromEntries(bindings), exchanges};
  const { error } = validationSchema.validate(options.bindings, { abortEarly: true });

  if (error) {
    throw new Error(getErrorMessage(error));
  }
  return options;
}


const getExchangeOptions = (bindingKeys: string): Options => {
  const keys = bindingKeys.split(FIELD_SEPARATOR);
  const bindingRows = keys.map((item) =>
    ([envStyleToCamelCase(item, 0), process.env[item]]));
  const bindings = Object.fromEntries(bindingRows.map((item) => ([item[0], item[1]])));
  const validationSchema = Joi.object().keys(
    Object.fromEntries(bindingRows.map((item) => [item[0], Joi.string().required()]))
  );

  const { error } = validationSchema.validate(bindings, { abortEarly: true });

  if (error) {
    throw new Error(
      `${getErrorMessage(error)}

  ${getExchangeErrorMessage(error)}
  `);
  }

  return  getOptionsFromRows(bindingRows);
}

export default registerAs('rabbit', (): RabbitConfig => {
  const  config: RabbitConfig = {
    host: process.env.RABBIT_HOST,
    password: process.env.RABBIT_PASSWORD,
    port: parseInt(process.env.RABBIT_PORT ?? DEFAULT_RABBIT_PORT.toString(), 10),
    user: process.env.RABBIT_USER,
    bindingKeys: process.env.RABBIT_BINDING_KEYS,
  };

  const validationSchema = Joi.object<RabbitConfig>({
    host: Joi.string().valid().hostname().required(),
    password: Joi.string().required(),
    port: Joi.number().port().default(DEFAULT_RABBIT_PORT),
    user: Joi.string().required(),
    bindingKeys: Joi.string().required()
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(getErrorMessage(error, 'rabbit'));
  }
  const options = getExchangeOptions(config.bindingKeys);
  return {...config, bindings: options.bindings, exchanges: Array.from(options.exchanges)};

});
