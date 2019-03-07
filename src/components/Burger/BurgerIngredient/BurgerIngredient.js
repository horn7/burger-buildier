import React, { Component} from 'react';
import PropTypes from 'prop-types';
import classes from './BurgerIngredient.css';

class BurgerIngredient extends Comment {
    render(){
        let ingredient = null;

        // eslint-disable-next-line default-case
        switch(this.props.type){
            case ('bread-top'):
                ingredient = (
                    <div className={classes.BreadBottom}>  
                        <dic className={classes.Seeds1}></dic>
                        <dic className={classes.Seeds2}></dic>
                    </div>
                )
                break;
            case ('bread-bottom'):
                ingredient = <div className={classes.BreadBottom}></div>;
                break;        
            case ('Meet'):
                ingredient = <div className={classes.Meet}></div>;
                break;
            case ('Cheese'):
                ingredient = <div className={classes.Cheese}></div>;
                break;
            case ('Salad'):
                ingredient = <div className={classes.Salad}></div>;
                break;
            case ('Bacon'):
                ingredient = <div className={classes.Bacon}></div>;
                break;
            default: break;
        }

        return ingredient;
    }
}

BurgerIngredient.PropTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredient;