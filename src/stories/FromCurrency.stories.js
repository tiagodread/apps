import React from 'react';

import FromCurrency from '../components/Exchange/FromCurrency/FromCurrency';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Exchange/FromCurrency',
  component: FromCurrency,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <FromCurrency {...args} />;

export const USD = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
USD.args = {
  fromCurrency: 'USD',
};