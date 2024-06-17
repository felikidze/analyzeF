import {FC} from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface IDomainChartProps {
    title: string;
    item: Record<string, number>;
}

const DomainChart: FC<IDomainChartProps> = ({title, item}) => {
    const itemClone = {...item};
    delete itemClone.id;

    const labels = Object.keys(itemClone)
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: title,
        },
      },
    };

    const data = {
      labels,
      datasets: [
        {
          label: 'Количество страниц',
          data: Object.values(itemClone),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };

    return <Bar options={options} data={data} />;
};

export default DomainChart;