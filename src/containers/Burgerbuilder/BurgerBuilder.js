import React, { Component } from 'react';
import Aux from '../../hoc/auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildConrols from '../../components/Burger/BuildControls/BuildConrols';

const INGREDIENTS_PRICE = {
    salad: 0.4,
    bacon: 1.2,
    cheese: 0.6,
    meat: 3
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const newtotalPrice = this.state.ingredients.totalPrice + INGREDIENTS_PRICE[type];
        this.setState({ingredients: updatedIngredients, totalPrice: newtotalPrice});
    }

    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        if(oldCount === 0) return;
        const updatedCount = oldCount -1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const newtotalPrice = this.state.ingredients.totalPrice - INGREDIENTS_PRICE[type];
        this.setState({ingredients: updatedIngredients, totalPrice: newtotalPrice});
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] <= 0);
        }
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildConrols 
                    ingredientsAdded={this.addIngredientHandler}
                    ingredientsRemoved={this.removeIngredientHandler} 
                    disabled={disabledInfo}
                    />
            </Aux>
        )
    }
}

export default BurgerBuilder;