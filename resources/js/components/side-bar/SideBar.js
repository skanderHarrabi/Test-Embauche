import React, { useEffect, useState } from 'react';
import icon from '../../icons/delete.png';
import './SideBar.scss';
import { Alert } from 'antd';


const SideBar = props => {
    // const [test, setTest] = useState([{ name: 'aze', price: 77 }]);

    // useEffect(() => {
    //     console.log(test);
    // }, []);

    const handelDelete = (index) => {
        let total_to_delete = 0;
        props.prods.map(p => {
            if (p.index === index) total_to_delete += p.total;
        })
        props.setProds(
            props.prods.filter(product => product.index !== index)
        );
        console.log(total_to_delete);
        props.setTotal(props.total - total_to_delete);
    }

    const handleCancel = () => {
        console.log(props.prods);
    }

    return (
        <div className="sideBar">

            <div className="title">
                <h1 className="gray-text text-uppercase">ticket</h1>
            </div>
            <div className="products-box" id="style-2">
                <div className="menu">
                    <h4 className="menu-item-title gray-text">product</h4>
                    <h4 className="menu-item-title gray-text">Price</h4>
                    <h4 className="menu-item-title gray-text">Qte</h4>
                    <h4 className="menu-item-title gray-text">Total</h4>
                </div>
                <div className="products-items">
                    {
                        props.prods.map((d, index) =>
                            <div key={index} className="product-item">
                                <img src={icon} onClick={() => handelDelete(d.index)} />
                                <h4 className="gray-text">{d.name}</h4>
                                <h4 className="gray-text">{d.price}</h4>
                                <h4 className="gray-text">{d.qte}</h4>
                                <h4 className="gray-text">{d.total} TND</h4>
                            </div>)
                    }
                </div>
            </div>

            <div className="total">
                <h4 className="total-item gray-text text-uppercase">total</h4>
                <h4 className="total-item gray-text">{props.total} TND</h4>
            </div>

            <div className="actions">
                <button className="btn-cancel" onClick={props.handleCancel}><span className="strong">Cancel</span></button>
                <button className="btn-pay" onClick={props.handlePay} ><span className="strong">Pay</span></button>

            </div>
            {props.alert === true ? <Alert
                message="error"
                description="Nothing to buy"
                closable
                style={{ marginTop: '20px', marginBottom: '20px' }}
                type="error"
                onClose={props.handlClose}
                showIcon
            /> : ''
            }
        </div>
    );
};

export default SideBar;
