import { createContext, useReducer } from 'react';

// Crear el contexto del carrito
export const CartContext = createContext();

// Definir las acciones del carrito
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';

// Reducer para manejar el estado del carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      const { item } = action.payload;
      const itemInCart = state.find((i) => i.id === item.id);
      if (itemInCart) {
        return state.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...state, { ...item, qty: 1 }];
    }
    case REMOVE_ITEM: {
      const { item } = action.payload;
      return state
        .map((i) =>
          i.id === item.id ? { ...i, qty: i.qty - 1 } : i
        )
        .filter((i) => i.qty > 0);
    }
    case DELETE_ITEM: {
      const { item } = action.payload;
      return state.filter((i) => i.id !== item.id);
    }
    default:
      return state;
  }
};

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, []);

  const addItem = (item) => dispatch({ type: ADD_ITEM, payload: { item } });
  const removeItem = (item) => dispatch({ type: REMOVE_ITEM, payload: { item } });
  const deleteItem = (item) => dispatch({ type: DELETE_ITEM, payload: { item } });

  return (
    <CartContext.Provider value={{ cartState, addItem, removeItem, deleteItem }}>
      {children}
    </CartContext.Provider>
  );
};
