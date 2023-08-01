import {ClassConstructor, plainToInstance} from 'class-transformer';

export const getMongoURI = (
  username: string,
  password: string,
  host: string,
  port: string,
  dbName: string,
): string => `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=admin`;

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
}
