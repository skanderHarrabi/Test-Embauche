import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axiosInstance from "../../config/axios-instance";
import { Form, Input, Alert } from 'antd';

import './CategoryPage.scss';

const categoryForm = props => {
    const [alert, setAlert] = useState(false);
    const { getFieldDecorator } = props.form;

    const handleSubmitForm = (event, value) => {
        event.preventDefault();
        props.form.validateFields((err, data) => {
            if (!err) {
                const url = "category";
                axiosInstance({
                    method: "post",
                    url: url,
                    data: data
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
                            description="you add category succefully"
                            closable
                            style={{ marginTop: '20px', marginBottom: '20px' }}
                            type="success"
                            onClose={handlClose}
                            showIcon
                        /> : ''
                        }
                        <h2 className="title">Add Category</h2>
                        <Form onSubmit={handleSubmitForm}>
                            <div className="input-group">
                                <Form.Item>
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: 'Name of category is required!' }],
                                    })(
                                        <Input className="input--style-2" type="text" placeholder="Name" />,
                                    )}
                                </Form.Item>
                            </div>
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

const CategoryPage = Form.create({ name: 'category_form' })(categoryForm);
export default CategoryPage;
