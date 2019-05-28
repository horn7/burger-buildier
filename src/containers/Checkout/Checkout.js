import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Checkout extends Component {

    componentWillMount(){
        this.props.onInitPurchase();
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace( '/checkout/contact-data' );
    }

    render () {
        let summary = <Redirect to="" />;
        if(this.props.ings) {
            summary = (
                <div>
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        render={(props) => (<ContactData ingredients={this.props.ings} price={this.props.prc} {...props} />)} />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        prc: state.burgerBuilder.totalPrice
    }
}

const mapDispatchProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchProps)(Checkout);