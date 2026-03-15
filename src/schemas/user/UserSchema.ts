// Author: Juan Pablo Avendaño

// -------------------------------
// Third-Party Imports
// -------------------------------
import * as yup from 'yup';
import { UserService } from '@services/UserService';

function asString(value: unknown): string {
  return String(value ?? '');
}

export function createUserSchema(excludeUserId?: number) {
  return yup.object({
    name: yup
      .string()
      .required('Full name is required')
      .min(2, 'Full name must be at least 2 characters')
      .max(100, 'Full name must be at most 100 characters'),
    username: yup
      .string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be at most 20 characters')
      .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores')
      .test('is-unique-username', 'Username already exists', (value) => {
        return UserService.getInstance().isUniqueUsername(asString(value), excludeUserId);
      }),
    email: yup
      .string()
      .required('Email is required')
      .email('Email is not valid')
      .test('is-unique-email', 'Email already exists', (value) => {
        return UserService.getInstance().isUniqueEmail(asString(value), excludeUserId);
      }),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    role: yup.string().required('Role is required').oneOf(['admin', 'user'], 'Role is not valid'),
  });
}

export const UserSchema = createUserSchema();
