import React from 'react';

function Cards({ item }) {
    console.log(item);
    return (
        <>
        <div className='mt-4 my-3 p-3'>
            <div className="card w-72 bg-base-100 shadow-xl m-2 hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white">
                <figure>
                    <img src={item.image}alt="Shoes" className="w-full h-48 object-cover" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {item.name}
                        <div className="badge badge-secondary">{item.category}</div>
                    </h2>
                    <p>{item.title}</p>
                    <div className="card-actions justify-between">
                        <div className="badge badge-outline">${item.price}</div>
                        <div className="px-1 py-0 rounded-lg border-[2px] hover: bg-green-300 hover:text-white duration-200 cursor-pointer">Buy Now</div>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}

export default Cards;
