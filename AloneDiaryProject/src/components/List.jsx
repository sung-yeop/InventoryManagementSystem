import Item from "./Item";
import "./List.scss";
import { useRef, useEffect, useContext, useState } from "react";
import { UpdateStateList, UpdateDispatchList } from "../pages/Edit";

const List = ({ filteredList }) => {
  let itemIndex = useRef(1);
  useEffect(() => {
    itemIndex.current = 1;
  }, [filteredList]);

  const updateItems = useContext(UpdateStateList);
  const setUpdateItems = useContext(UpdateDispatchList);



  const onChange = (e, id) => {
    const { name, value } = e.target;
    const index = updateItems.findIndex((item) => item.id === id);
    setUpdateItems((prevList) => {
      if (index !== -1) {
        const updatedItems = [...prevList];
        if (updatedItems[index][name] !== undefined) {
          updatedItems[index] = { ...updatedItems[index], [name]: value };
        } else {
          updatedItems[index][name] = value;
        }
        return updatedItems;
        // prevList = updatedItems; //왜 prevList를 반환해야됌?
        // return prevList;
        // return (prevList[index] = { ...prevList[index], [name]: value });
      }
      // console.log({ name: id, [name]: value });
      return [...updateItems, { id: id, [name]: value }];
    });
  };

  // useEffect(() => {
  //   console.log(updateItems);
  // }, [updateItems]);

  return (
    <div className="List">
      <div>
        <span>번호</span>
        <span>상품명</span>
        <span>바코드</span>
        <span>로케이션</span>
        <span>현재 수량</span>
        <span>이동 로케이션</span>
        <span>이동 수량</span>
      </div>
      {filteredList.map((item) => {
        const id = `${item.barcode}+${item.location}`;
        const itemIndex2 = filteredList.findIndex(filteredItem => filteredItem.id === item.id)+1;
        return (
          <Item
            id={id}
            value={updateItems.find((item) => item.id === id) || ""}
            onChange={onChange}
            key={item.id}
            index={itemIndex2}
            item={item}
            isChecked={item.isChecked}
          />
        );
      })}
    </div>
  );
};

export default List;
