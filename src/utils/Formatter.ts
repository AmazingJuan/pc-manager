// Author: Juan Pablo Avendaño & Andru Quiroz

export class Formatter {
  static dateToString(value: Date): string {
    return value.toISOString().split('T')[0] ?? '';
  }

  static formatDate(value: Date): string {
    return new Intl.DateTimeFormat('es-CO', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(value);
  }
}
