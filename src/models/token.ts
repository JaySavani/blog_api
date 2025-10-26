import { Schema, model, Types } from 'mongoose';

interface IToken {
  userId: Types.ObjectId;
  token: string;
}

const tokenSchema = new Schema<IToken>({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default model<IToken>('Token', tokenSchema);
