import React, { useState } from 'react';
import './ProdusctsTable.scss';
const productsTable = props => {
    return (
        <div className="products-group">
            {props.data.map((prod, index) =>
                <div key={index} className="single-product" onClick={() => props.handelClick(prod.id, prod.name, prod.price, index)}>
                    <h3 className="product-title">{prod.name}</h3>
                    <h3 className="product-price">{prod.price}</h3>
                </div>
            )
            }

        </div>
    );
};



export default productsTable;
