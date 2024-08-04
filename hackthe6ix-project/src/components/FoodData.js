import React, {useState} from "react";
import './food-data.css';
import foodMap from "../backend-logic/hashmap";

export default function FoodData({foodInfo}){

    if(foodInfo === null){
        return(
            <div></div>
        )
    }
    return(
        <div className="food-data-body">
            <img src={foodMap.get(foodInfo.food)} />
            <div className="food-details">
                <div className="food-title">{foodInfo.food}</div>
                <div>{foodInfo.amount}</div>
                <div>{`${foodInfo.calories} calories`}</div>
                <div>{foodInfo.expiryDate}</div>
            </div>
        </div>
    )
}