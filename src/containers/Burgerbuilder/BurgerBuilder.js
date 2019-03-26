import React, { Component } from 'react';
import Aux from '../../hoc/auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildConrols from '../../components/Burger/BuildControls/BuildConrols';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICE = {
    salad: 0.4,
    bacon: 1.2,
    cheese: 0.6,
    meat: 3
};

class BurgerBuilder extends Component {
    

    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchaseclick: false,
        loading: false
    }

    componentDidMount(){
        axios.get('https://burger-app-25f89.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
    }

    updatePurchaseState (ingredients){
        const sum = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey];
            })
            .reduce((sum, el) => {
                return sum += el;
            }, 0)
        this.setState({purchaseable: (sum > 0)})
    }

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const newtotalPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];
        this.setState({ingredients: updatedIngredients, totalPrice: newtotalPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        if(oldCount === 0) return;
        const updatedCount = oldCount -1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const newtotalPrice = oldPrice - INGREDIENTS_PRICE[type];
        this.setState({ingredients: updatedIngredients, totalPrice: newtotalPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    // dummy function to wait
    sleep = ms => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    purchaseHandler = () => {
        this.setState({purchaseclick: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchaseclick: false})
    }

    purchaseContinueHandler = async () => {
        // alert('jedziemy!');
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            cunstomer: {
                name: 'test',
                adres: {
                    street: 'prosto z apki',
                    zipCode: '01-687',
                    counter: 'Warszawa'
                }
            },
            deliveryMethod: {
                service: 'Uber',
                type: 'fastest'
            }
        }
        await this.sleep(500);
        axios.post('/orders.json', order).then(response =>{
            this.setState({ loading: false });
            console.log(response)
        }).catch(error => {
            this.setState({ loading: false });
            console.log(error)
        })

    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] <= 0);
        }
        let orderSummary = null;
       

        if(this.state.loading){
            orderSummary = <Spinner />;
        }
        
        let burger = this.state.error ? <p>Nie można załadować składników</p> : <spinner />;

        if(this.state.ingredients){
            orderSummary =  <OrderSummary 
                                ingredients={this.state.ingredients} 
                                summary={this.state.totalPrice}
                                modalClosed={this.purchaseCancelHandler} 
                                purchaseContinue={this.purchaseContinueHandler}/>

            burger = (
                <Aux>
                   <Burger ingredients={this.state.ingredients} />
                   <BuildConrols 
                       ingredientsAdded={this.addIngredientHandler}
                       ingredientsRemoved={this.removeIngredientHandler} 
                       disabled={disabledInfo}
                       curentPrice={this.state.totalPrice}
                       purchaseable={this.state.purchaseable}
                       ordered={this.purchaseHandler}
                       />
               </Aux>
            );
        }        

        return(
            <Aux>
                <Modal show={this.state.purchaseclick} modalClosed={this.purchaseCancelHandler}>
                    { orderSummary }
                </Modal>
                { burger }                
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);