import React from 'react';

const Pic = props => {
  let builtLink = () => `http://localhost:8080/api/profilePic?u=${props.username}`;
  let size = props.size || "32px";
  return (
    <img className="rounded" src={builtLink()} width={size} height={size}></img> 
  );
}

const ProfilePic = props => {
  const profileLink = () => `/users/${props.username}`;
  return (
    <a href={profileLink()}>
      <Pic size={props.size} username={props.username} />
    </a>
  );
}

export default ProfilePic;