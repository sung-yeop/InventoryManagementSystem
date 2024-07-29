import { useState, useContext, useEffect } from "react";
import Item from "../components/Item";
import { ItemStateContext, ItemDispatchContext } from "../App";
import Button from "../components/Button";
import './Delete.scss'

const Delete = () => {
  const { items } = useContext(ItemStateContext);
  const { onDelete, onToggleButton } = useContext(ItemDispatchContext);

  const onClick = () => {
    items.filter((item) => item.isChecked).forEach(element => {
      onDelete(element.id);
    });
  }
  
  

  return (
    <div className="Delete">
      <Button text={'삭제'} onClick={onClick}/>
      {items.map((item) => {
        const itemIndex2 =
          items.findIndex((filteredItem) => filteredItem.id === item.id) + 1;
        return (
          
          <Item
            key={item.id}
            id={item.id}
            item={item}
            value={item}
            index={itemIndex2}
          >
            <input
        type="checkbox"
          onClick={() => onToggleButton(item.id)}
      ></input>
          </Item>
        );
      })}
    </div>
  );
};

export default Delete;
