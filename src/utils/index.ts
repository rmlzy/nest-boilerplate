const dayjs = require('dayjs');

export const isDevelop = () => process.env.NODE_ENV === 'development';

export const getTimestamp = (date?: string) => {
  const d = dayjs(date);
  return d.unix();
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export * from './hasher';
