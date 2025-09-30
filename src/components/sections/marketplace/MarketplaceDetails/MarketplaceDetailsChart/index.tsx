import type { SeriesOption } from 'echarts';
import type { ModuleDownloadsChart } from '@site/src/types/marketplace';
import { useMemo } from 'react';
import { EChart, EChartProps } from '@kbox-labs/react-echarts';

const eChartStaticProps: EChartProps = {
  renderer: 'svg',
  style: {
    height: '300px',
    width: '100%',
  },
  grid: {
    left: 40,
    top: 40,
    right: 0,
    bottom: 40,
  },
  xAxis: {
    type: 'category',
    axisLabel: {
      color: '#fff',
    },
    boundaryGap: false,
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      color: '#fff',
    },
  },
};

type Props = {
  downloads: ModuleDownloadsChart[];
};

export default function MarketplaceDetailsChart({ downloads }: Props) {
  if (!downloads.length) return null;

  const eChartSeries: SeriesOption[] = useMemo(
    () => [
      {
        type: 'line',
        data: downloads,
        lineStyle: {
          color: 'var(--ifm-color-primary-darkest)',
        },
        areaStyle: {
          color: 'var(--ifm-color-primary-darkest)',
        },
        silent: true,
      },
    ],
    [],
  );

  return <EChart {...eChartStaticProps} series={eChartSeries} />;
}
