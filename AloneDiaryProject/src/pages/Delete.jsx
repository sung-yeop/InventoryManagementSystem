import { useState, useContext } from "react";
import Item from "../components/Item";
import { ItemStateContext, ItemDispatchContext } from "../App";

const Delete = () => {
  const { items } = useContext(ItemStateContext);
  const { onDelete } = useContext(ItemDispatchContext);

  const { deleteItems, setDeleteItems } = useState([]);

  const onDeleteItem = (e, id) => {
    const { name, value } = e.target;
    if (value) {
      onDelete(id);
    }
  };

  const onClickButton = (id, isChecked) => {
    if (!isChecked) {
      setDeleteItems((prevList) => [...prevList, { id: !isChecked }]);
    } else {
      setDeleteItems((prevList) => {
        return prevList.filter((itemId) => itemId !== id);
      });
    }
    console.log(deleteItems);
  };

  return (
    <div>
      {items.map((item) => {
        const itemIndex2 =
          items.findIndex((filteredItem) => filteredItem.id === item.id) + 1;
        return (
          <Item
            key={item.id}
            id={item.id}
            item={item}
            value={item}
            onClickButton={onClickButton}
          />
        );
      })}
    </div>
  );
};

export default Delete;
