import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a username'],
    },
    email: {
      type: String,
      required: [true, 'Please provide a email'],
      unique: [true, 'Email is already in use'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
    },
    image: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = models.users || model('users', UserSchema);
export default User;
