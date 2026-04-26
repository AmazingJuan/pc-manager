// Author: Juan Pablo Avendaño

// -------------------------------
// Third-Party Imports
// -------------------------------
import { BadRequestException } from '@nestjs/common';

export class WarrantyDatesUtil {
  static isWarrantyOnOrAfterPurchase(purchase: Date, warranty: Date): boolean {
    return new Date(warranty).getTime() >= new Date(purchase).getTime();
  }

  static assertWarrantyOnOrAfterPurchase(purchase: Date, warranty: Date): void {
    if (!WarrantyDatesUtil.isWarrantyOnOrAfterPurchase(purchase, warranty)) {
      throw new BadRequestException(
        'Warranty expiration must be on or after purchase date',
      );
    }
  }
}
