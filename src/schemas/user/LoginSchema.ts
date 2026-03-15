// Author: Juan Pablo Avendaño

// -------------------------------
// Third-Party Imports
// -------------------------------
import * as yup from 'yup';

export const LoginSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores'),
  password: yup.string().required('Password is required'),
  //.min(8, 'Password must be at least 8 characters'),
});
