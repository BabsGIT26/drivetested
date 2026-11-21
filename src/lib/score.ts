/** Color tier for a DriveTested research score (green / amber / orange). */
export function scoreTier(score: number): { cls: 'tier-a' | 'tier-b' | 'tier-c'; label: string } {
  if (score >= 9) return { cls: 'tier-a', label: 'Excellent' };
  if (score >= 8.5) return { cls: 'tier-a', label: 'Great' };
  if (score >= 7.5) return { cls: 'tier-b', label: 'Very good' };
  return { cls: 'tier-c', label: 'Good' };
}

/** Ribbon color class from an award label. */
export function awardTone(award = ''): 'overall' | 'value' | 'premium' | 'other' {
  const a = award.toLowerCase();
  if (a.includes('overall')) return 'overall';
  if (/(value|budget|cheap|afford)/.test(a)) return 'value';
  if (/(premium|upgrade|splurge|pro\b|heavy)/.test(a)) return 'premium';
  return 'other';
}
