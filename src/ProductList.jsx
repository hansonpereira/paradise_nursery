import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Cart from './Cart';
import { decrementQuantity, incrementQuantity, initialiseOrder } from "./plantSlice";
import Product from './Product';
import TotalCost from './TotalCost';

import './ProductList.css';

const ProductList = ({ handlePageChange }) => {
    const [showCart, setshowCart] = useState(false);
    const [showCheckout, setshowCheckout] = useState(false);
    const plantItems = useSelector((state) => state.plant);
    const dispatch = useDispatch();

    const handleInitialiseOrder = () => {
        dispatch(initialiseOrder());
        setshowCart(false);
        setshowCheckout(false);
        handlePageChange('landing')

    }

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

    const getCartCount = () => {
        let qty = 0

        plantItems.forEach((item) => {
            if (item.quantity > 0) {
                qty += item.quantity;
            }
        });
        return qty;
    }


    const activateProductList = () => {
        setshowCart(false);
    }

    const toggleCheckout = () => {
        setshowCheckout(!showCheckout);
    }

    const selectedPlants = plantItems
        .map((plant, index) => ({ ...plant, actualIndex: index })) // Add original index
        .filter(plant => plant.quantity > 0); // Filter condition

    const getCartTotal = () => {
        let cost = 0

        plantItems.forEach((item) => {
            if (item.quantity > 0) {
                cost += (item.quantity * item.cost);
            }
        });
        return cost;
    }

    const handleCartPage = () => {
        setshowCart(true);
        setshowCheckout(false);
    }

    const cartCount = getCartCount();
    const cartTotal = getCartTotal();
    console.log('Total Cart: ' + cartCount + ', $' + cartTotal);


    const ItemsDisplay = () => {

        return <>
            <div className="display_box1">
                {selectedPlants.length === 0 && <p>No items selected</p>}
                <table className="table_item_data">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Unit Cost</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedPlants.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>${item.cost}</td>
                                <td>
                                    {item.quantity}
                                </td>
                                <td>{item.cost * item.quantity}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    };

    return (
        <>
            <navbar className="navbar_nursery">
                {/* Left Section - Profile Image & Company Info */}
                <div className="navbar_logo">
                    <div>
                        <img
                            style={{ width: '75px', height: '75px', padding: '10px', borderRadius: '50%' }}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlLJhMATCi-q5yaz_noMXS0i5yVliHOEqGVA&s"
                            alt="profile"
                            onClick={() => handleInitialiseOrder()}
                        />
                    </div>
                    <div className="company_info" onClick={() => handleInitialiseOrder()}>
                        <div className="company_logo">Paradise Nursery</div>
                        <div className="slogan">Where Green Meets Serenity</div>
                    </div>
                </div>

                {/* Center Section - Page Title */}
                <div className="page_heading">
                    <h4>{!showCart ? 'Plants' : showCheckout ? 'Checkout' : 'Cart'}</h4>
                </div>

                {/* Right Section - Cart */}
                <div className="cart_link">
                    <a href="#" className='cart-link-a' onClick={() => handleCartPage()}>
                        {cartCount}
                    </a>
                </div>
            </navbar>

            {!showCart && <div className="main_container">
                <Product />
            </div>
            }

            {showCart && !showCheckout && <div className="main_container">
                <Cart activateProductList={activateProductList} toggleCheckout={toggleCheckout} />
            </div>
            }
            {showCheckout && <div className="total_amount_detail">
                <TotalCost totalCosts={cartTotal}
                    ItemsDisplay={() => <ItemsDisplay />} />
            </div>}
        </>
    )
};

export default ProductList;
