import React from 'react';
import Post from '../Post';

const Signout = props => {
  const onSignout = async () => {
    let response = await Post('http://localhost:8080/api/signout', {});
    if (response.status === "ok") {
      console.log("Signed out!");
    }
    props.onSignout();
  }

  return (
    <li className="nav-item">
      <a className="nav-link" onClick={onSignout}>Signout</a>
    </li>
  )
}

export default Signout;