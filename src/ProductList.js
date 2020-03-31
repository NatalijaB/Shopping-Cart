import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Product from './Product'


export default function ProductList(props) {
    const {products, cartProducts, setCartProducts, reduceQuantity} = props
    const productList = products.map(prod => (
        <Grid
            zeroMinWidth
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={3}
            key={prod.id}
            >
            <Product
                id={prod.id}
                desc={prod.desc}
                src={prod.photo}
                price={prod.price}
                quantity={prod.quantity}
                key={prod.id}
                cartProducts={cartProducts}
                setCartProducts={setCartProducts}
                reduceQuantity={reduceQuantity}
            />
        </Grid>
    ))
    return (
        <Box
        width="75%"
        mx="auto"
            style={{ marginTop: "20px" }}>
            <Grid
                container
                spacing={3}>
                {productList}
            </Grid>
        </Box>
    )
}
