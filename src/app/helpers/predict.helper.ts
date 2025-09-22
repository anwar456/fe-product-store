/**
 * Menghitung estimasi bulan tercapai dan statusnya
 * @param totalSavings - jumlah tabungan saat ini (misal: 2000000)
 * @param goalAmount - target yang ingin dicapai (misal: 60000000)
 * @param monthlyAverage - rata-rata penambahan tabungan per bulan
 * @returns { estimatedDate: string, status: string }
 */
export function getSavingEstimation(
  totalSavings: number,
  goalAmount: number,
  monthlyAverage: number
): { estimatedDate: string; status: string } {
  if (monthlyAverage <= 0) {
    return {
      estimatedDate: '-',
      status: 'Tidak bisa diprediksi',
    };
  }

  const remaining = goalAmount - totalSavings;
  const monthsNeeded = Math.ceil(remaining / monthlyAverage);

  const now = new Date();
  now.setMonth(now.getMonth() + monthsNeeded);

  const estimatedDate = now.toLocaleDateString('id-ID', {
    month: 'long',
    year: 'numeric',
  });

  const status = monthsNeeded <= 3 ? 'Segera tercapai' : 'Masih lama';

  return { estimatedDate, status };
}
