import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import '../../index.css';
import Pagination from './Pagination';

export default {
  title: 'Pagination',
  component: Pagination,
  argTypes: {
    currentPage: {
      description: 'The current page',
    },
    total: {
      description: 'The total number of items',
    },
    pageSize: {
      description: 'The number of items per page',
    },
    onPageChange: {
      description: 'The function to call when the page changes',
    },
    siblingCount: {
      description: 'The number of siblings to show',
    },
  },
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => {
  const [page, setPage] = useState<number>(1);
  const { currentPage, onPageChange, ...rest } = args;

  return <Pagination currentPage={page} onPageChange={(pageNumber) => setPage(pageNumber)} {...rest} />;
};

export const PaginationPanel = Template.bind({});

PaginationPanel.args = {
  pageSize: 10,
  total: 100,
  siblingCount: 1,
};
