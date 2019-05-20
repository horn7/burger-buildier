import * as actionTypes from '../actions/actions';

const initalState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4,
};

const INGREDIENTS_PRICE = {
    salad: 0.4,
    bacon: 1.2,
    cheese: 0.6,
    meat: 3
};

const reducer = (state = initalState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: 
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT: 
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
            };
        default:
            return state;
    }
};

export default reducer;