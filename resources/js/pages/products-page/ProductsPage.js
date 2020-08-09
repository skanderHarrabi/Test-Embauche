import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import './ProductsPage.scss';
import { Select } from 'antd';
import axiosInstance from "../../config/axios-instance";
import { Form, Input, Alert } from 'antd';


const productForm = props => {
    const [selected, setSelected] = useState([]);
    const [alert, setAlert] = useState(false);
    const { getFieldDecorator } = props.form;
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
        setSelected(values);
    }
    const handleSubmitPost = event => {
        console.log(event);
        event.preventDefault();
        props.form.validateFields((err, data) => {
            if (!err) {
                const product = {
                    name: data.name,
                    price: data.price,
                    selected: selected
                }
                const url = "product";
                axiosInstance({
                    method: "post",
                    url: url,
                    data: product
                }).then(res => {
                    console.log(res.data);
                    console.log("done");
                    setAlert(true);
                    setTimeout(() => {
                        setAlert(false);
                        props.history.push('/');
                    }, 1000);

                })
            } else {
                console.log(err);
            }
        });
    }

    const handlClose = () => {
        setAlert(false);
    };
    return (
        <div className="page-wrapper bg-red p-t-180 p-b-100 font-robo">
            <div className="wrapper  wrapper--w680">
                <div className="card card-2">
                    <div className="card-body">
                        {alert === true ? <Alert
                            message="success"
                            description="you add product succefully"
                            closable
                            style={{ marginTop: '20px', marginBottom: '20px' }}
                            type="success"
                            onClose={handlClose}
                            showIcon
                        /> : ''
                        }
                        <h2 className="title">Add Product</h2>
                        <Form onSubmit={handleSubmitPost}>
                            <div className="input-group">
                                <Form.Item>
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: 'Name of product is required!' }],
                                    })(
                                        <Input className="input--style-2" type="text" placeholder="Name" />,
                                    )}
                                </Form.Item>
                            </div>
                            <div className="input-group">
                                <Form.Item>
                                    {getFieldDecorator('price', {
                                        rules: [{ required: true, message: 'Price of product is required!' }],
                                    })(
                                        <Input className="input--style-2" type="number" placeholder="Name" />,
                                    )}
                                </Form.Item>
                            </div>
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
                                <Form.Item>
                                    <button className="btn btn--radius btn--green" type="submit">Add</button>
                                </Form.Item>
                            </div>

                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProductsPage = Form.create({ name: 'product_form' })(productForm);
export default ProductsPage;
