import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildConrols from '../../components/Burger/BuildControls/BuildConrols';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions';

class BurgerBuilder extends Component {
    

    state = {
        purchaseclick: false
    }

    componentDidMount(){
        this.props.onInitIngredient();
    }

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
        
        let burger = this.props.error ? <p>Nie można załadować składników</p> : <Spinner />;

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
                       ingredientsAdded={this.props.onIngredientAdded}
                       ingredientsRemoved={this.props.onIngredientRemoved} 
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
        prc: state.totalPrice,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredient: () => dispatch(burgerBuilderActions.initIngredient()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));