import { ComponentMeta, ComponentStory } from '@storybook/react';
import { v4 } from 'uuid';
import DonutChart from './DonutChart';

export default {
  title: 'DonutChart',
  component: DonutChart,
  argTypes: {},
} as ComponentMeta<typeof DonutChart>;

const Template: ComponentStory<typeof DonutChart> = (args) => <DonutChart {...args} />;

export const Default = Template.bind({});

const data = Array(10)
  .fill(0)
  .map((_, i) => ({
    item: v4().slice(0, 5),
    value: Math.random() * (10 - 1) + 1,
    id: String(i),
  }));

Default.args = {
  data,
  total: 100,
};
