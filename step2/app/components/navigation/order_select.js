import React from 'react';

const OrderSelect = () => (
    <select className={'form-control'} id='order-option'>
        <option value='distance'>Du plus proche au plus loin</option>
        <option value='grade'>Du mieux au moins bien noté</option>
    </select>
);

export default OrderSelect;