import React from 'react';
import classes from './OrderSummary.css';
import Aux from  '../../../hoc/auxiliary';
import Button from '../../../components/UI/Button/Button'

const orderSummary = props => {
    const ingridentSummary = Object.keys(props.ingredients).map(
        igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: "capitalize"}}>{igKey}</span>: 
                    {props.ingredients[igKey]}
                </li>
            );
        }
    )
    return (
        <Aux>
            <h3>Twoje zamówienie</h3>
            <p>Wypasiony mega burger z:</p>
            <ul>
                { ingridentSummary }
            </ul>
            <p>Zajebiście, zamawiam!</p>
            <Button cliced={props.modalClosed} btnType="Danger">Anuluj</Button>
            <Button btnType="Success">Zatwierdź</Button>
        </Aux>
    )
}

export default orderSummary;