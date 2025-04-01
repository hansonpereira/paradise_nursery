import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import './ProductList.css';
import { decrementQuantity, incrementQuantity, removeQuantity } from "./plantSlice";


const Cart = ({ activateProductList, toggleCheckout }) => {
    const plantItems = useSelector((state) => state.plant);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (index) => {
        dispatch(decrementQuantity(index));
    }

    const handleAddToCart = (index) => {
        dispatch(incrementQuantity(index));
    }

    const handleRemoveCart = (index) => {
        dispatch(removeQuantity(index));
    }

    //const selectedPlants = plantItems.filter(plant => plant.qunatity > 0);

    const selectedPlants = plantItems
        .map((plant, index) => ({ ...plant, actualIndex: index })) // Add original index
        .filter(plant => plant.quantity > 0); // Filter condition


    const getTotalValue = () => {
        let cost = 0
        selectedPlants.forEach((item) => {
            cost += (item.quantity * item.cost)

        });
        return cost;
    }

    const totalValue = getTotalValue();

    const ItemsDisplay = ({ items }) => {
        console.log(items);

        return <>
            <div className="display_box1">
                {items.length === 0 && <p>No items selected</p>}
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
                        {items.map((item, index) => (
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
        <div className="items-information">
            <div id="plant" className="plant_container container_main">


                <div>

                    <div key={1}>
                        <div className='totaltext'> Total Cart Amount: {totalValue}<br></br></div>
                        <div className="cart_main">
                            {selectedPlants.map((item, index) => {
                                const total = item.quantity * item.cost;
                                return (
                                    <div className="cart_main_first" key={index}>
                                        <div className="cart-img">
                                            <img src={item.img} alt={item.name} />
                                        </div>
                                        <div className="cart_main_second">

                                            <div className="totaltext">{item.name}</div>
                                            <div>${item.cost}</div>

                                            <div className="button_container">
                                                <button
                                                    className={item.quantity === 1 ? " cart-btn-success btn-disabled" : "cart-btn-success btn-plus"}
                                                    onClick={() => item.quantity > 1 ? handleRemoveFromCart(item.actualIndex) : null}
                                                >
                                                    &#8211;
                                                </button>
                                                <span className="selected_count">
                                                    {item.quantity > 0 ? ` ${item.quantity}` : "0"}
                                                </span>
                                                <button
                                                    className={"cart-btn-success btn-plus"}
                                                    onClick={() => handleAddToCart(item.actualIndex)}
                                                >
                                                    &#43;
                                                </button>

                                            </div>
                                            <div className="subtotaltext">{`Total: $${total}`}</div>
                                            <button className='delete_btn'
                                                onClick={() => handleRemoveCart(item.actualIndex)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                        <div className='cart-addl-btn-container'>
                            <button className='continue_shop_btn'
                                onClick={() => activateProductList()}
                            >
                                Continue Shopping
                            </button>
                            <button className='continue_shop_btn'
                                onClick={() => toggleCheckout()}
                            >
                                Checkout
                            </button>
                        </div>

                    </div>

                </div>

            </div>


        </div>
    )
};

export default Cart;
