import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';
import {UserType} from '@project/shared/shared-types';

export type UserDocument = HydratedDocument<UserModel>;

@Schema({
  timestamps: true,
  collection: 'users',
})
export class UserModel implements UserType {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  avatarId: string;

  @Prop({ required: true, default: 0})
  postsCount: number;

  @Prop({ required: true, default: 0})
  followersCount: number;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
