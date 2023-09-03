import {ClassConstructor, instanceToPlain, plainToInstance} from 'class-transformer';
import {isUppercase} from "class-validator";

export type DateTimeUnit = 's' | 'h' | 'd' | 'm' | 'y';
export type TimeInUnit = { value: number; unit: DateTimeUnit };
const TimeInUnitRegex = /^(\d+)([shdmy])/;


export const getMongoURI = (
  username: string,
  password: string,
  host: string,
  port: string,
  dbName: string,
  auth: string
): string => `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=${auth}`;

export function getRabbitMQConnectionString({user, password, host, port}): string {
  return `amqp://${user}:${password}@${host}:${port}`;
}

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
}

export function fillPlain<T>(someDto: T): object {
  return instanceToPlain(someDto, {exposeUnsetFields: false});
}

export function parseTime(time: string): TimeInUnit {
  const match = TimeInUnitRegex.exec(time);

  if (!match) {
    throw new Error(`[parseTime] Bad time string: ${time}`);
  }

  const [, valueRaw, unitRaw] = match;
  const value = parseInt(valueRaw, 10);
  const unit = unitRaw as DateTimeUnit;

  if (isNaN(value)) {
    throw new Error(`[parseTime] Can't parse value count. Result is NaN.`);
  }

  return { value, unit }
}

export function envStyleToCamelCase(env: string, firsUpper: number) {
  return env.toLowerCase().split('_').map((item, index) =>
  index < firsUpper ? item : item[0].toUpperCase().concat(item.substring(1))).join('');
}

export function camelCaseToEnvStyle(camel: string, prefix: string) {
  return `${ prefix ? `${prefix.toUpperCase()}_` : ''}${camel.split('').map((letter, index) =>
    isUppercase(letter) && index > 0 ? `_${letter}` : letter).join('').toUpperCase()}`;
}
