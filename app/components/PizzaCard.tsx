import React from 'react'

import { type Pizza } from '../data';

function PizzaCard({ pizza }: { pizza: Pizza }) {
    return (
        <div className={`flex gap-3 ${pizza.soldOut ? "sold-out" : ""}`}>
            <img className='self-start aspect-square w-40' src={pizza.photoName} rel={pizza.name} />
            <div className='flex flex-col gap-1 py-1 px-0'>
                <h3>{pizza.name}</h3>
                <p>{pizza.ingredients}</p>
                <span>{pizza.soldOut ? "Sold Out" : pizza.price}</span>
            </div>
        </div>
    )
}


export default PizzaCard
