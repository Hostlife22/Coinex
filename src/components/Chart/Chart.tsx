import { format, parseISO } from 'date-fns';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { IChartProps } from './Chart.interface';

const Chart = ({ data }: IChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 40,
          left: 40,
          bottom: 5,
        }}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
            <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <Area dataKey="value" stroke="#2451B7" fill="url(#color)" />

        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tickFormatter={(str) => {
            const date = parseISO(str);
            if (date.getDate() % 7 === 0) {
              return format(date, 'MMM, d');
            }
            return '';
          }}
        />

        <YAxis
          dataKey="value"
          axisLine={false}
          tickLine={false}
          tickCount={8}
          domain={[0, (dataMax: number) => dataMax * 2]}
          allowDataOverflow={true}
          tickFormatter={(number) => `$${number.toFixed(2)}`}
        />

        <Tooltip content={<CustomTooltip />} />

        <CartesianGrid opacity={0.1} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

function CustomTooltip({ active, payload, label }: TooltipProps<ValueType, NameType>) {
  if (active && payload && payload.length > 0) {
    return (
      <div className="tooltip">
        <h4>{format(parseISO(label), 'eeee, d MMM, yyyy')}</h4>
        <p>${payload[0]?.value ? Number(payload[0].value).toFixed(2) : '0.00'} USD</p>
      </div>
    );
  }
  return null;
}

export default Chart;
