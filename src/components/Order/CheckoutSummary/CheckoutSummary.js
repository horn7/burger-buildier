import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css'

const checkoutSummary = props => {
    return(
        <div className={classes.CheckoutSummary}>
            <h1>Mamy nadzieję, że smakowało! Jak nie to zaraz się policzymy ]:)</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger">Żartowałem...</Button>
            <Button btnType="Success">Biere!</Button>
        </div>
    );
}

export default checkoutSummary;