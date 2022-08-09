import "./widget.scss";

import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";

const Widget = ({ type }) => {
  let dataIn;
  
  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      dataIn = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        case:"users"
      };
      break;
    case "hotels":
      dataIn = {
        title: "HOTELS",
        isMoney: false,
        link: "View all hotels",
        case:"hotels"
      };
      break;
    case "rooms":
      dataIn = {
        title: "ROOMS",
        isMoney: true,
        link: "View all rooms",
        case:"rooms"
      };
      break;
    
    default:
      break;
  }
  
  const { data, loading, error } = useFetch(`/${dataIn.case}`);
  

  

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{dataIn.title}</span>
        <span className="counter">
           {data.length}
        </span>
        <Link to= {`/${dataIn.case}`} className="link">{dataIn.link}</Link>
      </div>
      
    </div>
  );
};

export default Widget;
