import React, { Component } from 'react';
// import classes from './OrderSummary.css';
import Aux from  '../../../hoc/auxiliary';
import Button from '../../../components/UI/Button/Button'

class OrderSummary extends Component {
    render(){
        const ingridentSummary = Object.keys(this.props.ingredients).map(
            igKey => {
                return (
                    <li key={igKey}>
                        <span style={{textTransform: "capitalize"}}>{igKey}</span>: 
                        {this.props.ingredients[igKey]}
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
                <p><strong>{this.props.summary.toFixed(2)}</strong></p>
                <p>Zajebiście, zamawiam!</p>
                <Button clicked={this.props.modalClosed} btnType="Danger">Anuluj</Button>
                <Button clicked={this.props.purchaseContinue} btnType="Success">Zatwierdź</Button>
            </Aux>
        )
    }
}

export default OrderSummary;