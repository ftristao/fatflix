import React from "react";

export default (props) => {
  return (
    <a className={props.className} href={props.href}>
      <p>{props.children}</p>
    </a>
  );
};