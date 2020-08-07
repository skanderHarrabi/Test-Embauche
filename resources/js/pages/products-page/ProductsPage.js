import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import './ProductsPage.scss';
import { Select } from 'antd';
import axiosInstance from "../../config/axios-instance";


const ProductsPage = props => {
    const { handleSubmit, register, errors } = useForm();
    const [selected, setSelected] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [categories, setCategories] = useState([]);
    const children = [];

    useEffect(() => {
        const url = "categories/";
        axiosInstance({
            method: "get",
            url: url
        }).then(res => {
            console.log(res);
            setCategories(res.data);
        });
    }, [])

    for (let i = 10; i < 36; i++) {
        children.push(<Select.Option key={i.toString(36) + i}>{i.toString(36) + i}</Select.Option>);
    }

    const handleChange = (values) => {
        console.log(values);
        setSelected(values);
    }
    const handleSubmitPost = event => {
        event.preventDefault();
        const data = {
            name,
            price,
            selected
        }
        const url = "product";
        axiosInstance({
            method: "post",
            url: url,
            data: data
        }).then(res => {
            console.log(res.data);
            console.log("done");
            props.history.push('/');
        })
    }
    const handleInputChange = event => {
        console.log(event.target.name);
        event.target.name === 'price' ? setPrice(event.target.value) : setName(event.target.value);
    }
    return (
        <div className="page-wrapper bg-red p-t-180 p-b-100 font-robo">
            <div className="wrapper  wrapper--w680">
                <div className="card card-2">
                    <div className="card-body">
                        <h2 className="title">Add Product</h2>
                        <form onSubmit={handleSubmit(handleSubmitPost)}>
                            <div className="input-group">
                                <input className="input--style-2" onChange={handleInputChange} value={name} type="text" placeholder="Name" name="name" ref={register({
                                    required: "Name is Required"
                                })} />
                            </div>
                            <div className="error">{errors.name && errors.name.message}</div>
                            <div className="input-group">
                                <input className="input--style-2" onChange={handleInputChange} value={price} type="number" placeholder="Price" name="price" ref={register({
                                    required: "Price is Required"
                                })} />

                            </div>
                            <div className="error">{errors.price && errors.price.message}</div>
                            <Select
                                className="input--style-2"
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Please select"
                                onChange={handleChange}
                            >
                                {
                                    categories.map((cat, index) => <Select.Option value={cat.id} key={index}>{cat.name}</Select.Option>)
                                }
                            </Select>
                            <div className="p-t-30">
                                <button className="btn btn--radius btn--green" type="submit">Add</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
};


export default ProductsPage;
