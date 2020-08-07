import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axiosInstance from "../../config/axios-instance";

import './CategoryPage.scss';

const CategoryPage = props => {
    const { handleSubmit, register, errors } = useForm();
    const [name, setName] = useState('');

    const handleSubmitForm = event => {
        event.preventDefault();
        const data = {
            name
        }
        const url = "category";
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
        setName(event.target.value);
    }

    return (
        <div className="page-wrapper bg-red p-t-180 p-b-100 font-robo">
            <div className="wrapper  wrapper--w680">
                <div className="card card-2">
                    <div className="card-body">
                        <h2 className="title">Add Category</h2>
                        <form onSubmit={handleSubmit(handleSubmitForm)}>
                            <div className="input-group">
                                <input className="input--style-2" type="text" value={name} onChange={handleInputChange} placeholder="Name" name="name" ref={register({
                                    required: "Name is Required"
                                })} />

                            </div>
                            <div className="error">{errors.name && errors.name.message}</div>
                            <div className="p-t-30">
                                <button className="btn btn--radius btn--green" type="submit">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default CategoryPage;
