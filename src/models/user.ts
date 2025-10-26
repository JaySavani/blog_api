import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
export interface IUser {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  firstName?: string;
  lastName?: string;
  socialLinks?: {
    website?: string;
    x?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      max: [20, 'Username must be less than 20 characters'],
      unique: [true, 'Username must be unique'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      max: [50, 'Email must be less than 50 characters'],
      unique: [true, 'Email must be unique'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: {
        values: ['user', 'admin'],
        message: '{VALUE} is not a valid role',
      },
      default: 'user',
    },
    firstName: {
      type: String,
      maxLength: [20, 'First name must be less than 20 characters'],
    },
    lastName: {
      type: String,
      maxLength: [20, 'Last name must be less than 20 characters'],
    },
    socialLinks: {
      website: {
        type: String,
        maxLength: [100, 'Website address must be less than 100 characters'],
      },
      x: {
        type: String,
        maxLength: [100, 'X profile url must be less than 100 characters'],
      },
      facebook: {
        type: String,
        maxLength: [
          100,
          'Facebook profile url must be less than 100 characters',
        ],
      },
      instagram: {
        type: String,
        maxLength: [
          100,
          'Instagram profile url must be less than 100 characters',
        ],
      },
      linkedin: {
        type: String,
        maxLength: [
          100,
          'LinkedIn profile url must be less than 100 characters',
        ],
      },
      youtube: {
        type: String,
        maxLength: [
          100,
          'YouTube channel url must be less than 100 characters',
        ],
      },
    },
  },
  {
    timestamps: true,
  },
);
// don't use arrow function here to access 'this' because it behaves differently
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>('User', userSchema);
