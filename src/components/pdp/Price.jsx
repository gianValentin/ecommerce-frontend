import React from 'react'

const Price = ({ product }) => {



    return (
        <>
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">{product?.price ? `S/. ${product.price.price}` : `Price not Found`}</p>
        </>
    )
}

export default Price