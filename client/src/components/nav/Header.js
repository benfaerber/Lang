import React, {Component} from 'react';
import {Link} from "react-router-dom";
import ProfilePic from '../ProfilePic';
import Signout from './Signout';

const HeaderLinks = (props) => {
  return (
    <>
    <ul className="navbar-nav ml-auto">
      <PreSharedHeader />
      {props.loggedIn ? <UserHeader onSignout={props.onSignout} user={props.user}/> : <GuestHeader/>}
      <PostSharedHeader />
    </ul>
    {props.loggedIn ? <ProfilePic username={props.user.username} size="45px" /> : ""}
    </>
  );
};

const HeaderLink = (props) => {
  return (
    <li className={props.active ? "nav-item active" : "nav-item"}>
      <Link className="nav-link" to={props.href}>{props.text}</Link>
    </li>
  );
}

const UserHeader = (props) => {
  return (
  <>
  <HeaderLink href={"/request"} text={"Request Translation"} />
  <Signout onSignout={props.onSignout}/>
  <HeaderLink href={"/profile"} text={props.user.username} />
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

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
    this.first = true;
  }

  toggleNavbar = () => {
    let col = document.getElementsByClassName("collapse")[0];
    if (this.first) {
      col.style.display = "block";
      this.first = false;
    } else {
      col.style.display = col.style.display === "none" ? "block" : "none";
    }
  };


  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <a className="navbar-brand" href="#">Start Bootstrap</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation" onClick={this.toggleNavbar}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <HeaderLinks loggedIn={this.props.loggedIn} onSignout={this.props.onSignout} user={this.props.user}/>
        </div>
      </div>
    </nav>
    );
  }
}

export default Header;
