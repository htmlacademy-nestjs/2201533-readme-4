import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Subscriber } from '@project/shared/shared-types';

const SUBSCRIBERS_COLLECTION_NAME = 'email-subscribers';

@Schema({
  collection: SUBSCRIBERS_COLLECTION_NAME,
  timestamps: true,
})
export class EmailSubscriberModel extends Document implements  Subscriber {
  @Prop()
  public email: string;

  @Prop()
  public name: string;
}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscriberModel);
