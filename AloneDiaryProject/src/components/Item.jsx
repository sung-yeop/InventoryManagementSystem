import "./Item.scss";
import { useState, useContext, useEffect, useRef } from "react";

const Item = ({ id, value, onChange, index, item, onClickButton, children }) => {
  return (
    <div className="Item">
      {children}
      <span>{index}</span>
      <span>{item.name}</span>
      <span>{item.barcode}</span>
      <span>{item.location}</span>
      <span>{item.quantity}</span>
      <input
      className="updateBox"
        name={`${id}_update_location`}
        placeholder="이동 로케이션"
        value={value[`${id}_update_location`] || ""}
        onChange={(e) => onChange(e, id)}
      ></input>
      <input
      className="updateBox"
        name={`${id}_update_quantity`}
        placeholder="이동 수량"
        value={value[`${id}_update_quantity`] || ""}
        onChange={(e) => onChange(e, id)}
      ></input>
      {/* <button onClick={onClickCheck}>확인</button> */}
    </div>
  );
};

export default Item;
