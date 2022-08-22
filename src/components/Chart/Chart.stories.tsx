import { ComponentMeta, ComponentStory } from '@storybook/react';
import Chart from './Chart';

export default {
  title: 'Chart',
  component: Chart,
  argTypes: {
    data: {
      description: 'Data to be plotted',
    },
  },
} as ComponentMeta<typeof Chart>;

const Template: ComponentStory<typeof Chart> = (args) => <Chart {...args} />;

export const Default = Template.bind({});

Default.args = {
  data: Array(10)
    .fill(0)
    .map((each, index) => ({
      value: String(Math.random() * (10 - 1) + 1),
      date: new Date().toISOString().substr(0, 10),
    })),
};
