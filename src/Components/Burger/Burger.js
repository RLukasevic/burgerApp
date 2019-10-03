import React from 'react';
import Ingredient from './Ingridient/Ingredient';
import styles from './Burger.module.css';


const burger = (props) => {
    //SHOK
    let transformedIngredients = Object.keys(props.ingredients).map(ingKey => {
        return [...Array(props.ingredients[ingKey])].map((_,i) => {
            return <Ingredient key={ingKey + i} type={ingKey}/>
        });
    }).reduce((arr,el) => {
        return arr.concat(el);
    }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>;
    }




    return(       
        <div className={styles.Burger}>
            <Ingredient type="bread-top" />
            {transformedIngredients}
            <Ingredient type="bread-bottom" />
        </div>
    );
}

export default burger;

