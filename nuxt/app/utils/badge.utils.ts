// Author: Juan Pablo Avendaño

// -------------------------------
// Own Imports
import type { ComputerStatus } from '#shared/types/computer-status.type';

export class BadgeUtils {
  static readonly statusLabels: Record<ComputerStatus, string> = { active: 'Active', inactive: 'Inactive', maintenance: 'Maintenance' };

  static readonly statusClasses: Record<ComputerStatus, string> = {
    active: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
    inactive: 'border-zinc-500/30 bg-zinc-500/10 text-zinc-300',
    maintenance: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
  };
}
