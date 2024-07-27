import List from "../components/List";
import SearchBar from "../components/SearchBar";
import { useState, createContext, useContext } from "react";
import "./Eidt.scss";
import Button from "../components/Button";
import { ItemDispatchContext } from "../App";

export const FilteredStateList = createContext();
export const FilteredDispatchList = createContext();

export const UpdateStateList = createContext();
export const UpdateDispatchList = createContext();

const Edit = () => {
  const [filteredList, setFilteredList] = useState([]);
  const [updateList, setUpdateList] = useState([]);
  const { onUpdate } = useContext(ItemDispatchContext);

  const onClickUpdateButton = () => {
    updateList.forEach((item) => {
      onUpdate({ ...item });
    });
  };

  return (
    <div className="Edit">
      <FilteredStateList.Provider value={filteredList}>
        <FilteredDispatchList.Provider value={setFilteredList}>
          <SearchBar text={"검색"} />
          <Button text={"재고 이동"} onClick={onClickUpdateButton} />
          <UpdateStateList.Provider value={updateList}>
            <UpdateDispatchList.Provider value={setUpdateList}>
              <List filteredList={filteredList} />
            </UpdateDispatchList.Provider>
          </UpdateStateList.Provider>
        </FilteredDispatchList.Provider>
      </FilteredStateList.Provider>
    </div>
  );
};

export default Edit;
