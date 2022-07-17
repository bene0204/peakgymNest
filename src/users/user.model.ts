import mongoose from 'mongoose';
import validator from 'validator';

export const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate(email: string) {
        if (!validator.isEmail(email)) {
          throw new Error('Nem megfelelő email cím.');
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
    },

    phoneNumber: {
      type: String,
      trim: true,
    },
    balance: {
      type: Number,
      default: 0,
    },

    role: {
      type: String,
      default: 'basic',
    },
    memberShip: [
      {
        starts: Date,
        expires: Date,
        name: String,
        occasionsLeft: Number,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  balance: number;
  role: string;
  memberShip?: {
    starts: Date;
    expires: Date;
    name: string;
    occassionsLeft?: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
