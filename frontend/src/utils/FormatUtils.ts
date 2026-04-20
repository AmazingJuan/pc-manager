// Author: Juan Pablo Avendaño & Andru Quiroz

export class FormatUtils {
  private static readonly locale = 'es-CO';

  static dateToString(value: string | Date | null | undefined): string {
    if (!value) {
      return '';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return '';
    }

    return date.toISOString().split('T')[0] ?? '';
  }

  static formatDate(value: string | Date | null | undefined): string {
    if (!value) {
      return '-';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return '-';
    }

    return date.toLocaleDateString(FormatUtils.locale, { year: 'numeric', month: 'short', day: 'numeric' });
  }

  static formatDateTime(value: string | Date | null | undefined): string {
    if (!value) {
      return '-';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return '-';
    }

    return date.toLocaleString(FormatUtils.locale, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  static formatCurrency(value: number | null | undefined, currency = 'USD'): string {
    if (value === null || value === undefined || Number.isNaN(value)) {
      return '-';
    }

    return new Intl.NumberFormat(FormatUtils.locale, { style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
      value,
    );
  }

  static formatNumber(value: number | null | undefined): string {
    if (value === null || value === undefined || Number.isNaN(value)) {
      return '-';
    }

    return new Intl.NumberFormat(FormatUtils.locale).format(value);
  }

  static formatPercentage(value: number | null | undefined, digits = 1): string {
    if (value === null || value === undefined || Number.isNaN(value)) {
      return '-';
    }

    return `${value.toFixed(digits)}%`;
  }
}
