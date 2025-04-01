import React from 'react';
import "./TotalCost.css";

const TotalCost = ({ totalCosts, ItemsDisplay }) => {



    return (
        <div className="pricing-app">
            <div className="display_box">
                <div className="header">
                    <p className="preheading"><h3>Total Order Amount</h3></p>
                </div>
                <div>
                    <h2 id="pre_fee_cost_display" className="price">
                        ${totalCosts}
                    </h2>

                    <div className="render_items">
                        <ItemsDisplay />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalCost;
