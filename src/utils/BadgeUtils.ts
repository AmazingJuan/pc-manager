export class BadgeUtils {
  private static readonly badgeConfig: Record<string, Record<string, { label: string; badgeClass: string }>> = {
    component: {
      available: { label: 'Available', badgeClass: 'bg-green-500/10 text-green-500 border-green-500/20' },
      'in-use': { label: 'In Use', badgeClass: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
      maintenance: { label: 'Maintenance', badgeClass: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
      damaged: { label: 'Damaged', badgeClass: 'bg-red-500/10 text-red-500 border-red-500/20' },
    },
    computer: {
      active: { label: 'Active', badgeClass: 'bg-green-500/10 text-green-500 border-green-500/20' },
      inactive: { label: 'Inactive', badgeClass: 'bg-gray-500/10 text-gray-500 border-gray-500/20' },
      maintenance: { label: 'Maintenance', badgeClass: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
    },
    user: {
      admin: { label: 'Administrator', badgeClass: 'bg-primary/10 text-primary border-primary/20' },
      user: { label: 'User', badgeClass: 'bg-secondary text-foreground border-border' },
    },
  };

  static getBadgeLabel(entity: string, value: string): string {
    return BadgeUtils.badgeConfig[entity]?.[value]?.label ?? value;
  }

  static getBadgeClass(entity: string, value: string): string {
    return BadgeUtils.badgeConfig[entity]?.[value]?.badgeClass ?? '';
  }
}
