import React from 'react'
import type { Route } from '../+types/root';
import { pizzaData } from '../data';
import PizzaCard from '~/components/PizzaCard';


export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Fast React Pizza Co." },
        { name: "description", content: "Simple React Pizza App" },
    ];
}

function Menu() {
    return (
        <div className='items-center flex flex-col gap-4'>
            <h2 className='text-2xl uppercase border-t-2 border-b-2 py-4 px-0'>
                Our Menu
            </h2>
            <p className='text-center w-[80]'>
                Authentic Italian cuisine. 6 creative dishes to choose from. All from our stone oven, all organic, all delicious.
            </p>
            <div className='grid gap-4 grid-cols-2'>
                {pizzaData && pizzaData.map(pizza => (
                    <PizzaCard key={pizza.name} pizza={pizza} />
                ))}
            </div>
        </div>
    )
}

export default Menu