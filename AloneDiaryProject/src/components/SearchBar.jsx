import { ItemStateContext } from "../App";
import Button from "./Button";
import { useContext, useEffect, useState } from "react";
import "./SearchBar.scss";
import { FilteredDispatchList } from "../pages/Edit";

const SearchBar = ({ text }) => {
  const { items } = useContext(ItemStateContext);
  const setFilteredList = useContext(FilteredDispatchList);
  const [search, setSearch] = useState({
    name: "",
    barcode: "",
    location: "",
  });

  const onChangeInput = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const onClickButton = () => {
    const tempList = items.filter(
      (item) =>
        (item.name === search.name || search.name==="") &&
        (item.barcode === search.barcode || search.barcode==="") &&
        (item.location === search.location || search.location === "")
    );
    setFilteredList(tempList.length === 0 ? items : tempList);
  };

  useEffect(() => {
    onClickButton();
  }, [items]);

  return (
    <div className="SearchBar">
      <span>상품명 : </span>
      <input name="name" value={search.name} onChange={onChangeInput}></input>
      <span>바코드 : </span>
      <input
        name="barcode"
        value={search.barcode}
        onChange={onChangeInput}
      ></input>
      <span>로케이션 : </span>
      <input
        name="location"
        value={search.location}
        onChange={onChangeInput}
      ></input>
      <Button text={text} onClick={onClickButton} />
    </div>
  );
};

export default SearchBar;
