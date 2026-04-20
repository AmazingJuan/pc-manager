// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
// -------------------------------
import type { ComponentType } from '@app-types/Components';

// -------------------------------
// Third-Party Imports
// -------------------------------
import * as yup from 'yup';

const componentStatuses: ComponentType[] = ['available', 'in-use', 'maintenance', 'damaged'];

export const ComponentSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters').max(100, 'Name must be at most 100 characters'),
  status: yup.string().required('Status is required').oneOf(componentStatuses, 'Status is not valid'),
  type: yup.string().required('Type is required').min(2, 'Type must be at least 2 characters').max(60, 'Type must be at most 60 characters'),
  manufacturer: yup
    .string()
    .required('Manufacturer is required')
    .min(2, 'Manufacturer must be at least 2 characters')
    .max(80, 'Manufacturer must be at most 80 characters'),
  model: yup.string().required('Model is required').min(1, 'Model must be at least 1 character').max(80, 'Model must be at most 80 characters'),
  serialNumber: yup
    .string()
    .required('Serial number is required')
    .min(3, 'Serial number must be at least 3 characters')
    .max(100, 'Serial number must be at most 100 characters'),
  purchaseDate: yup
    .string()
    .required('Purchase date is required')
    .test('is-valid-date', 'Purchase date is not valid', (value) => {
      if (!value) {
        return false;
      }

      return !Number.isNaN(new Date(value).getTime());
    }),
  price: yup.number().typeError('Price must be a valid number').required('Price is required').min(0, 'Price cannot be negative'),
});
