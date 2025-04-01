import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import './ProductList.css';
import { decrementQuantity, incrementQuantity } from "./plantSlice";

export default function ProductList({ handlePageChange }) {
    const [showCart, setshowCart] = useState(false);
    const plantItems = useSelector((state) => state.plant);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (index) => {
        dispatch(decrementQuantity(index));
    }

    const handleAddToCart = (index) => {
        dispatch(incrementQuantity(index));
    }
    const groupedPlants = plantItems.reduce((acc, plant) => {
        if (!acc[plant.category]) {
            acc[plant.category] = [];
        }
        acc[plant.category].push(plant);
        return acc;
    }, {});

    const getCartCount = () => {
        let cost = 0
        plantItems.forEach((item) => {
            if (item.quantity > 0) {
                cost += item.quantity;
            }
        });
        return cost;
    }

    const cartCount = getCartCount();
    console.log('Total Cart: ' + cartCount);

    return (
        <>
            <navbar className="navbar_nursery">
                <div className='navbar_logo'>
                    <div>
                        <img style={{ width: '75px', height: '75px', padding: '10px' }}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlLJhMATCi-q5yaz_noMXS0i5yVliHOEqGVA&s"
                            alt="logo"
                            onClick={() => handlePageChange('landing')} />
                    </div>
                    <div className='company_logo' onClick={() => handlePageChange('landing')}>Paradise Nursery</div>
                </div>
                <div className="left_navbar">
                    <div className="nav_links">
                        <h4>Plant</h4>
                    </div>
                    <div className="nav_links">
                        <a href="#" onClick={() => setshowCart(!showCart)} >
                            <img src='https://cdn.pixabay.com/photo/2014/06/19/00/59/shopping-cart-371979_1280.png' alt='Cart'
                                width={50} height={50}></img>{cartCount}</a>
                    </div>
                </div>
            </navbar>

            <div className="main_container">


                <div className="items-information">
                    <div id="venue" className="venue_container container_main">

                        {/*    <div className="venue_selection"> */}

                        <div>
                            {Object.keys(groupedPlants).map((category, catIndex) => (
                                <div key={catIndex}>
                                    <h2 className="category">{category}</h2>
                                    <div className="venue_selection">
                                        {groupedPlants[category].map((item, index) => (
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
                                                    onClick={() => handleAddToCart(index)}
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/*   </div> */}
                        <div className="total_cost">Total Cost: ${0}</div>
                    </div>


                </div>
            </div>
        </>
    )
}
