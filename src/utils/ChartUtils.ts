import type { ChartOptions } from 'chart.js';

type ChartExtra = Record<string, unknown>;

export class ChartUtils {
  static getBaseChartOptions(extra: ChartExtra = {}) {
    const plugins = extra.plugins as ChartExtra | undefined;
    const legend = plugins?.legend as ChartExtra | undefined;
    const tooltip = plugins?.tooltip as ChartExtra | undefined;

    return {
      responsive: true,
      maintainAspectRatio: false,
      ...extra,
      plugins: {
        legend: { labels: { color: '#a3a3a3' }, ...legend },
        tooltip: { backgroundColor: '#1a1a1a', borderColor: '#2a2a2a', borderWidth: 1, titleColor: '#ffffff', bodyColor: '#ffffff', ...tooltip },
      },
    };
  }

  static getBaseAxisOptions(extra: ChartExtra = {}) {
    const ticks = extra.ticks as ChartExtra | undefined;
    const grid = extra.grid as ChartExtra | undefined;

    return { ...extra, ticks: { color: '#a3a3a3', ...ticks }, grid: { color: '#2a2a2a', ...grid } };
  }

  static getBarChartOptions(extra: ChartExtra = {}): ChartOptions<'bar'> {
    const scales = extra.scales as ChartExtra | undefined;

    return {
      ...this.getBaseChartOptions(extra),
      scales: { x: this.getBaseAxisOptions(), y: this.getBaseAxisOptions({ beginAtZero: true }), ...scales },
    };
  }

  static getLineChartOptions(extra: ChartExtra = {}): ChartOptions<'line'> {
    const scales = extra.scales as ChartExtra | undefined;

    return {
      ...this.getBaseChartOptions(extra),
      scales: { x: this.getBaseAxisOptions(), y: this.getBaseAxisOptions({ beginAtZero: true }), ...scales },
    };
  }

  static getPieChartOptions(extra: ChartExtra = {}): ChartOptions<'pie'> {
    return { ...this.getBaseChartOptions(extra) };
  }

  static buildBarDataset(label: string, data: number[], extra: ChartExtra = {}) {
    return { label, data, backgroundColor: '#dc2626', borderRadius: 8, ...extra };
  }

  static buildLineDataset(label: string, data: number[], extra: ChartExtra = {}) {
    return { label, data, borderColor: '#dc2626', backgroundColor: '#dc2626', tension: 0.35, pointRadius: 4, pointHoverRadius: 6, ...extra };
  }

  static buildPieDataset(data: number[], backgroundColor: string[], extra: ChartExtra = {}) {
    return { data, backgroundColor, borderWidth: 0, hoverOffset: 15, ...extra };
  }
}
