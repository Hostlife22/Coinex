import { ComponentMeta, ComponentStory } from '@storybook/react';
import Ptag from './Ptag';

export default {
  title: 'Typography/Ptag',
  component: Ptag,
  argTypes: {
    size: {
      description: 'Paragraph options',
    },
    children: { name: 'text' },
  },
} as ComponentMeta<typeof Ptag>;

const Template: ComponentStory<typeof Ptag> = (args) => <Ptag {...args} />;

export const Paragraph = Template.bind({});

Paragraph.args = {
  children: 'Ptag',
  size: 'l',
};
