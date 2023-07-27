import { Schema, model, models } from 'mongoose';

const AccountSchema = new Schema(
  {
    // userId: { type: String, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    type: { type: String },
    provider: { type: String },
    providerAccountId: { type: String },
    refresh_token: { type: String },
    access_token: { type: String },
    expires_at: { type: Number },
    token_type: { type: String },
    scope: { type: String },
    id_token: { type: String },
    session_state: { type: String },
  },
  { versionKey: false, timestamps: true }
);

const Account = models.accounts || model('accounts', AccountSchema);
export default Account;
