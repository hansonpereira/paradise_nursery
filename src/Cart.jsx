import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import './ProductList.css';
import { decrementQuantity, incrementQuantity } from "./plantSlice";


const Cart = () => {
    const plantItems = useSelector((state) => state.plant);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (index) => {
        dispatch(decrementQuantity(index));
    }

    const handleAddToCart = (index) => {
        dispatch(incrementQuantity(index));
    }

    //const selectedPlants = plantItems.filter(plant => plant.qunatity > 0);

    const selectedPlants = plantItems
        .map((plant, index) => ({ ...plant, actualIndex: index })) // Add original index
        .filter(plant => plant.quantity > 0); // Filter condition


    return (
        <div className="items-information">
            <div id="plant" className="plant_container container_main">


                <div>

                    <div key={1}>
                        <h2 className="category">{ }</h2>
                        <div className="venue_selection">
                            {selectedPlants.map((item, index) => (
                                <div className="venue_main" key={index}>
                                    <div className={item.sale ? "sale-tag" : "sale-tag-no"}>
                                        {item.sale ? "SALE" : ""}
                                    </div>
                                    <div className="boldtext">{item.name}</div>
                                    <div className="img">
                                        <img src={item.img} alt={item.name} />
                                    </div>
                                    <div className="costtext">${item.cost}</div>
                                    <div className="infotext">{item.info}</div>
                                    <button
                                        className={item.quantity > 0 ? "btn-warning btn-disabled" : "btn-warning btn-plus"}
                                        onClick={() => handleAddToCart(item.actualIndex)}
                                    >
                                        {item.quantity > 0 ? 'Added to Cart' :
                                            'Add to Cart'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>


        </div>
    )
};

export default Cart;
