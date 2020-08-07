import React from "react";
import { Avatar, Menu } from "antd";
import { NavLink } from "react-router-dom";
import "./navbar.scss";
import logout from '../../icons/logout.png'

const Navbar = props => {
  return (
    <div className='navbar'>
      <div className="left-side">
        <h2 className="linkflex"><NavLink to="/" className="link">POS</NavLink></h2>
        <h2 className="linkflex"><NavLink to="/product" className="link">Products</NavLink></h2>
        <h2 className="linkflex thirdLink"><NavLink to="/category" className="link">Categories</NavLink></h2>
      </div>
      <div className="right-side">
        <Avatar size={32} icon="user" className="avatar" />
        <h4>Admin SEE</h4>
        <img src={logout} className="logout" />
      </div>


    </div>
  );
};
export default Navbar;

const AvatarDropdown = props => {
  return (
    <Menu>
      <Menu.Item key="0">Hello {props.user.name}</Menu.Item>
      <Menu.Item key="1" onClick={() => props.logout()}>
        Logout
      </Menu.Item>
    </Menu>
  );
};
