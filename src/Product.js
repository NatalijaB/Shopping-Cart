import React, { useState } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core';
import styles from './styles/ItemStyles'
import useToggle from './hooks/useToggle'

function Product(props) {
    const { src, desc, id, quantity, price, classes, cartProducts, setCartProducts, updateQuantity } = props;

    const [amount, setAmount] = useState(1)
    const [openSnack, toggleOpenSnack] = useToggle(false)

    function addToCart() {
        updateCart()
        updateQuantity(id, amount)
        toggleOpenSnack()
        setAmount(1)
    }

    function addAmount() {
        amount < quantity ? setAmount(amount + 1) : setAmount(quantity)
    }
    function reduceAmount() {
        amount <= 1 ? setAmount(1) : setAmount(amount - 1)
    }

    function updateCart() {
        if (cartProducts.some(prod => prod.id === id)) {
            const updatedCart = cartProducts.map(prod =>
                (prod.id === id ? { ...prod, quantity: prod.quantity + amount } : prod))
            setCartProducts(updatedCart)
        } else {
            setCartProducts([...cartProducts, { id: id, quantity: amount, desc: desc, src: src, price: price }])
        }
    }
    return (
        <div>
            <Card
                className={classes.Product}
            >
                <CardActionArea>
                    <CardMedia
                        image={src}
                        title={desc}
                        className={classes.CardImg}
                    />
                    <CardContent
                        className={classes.CardContent}
                    >
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="h2">
                            {desc}
                        </Typography>
                        <Typography
                            color="textSecondary" component="p">
                            <span>Price:</span>
                                RSD {price}.00
                            </Typography>
                        <Typography color="textSecondary" component="p">
                            <span>Available Quantity:</span>
                            {quantity}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions
                    className={classes.CardButtons}
                >
                    <Button
                        aria-label="reduce"
                        onClick={reduceAmount}
                    >
                        <RemoveIcon fontSize="small" />
                    </Button>
                    <Typography
                        component="span"
                    >
                        {amount}
                    </Typography>
                    <Button
                        onClick={addAmount}
                        aria-label="increase"
                    >
                        <AddIcon fontSize="small" />
                    </Button>
                    <Button
                        onClick={addToCart}
                        size="medium"
                        color="primary" variant="contained"
                        id="addToCart"
                    >
                        Add To Cart
                        </Button>
                </CardActions>
            </Card>

            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                open={openSnack}
                autoHideDuration={3000}
                message={<span id="message-id">Added To Cart!</span>}
                ContentProps={{
                    "aria-describedby": "message-id"
                }}
                action={[
                    <IconButton onClick={toggleOpenSnack} color="inherit" key="close" aria-label="close">
                        <CloseIcon />
                    </IconButton>
                ]}
                onClose={toggleOpenSnack}
            />
        </div>
    )
}

export default withStyles(styles)(Product)
