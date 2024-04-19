import React from 'react';
import { useRecoilValue } from 'recoil';
import { currentOrderPriceSelector } from '../../states/orderState';

const OrderFinal: React.FC = () => {
  const currentPrice = useRecoilValue(currentOrderPriceSelector);

  console.log(currentPrice);

  return (
    <div>
      <h1>Finalize your order</h1>
    </div>
  );
}

export default OrderFinal;