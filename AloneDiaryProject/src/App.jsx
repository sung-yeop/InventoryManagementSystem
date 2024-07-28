import { Routes, Route } from "react-router-dom";
import { createContext, useEffect, useReducer, useRef } from "react";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Store from "./pages/Store";
import Add from "./pages/Add";
import Delete from "./pages/Delete";

import NavigationList from "./components/NavigationList";

import "./App.css";

function reducer(state, action) {

  switch (action.type) {
    case "CREATE":
      return state.find(
        (item) =>
          item.location === action.data.location &&
          item.barcode === action.data.barcode
      )
        ? state.map((item) => {
            if (
              item.location === action.data.location &&
              item.barcode === action.data.barcode
            ) {
              return {
                ...item,
                quantity: item.quantity + action.data.quantity,
              };
            }
            return item;
          })
        : [...state, action.data];
    case "UPDATE":
      return state.find((item) => item.id === action.data.id)
        ? [
            ...state
              .map((item) => {
                if (
                  item.id === action.data.id
                ) {
                  return {
                    ...item,
                    quantity: item.quantity - action.data.updateQuantity,
                  };
                }
                return item;
              }),
            {
              id: `${
                state.find((item) => item.id === action.data.id).barcode
              }+${action.data.updateLocation}`,
              name: state.find((item) => item.id === action.data.id).name,
              barcode: state.find((item) => item.id === action.data.id).barcode,
              location: action.data.updateLocation,
              quantity: Number(action.data.updateQuantity),
            },
          ].filter((item) => item.quantity > 0)
        : state;
    case "DELETE":
      return state.filter((item) => item.id !== action.data.id)
    case "TOGGLE_ITEM":
      return state.map((item) => {
        if(item.id === action.data.id){
          return {
            ...item,
            isChecked : !item.isChecked,
          }
        }
        return item
      })
  }
}

const mockData_items = [
  {
    id: "123123+X01-01-101",
    name: "김치찌개",
    barcode: "123123",
    location: "X01-01-101",
    quantity: 3,
    isChecked: false,
  },
  {
    id: "456456+Z01-01-101",
    name: "감자탕",
    barcode: "456456",
    location: "Z01-01-101",
    quantity: 101,
    isChecked: false,
  },
];

const mockData_menus = [
  { id: "m1", name: "메인", nav: "/" },
  { id: "m2", name: "재고 입고", nav: "add" },
  { id: "m3", name: "재고 이동", nav: "edit" },
  { id: "m4", name: "재고 삭제", nav: "delete" },
  // { id: "m5", name: "입고 상세", nav: "store" },
];

export const ItemStateContext = createContext();
export const ItemDispatchContext = createContext();

// const idRef = 3;

function App() {
  const [items, dispatch] = useReducer(reducer, mockData_items);
  const [menus, dispatchMenu] = useReducer(reducer, mockData_menus);
  const idRef = useRef(3);

  // useEffect(() => {
  //   console.log(items);
  // }, [items]);

  const onCreate = ({ id, name, barcode, location, quantity }) => {
    dispatch({
      type: "CREATE",
      data: {
        id: id,
        name: name,
        barcode: barcode,
        location: location,
        quantity: quantity,
        isChecked : false,
      },
    });
  };

  const onUpdate = ({...rest}) => {
    const updateKeys = Object.keys(rest);
    dispatch({
      type: "UPDATE",
      data: {
        id: rest[updateKeys[0]],
        updateLocation: rest[updateKeys[1]],
        updateQuantity: rest[updateKeys[2]],
      },
    });
  };

  const onDelete = (id) => {
    // console.log('딜리트', id);
    dispatch({
      type: "DELETE",
      data :{
        id : id,
      }
    })
  }

  const onToggleButton = (id) => {
    console.log(id);
    dispatch({
      type: "TOGGLE_ITEM",
      data : {
        id : id,
      }
    })
  }

  return (
    <ItemStateContext.Provider value={{ items, idRef }}>
      <ItemDispatchContext.Provider value={{ onCreate, onUpdate, onDelete, onToggleButton }}>
        <div className="Navigation">
          <div className="Navigation-title">메뉴</div>
          {menus.map((menu) => (
            <NavigationList
              key={menu.id}
              nav_name={menu.name}
              nav_nav={menu.nav}
            />
          ))}
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/store" element={<Store />} />
          <Route path="/delete" element={<Delete />} />
        </Routes>
      </ItemDispatchContext.Provider>
    </ItemStateContext.Provider>
  );
}

export default App;
