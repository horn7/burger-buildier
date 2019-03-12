import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ( props ) => {
    console.log(Object.keys( props.ingredients ));
    let transformedIngredients = Object.keys( props.ingredients )
        .map( igKey => {
            return [...Array( props.ingredients[igKey] )].map( ( _, i ) => { // _ - underscore - nazwa bez roznicy, robienie pustej tablic z x elementami [..Array(x)]
                return <BurgerIngredient key={igKey + i} type={igKey} />; // musi być klucz!
            } );
        } )
        .reduce((arr, el) => { 
            return arr.concat(el) // redukuje, concat - łączenie tablicy arr z tablica el
        }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;