import { setAmount } from '@/redux/feature/cart/cartSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const Count = ({ product }) => {
    const dispatch = useDispatch()
    const [counter, setCounter] = useState(1)

    useEffect(() => {
        dispatch(setAmount({amount:counter}))
    },[counter, dispatch])

    return (
        <div className="mt-10">
            <h3 className="text-sm font-medium text-gray-900">Count</h3>
            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-4">
                <button
                    type='button'
                    data-action="decrement"
                    className="basis-1/6 rounded-md border-2 border-gray-200 bg-white text-gray-900 hover:bg-gray-50 h-full w-20 rounded-l cursor-pointer outline-none"
                    onClick={_ => setCounter(counter < 2 ? 1 :counter - 1)}
                >
                    <span className="m-auto text-2xl font-thin">−</span>
                </button>
                <input type="number" className="basis-1/6 focus:outline-none text-center w-full bg-white text-gray-900  md:text-basecursor-default flex items-cente  outline-none"
                    name="custom-input-number"
                    value={counter}                    
                    readOnly                    
                />
                <button
                    type='button'
                    data-action="increment"
                    className="basis-1/6 rounded-md border-2 border-gray-200 bg-white text-gray-900 hover:bg-gray-50 h-full w-20 rounded-r cursor-pointer"
                    onClick={_ => setCounter(counter > 9 ? 10 : counter + 1)}
                >
                    <span className="m-auto text-2xl font-thin">+</span>
                </button>
            </div>
        </div>
    )
}

export default Count