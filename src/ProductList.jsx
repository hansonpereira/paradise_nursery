import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Cart from './Cart';
import { decrementQuantity, incrementQuantity } from "./plantSlice";
import Product from './Product';
import './ProductList.css';

const ProductList = ({ handlePageChange }) => {
    const [showCart, setshowCart] = useState(false);
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
                {/* Left Section - Profile Image & Company Info */}
                <div className="navbar_logo">
                    <div>
                        <img
                            style={{ width: '75px', height: '75px', padding: '10px', borderRadius: '50%' }}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlLJhMATCi-q5yaz_noMXS0i5yVliHOEqGVA&s"
                            alt="profile"
                            onClick={() => handlePageChange('landing')}
                        />
                    </div>
                    <div className="company_info" onClick={() => handlePageChange('landing')}>
                        <div className="company_logo">Paradise Nursery</div>
                        <div className="slogan">Where Green Meets Serenity</div>
                    </div>
                </div>

                {/* Center Section - Page Title */}
                <div className="page_heading">
                    <h4>{showCart ? 'Cart' : 'Plant'}</h4>
                </div>

                {/* Right Section - Cart */}
                <div className="cart_link">
                    <a href="#" className='cart-link-a' onClick={() => setshowCart(!showCart)}>
                        {cartCount}
                    </a>
                </div>
            </navbar>

            {!showCart && <div className="main_container">
                <Product />
            </div>
            }

            {showCart && <div className="main_container">
                <Cart />
            </div>
            }
        </>
    )
};

export default ProductList;
