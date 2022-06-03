import React from 'react';

import Exchange from '../components/Exchange/Exchange.js';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Exchange/Exchange',
  component: Exchange,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Exchange {...args} />;

export const CurrencyConverter = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
CurrencyConverter.args = {
  fromCurrency: 'USD',
  toCurrency: 'BRL',
};