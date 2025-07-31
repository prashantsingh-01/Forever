import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'

const ProductItem = ({id,image,name,price}) => {

    const {currency} = useContext(ShopContext);

    return (
        <Link to={`/product/${id}`} className='text-gray cursor-pointer'>
            <div className='overflow-hidden'>
                <img className='hover:scale-110 transition ease-in-out ' src={image[0]} alt="Image 0" />
            </div>
            <p className='pt-3 pb-1 text-small'>{name}</p>
            <p className='text-sm font-medium'>{currency}{price}</p>
        </Link>
  )
}

export default ProductItem