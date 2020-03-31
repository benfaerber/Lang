import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import ProfilePic from '../ProfilePic';

const HeaderLinks = (props) => {
  return (
    <>
    <ul className="navbar-nav ml-auto">
      <PreSharedHeader />
      {props.loggedIn ? <UserHeader /> : <GuestHeader/>}
      <PostSharedHeader />
    </ul>
    {props.loggedIn ? <ProfilePic username="billburr" size="45px" /> : ""}
    </>
  );
};

const HeaderLink = (props) => {
  const isActive = () => window.location.pathname == (props.href) ? "nav-item active" : "nav-item";

  return (
    <li className={isActive()}>
      <a className="nav-link" href={props.href}>{props.text}</a>
    </li>
  )
}

const UserHeader = (props) => {
  return (
  <>
  <HeaderLink href={"/request"} text={"Request Translation"} />
  <HeaderLink href={"/profile"} text={"liltim"} />
  </>
  );
}

const GuestHeader = (props) => {
  return (
  <>
    <HeaderLink href={"/login"} text={"Login"} />
    <HeaderLink href={"/register"} text={"Register"} />
  </>
  );
}

const PreSharedHeader = (props) => {
  return (
    <>
      <HeaderLink href={"/"} text={"Home"} />
      <HeaderLink href={"/requests"} text={"Requests"} />
    </>
    );
}

const PostSharedHeader = (props) => {
    return <></>;
}

const Header = (props) => {
  let first = true;

  const toggleNavbar = () => {
    let col = document.getElementsByClassName("collapse")[0];
    if (first) {
      col.style.display = "block";
      first = false;
    } else {
      col.style.display = col.style.display == "none" ? "block" : "none";
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div className="container">
      <a className="navbar-brand" href="#">Start Bootstrap</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleNavbar}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <HeaderLinks loggedIn={true}/>
      </div>
    </div>
  </nav>
  );
}

export default Header;
