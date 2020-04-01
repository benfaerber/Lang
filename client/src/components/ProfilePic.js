import React from 'react';
import {Link} from "react-router-dom";

const Pic = props => {
  let builtLink = () => `http://localhost:8080/api/profilePic?u=${props.username}`;
  let size = props.size || "32px";
  return (
    <img className="rounded" src={builtLink()} alt="profile" width={size} height={size}></img> 
  );
}

const ProfilePic = props => {
  const profileLink = () => `/users/${props.username}`;
  return (
    <Link to={profileLink()}>
      <Pic size={props.size} username={props.username} />
    </Link>
  );
}

export default ProfilePic;