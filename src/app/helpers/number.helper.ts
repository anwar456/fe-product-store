export function formatRupiah(amount: number | string): string {
  const number = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(number)) return 'Rp 0';

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
}

export function calculateProgress(
  amount: number,
  target: number = 15_000_000
): number {
  if (!amount || isNaN(amount)) return 0;

  const percent = (amount / target) * 100;
  return Math.min(Math.round(percent), 100);
}
