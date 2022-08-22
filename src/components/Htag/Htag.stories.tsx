import { ComponentMeta, ComponentStory } from '@storybook/react';
import Htag from './Htag';

export default {
  title: 'Typography/Htag',
  component: Htag,
  argTypes: {
    tag: {
      description: 'Header options',
    },
    children: { name: 'text' },
  },
} as ComponentMeta<typeof Htag>;

const Template: ComponentStory<typeof Htag> = (args) => <Htag {...args} />;

export const Heading = Template.bind({});

Heading.args = {
  children: 'Htag',
  tag: 'h1',
};
