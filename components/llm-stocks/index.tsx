'use client';

import dynamic from 'next/dynamic';
import { StockSkeleton } from './stock-skeleton';
import { StocksSkeleton } from './stocks-skeleton';

export { spinner } from './spinner';
export { BotCard, BotMessage, SystemMessage } from '../shared/message';

const Stock = dynamic(() => import('./stock').then(mod => mod.Stock), {
  ssr: false,
  loading: () => <StockSkeleton />,
});

const Stocks = dynamic(() => import('./stocks').then(mod => mod.Stocks), {
  ssr: false,
  loading: () => <StocksSkeleton />,
});

export { Stock, Stocks };
