// Author: Juan Pablo Avendaño

export class Formatter {
  static dateToString(value: Date): string {
    return value.toISOString().split('T')[0] ?? '';
  }
}
