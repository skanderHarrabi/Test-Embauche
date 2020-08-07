import React, { useState, useEffect } from "react";
import "./home-page.scss";
import SideBar from "../../components/side-bar/SideBar";
import VerticalScroll from "../../components/vertical-scroll/VerticalScroll";
import ProductsTable from "../../components/products-table/productsTable";
import axiosInstance from "../../config/axios-instance";


const HomePage = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [prodstobuy, setProdstobuy] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let url = "products/";
    axiosInstance({
      method: "get",
      url: url
    }).then(res => {
      console.log(res);
      setData(res.data);
    });
    url = "categories/";
    axiosInstance({
      method: "get",
      url: url
    }).then(res => {
      console.log(res);
      setCategories(res.data);
    });
  }, []);

  const handelClick = (id, name, price, index) => {
    const obj = { id, name, price, index, qte: 1, total: price }
    const found = prodstobuy.findIndex(d => d.id === id);
    console.log(found);
    if (found == -1) {
      setProdstobuy([...prodstobuy, obj]);
    } else {
      prodstobuy[found].qte++;
      prodstobuy[found].total = prodstobuy[found].qte * price;
      setProdstobuy([...prodstobuy]);
    }
    setTotal(total + price);
  }

  const handleCancel = () => {
    setProdstobuy([]);
    setTotal(0);
  }

  const handlePay = () => {
    let totaleqte = 0;
    let prods = [];
    prodstobuy.map(p => {
      totaleqte += p.qte;
      prods.push({ prodId: p.id, qte: p.qte });
    });
    console.log(totaleqte);
    const data = {
      totalPrice: total,
      qte: totaleqte,
      prods: prods
    }
    const url = 'order'
    axiosInstance({
      method: "post",
      url: url,
      data: data
    }).then(res => {
      console.log(res.data);
      console.log("done");
      setProdstobuy([]);
      setTotal(0);
    })
  }

  const selectedCategories = id => {
    const url = 'productsbycategory/' + id
    axiosInstance({
      method: "get",
      url: url,
    }).then(res => {
      setData(res.data)
    })
  }

  const allProducts = () => {
    let url = "products/";
    axiosInstance({
      method: "get",
      url: url
    }).then(res => {
      console.log(res);
      setData(res.data);
    });
  }

  return (
    <div className="home-page">
      <SideBar prods={prodstobuy} setProds={setProdstobuy} total={total} setTotal={setTotal} handleCancel={handleCancel} handlePay={handlePay} />
      <div className="main">
        <VerticalScroll categories={categories} allProducts={allProducts} selectedCategories={selectedCategories} />
        <ProductsTable data={data} setData={setData} handelClick={handelClick} total={total} setTotal={setTotal} />
      </div>
    </div>
  );
};

export default HomePage;
