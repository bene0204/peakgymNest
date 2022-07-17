import mongoose from 'mongoose';
import validator from 'validator';

export const MembershipSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  numberOfDays: {
    type: Number,
    required: true,
  },
  numberOfOccasion: {
    type: Number,
  },
});

export interface Membership {
  id: string;
  name: string;
  price: number;
  numberOfDays: number;
  numberOfOccasion?: number;
}
