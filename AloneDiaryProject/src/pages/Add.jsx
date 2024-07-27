import "./Add.scss";
import { useState, useContext, useRef, useEffect } from "react";
import { ItemDispatchContext, ItemStateContext } from "../App";
import Button from "../components/Button";
import List from "../components/List";

const Add = () => {
  const [addItem, setAddItem] = useState({
    name: "",
    barcode: "",
    location: "",
    quantity: "",
    isChecked: false,
  });
  const { onCreate } = useContext(ItemDispatchContext);
  const { idRef, items } = useContext(ItemStateContext);
  const [newItemList, setNewItemList] = useState([]);

  const nameRef = useRef("");
  const barcodeRef = useRef("");
  const locationRef = useRef("");
  const quantityRef = useRef("");

  const onChange = (e) => {
    setAddItem((prevItem) => {
      return {
        ...prevItem,
        ["id"]: `${addItem.barcode}+${addItem.location}`,
        [e.target.name]: e.target.value, // 입력 값 업데이트
      };
    });
  };

  const onClickAddItem = () => {
    if (addItem.name === "") {
      nameRef.current.focus();
      return;
    } else if (addItem.barcode === "") {
      barcodeRef.current.focus();
      return;
    } else if (addItem.location === "") {
      locationRef.current.focus();
      return;
    } else if (addItem.quantity === "") {
      quantityRef.current.focus();
      return;
    }

    console.log(newItemList);

    setNewItemList(
      newItemList.find(
        (item) =>
          item.barcode === addItem.barcode && item.location === addItem.location
      )
        ? newItemList.map((item) => {
            if (
              item.barcode === addItem.barcode &&
              item.location === addItem.location
            ) {
              return {
                ...item,
                quantity: item.quantity + addItem.quantity,
              };
            }
            return item;
          })
        : [...newItemList, addItem]
    );
  };

  useEffect(() => {
    return () => {
      newItemList.forEach((item) => {
        onCreate({ ...item });
      });
    };
  }, [newItemList]);

  return (
    <div className="Add">
      <input
        ref={nameRef}
        name="name"
        value={addItem.name}
        placeholder="상품명.."
        onChange={onChange}
      ></input>
      <input
        ref={barcodeRef}
        name="barcode"
        value={addItem.barcode}
        placeholder="바코드.."
        onChange={onChange}
      ></input>
      <input
        ref={locationRef}
        name="location"
        value={addItem.location}
        placeholder="로케이션.."
        onChange={onChange}
      ></input>
      <input
        ref={quantityRef}
        name="quantity"
        value={addItem.quantity}
        placeholder="수량.."
        onChange={onChange}
      ></input>
      <Button text={"상품 추가"} onClick={onClickAddItem} />
      {/* <List filteredList={newItemList} /> */}
    </div>
  );
};

export default Add;
