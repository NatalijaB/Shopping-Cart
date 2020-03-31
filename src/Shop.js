import React, { useState } from 'react'
import { items } from './items'
import ProductList from './ProductList'
import Navbar from './Navbar'

export default function Shop() {

    const [products, setProducts] = useState(items)
    const [cartProducts, setCartProducts] = useState([])

    function reduceQuantity(id, amount) {
        const updatedProducts = products.map(i =>
            i.id === id ? { ...i, quantity: i.quantity - amount } : i
        )
        setProducts(updatedProducts)
    }
    function increaseQuantity(id, amount) {
        const updatedProducts = products.map(i =>
            i.id === id ? { ...i, quantity: i.quantity + amount } : i
        )
        setProducts(updatedProducts)
    }

    return (
        <div>
            <Navbar
                cartProducts={cartProducts}
                setCartProducts={setCartProducts}
                increaseQuantity={increaseQuantity}
            />
            <ProductList
                products={products}
                cartProducts={cartProducts}
                setCartProducts={setCartProducts}
                reduceQuantity={reduceQuantity}
            />
        </div>
    )
}
