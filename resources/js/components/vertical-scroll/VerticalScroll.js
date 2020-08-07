import React from 'react';
import './VerticalSrcoll.scss';


const VerticalScroll = props => {

    const handlClick = id => {
        console.log(id)
    }
    return (
        <div className="scroll" id="style-2">
            <div className="allCat" onClick={props.allProducts}><h3 className="margin-0">All</h3></div>
            <div className="categories">
                {
                    props.categories.map((cat, index) =>
                        <div key={index} className="categorieItem" onClick={() => props.selectedCategories(cat.id)}><h3 className="margin-0">{cat.name}</h3></div>
                    )
                }
            </div>
        </div>
    );
};

export default VerticalScroll;
