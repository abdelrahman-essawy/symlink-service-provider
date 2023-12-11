import { BidContext } from '@/contexts/bid-context';
import { useContext } from 'react';

export const useBid = () => useContext(BidContext);
