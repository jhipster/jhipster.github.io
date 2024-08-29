import type { ModuleDownloadsChart } from '@site/src/types/marketplace';
import { EChart } from '@kbox-labs/react-echarts';

type Props = {
  downloads: ModuleDownloadsChart[];
};

export default function MarketplaceDetailsChart({ downloads }: Props) {
  if (!downloads.length) return null;

  return (
    <EChart
      renderer={'svg'}
      style={{
        height: '300px',
        width: '100%',
      }}
      grid={{
        left: 40,
        top: 40,
        right: 0,
        bottom: 40,
      }}
      xAxis={{
        type: 'category',
        boundaryGap: false,
      }}
      yAxis={{
        type: 'value',
      }}
      textStyle={{
        color: '#fff',
      }}
      series={[
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
      ]}
    />
  );
}
