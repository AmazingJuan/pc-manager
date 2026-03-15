// Author: Juan Pablo Avendaño

// -------------------------------
// Third-Party Imports
// -------------------------------
import * as yup from 'yup';

export const ComputerSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters').max(100, 'Name must be at most 100 characters'),
  location: yup
    .string()
    .required('Location is required')
    .min(2, 'Location must be at least 2 characters')
    .max(100, 'Location must be at most 100 characters'),
  userId: yup.string().nullable(),
  status: yup.string().required('Status is required').oneOf(['active', 'inactive', 'maintenance'], 'Status is not valid'),
  purchaseDate: yup.string().required('Purchase date is required'),
  warrantyExpiration: yup
    .string()
    .required('Warranty expiration date is required')
    .test('warranty-after-purchase', 'Warranty expiration must be after purchase date', function (value) {
      const { purchaseDate } = this.parent as { purchaseDate?: string };

      if (!value || !purchaseDate) {
        return true;
      }

      return new Date(value) >= new Date(purchaseDate);
    }),
  componentIds: yup.array(yup.number()).default([]),
  notes: yup.string().max(500, 'Notes must be at most 500 characters'),
});
