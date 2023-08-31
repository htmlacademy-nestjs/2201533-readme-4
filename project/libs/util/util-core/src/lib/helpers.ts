import {ClassConstructor, instanceToPlain, plainToInstance} from 'class-transformer';

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
