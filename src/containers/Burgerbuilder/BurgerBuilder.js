import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildConrols from '../../components/Burger/BuildControls/BuildConrols';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    

    state = {
        purchaseclick: false,
        loading: false
    }

    // componentDidMount(){
    //     axios.get('https://burger-app-25f89.firebaseio.com/ingredients.json')
    //         .then(response => {
    //             this.setState({ ingredients: response.data });
    //         })
    // }

    updatePurchaseState (ingredients){
        const sum = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey];
            })
            .reduce((sum, el) => {
                return sum += el;
            }, 0)
        return sum > 0;
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
        this.setState({ loading: true });
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] <= 0);
        }
        let orderSummary = null;       

        if(this.state.loading){
            orderSummary = <Spinner />;
        }
        
        let burger = this.state.error ? <p>Nie można załadować składników</p> : <Spinner />;

        if(this.props.ings){
            orderSummary =  <OrderSummary 
                                ingredients={this.props.ings} 
                                summary={this.props.prc}
                                modalClosed={this.purchaseCancelHandler} 
                                purchaseContinue={this.purchaseContinueHandler}/>

            burger = (
                <Fragment>
                   <Burger ingredients={this.props.ings} />
                   <BuildConrols 
                       ingredientsAdded={this.props.onIngridientAdded}
                       ingredientsRemoved={this.props.onIngridientRemoved} 
                       disabled={disabledInfo}
                       curentPrice={this.props.prc}
                       purchaseable={this.updatePurchaseState(this.props.ings)}
                       ordered={this.purchaseHandler}
                       />
               </Fragment>
            );
        }        

        return(
            <Fragment>
                <Modal show={this.state.purchaseclick} modalClosed={this.purchaseCancelHandler}>
                    { orderSummary }
                </Modal>
                { burger }                
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        prc: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngridientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngridientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));