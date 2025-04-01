import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import './ProductList.css';
import { decrementQuantity, incrementQuantity } from "./plantSlice";


const Product = () => {
    const plantItems = useSelector((state) => state.plant);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (index) => {
        dispatch(decrementQuantity(index));
    }

    const handleAddToCart = (index) => {
        dispatch(incrementQuantity(index));
    }
    const groupedPlants = plantItems.reduce((acc, plant, index) => {
        if (!acc[plant.category]) {
            acc[plant.category] = [];
        }
        acc[plant.category].push({ ...plant, actualIndex: index }); // Add actual index
        console.log("grouped");
        return acc;
    }, {});


    return (
        <div className="items-information">
            <div id="plant" className="plant_container container_main">


                <div>
                    {Object.keys(groupedPlants).map((category, catIndex) => (
                        <div key={catIndex}>
                            <h2 className="category">{category}</h2>
                            <div className="venue_selection">
                                {groupedPlants[category].map((item, index) => (
                                    <div className="venue_main" key={category + index}>
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
                    ))}
                </div>

            </div>


        </div>
    )
};

export default Product;
