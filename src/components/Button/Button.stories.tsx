import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../index.css';
import Button from './Button';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    appearance: {
      description: 'The appearance of the button',
    },
    children: { name: 'label' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  children: 'Button',
  appearance: 'primary',
};
