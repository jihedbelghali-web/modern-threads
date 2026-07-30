"use client";

import { createContext, useContext, useReducer, useCallback, type ReactNode } from "react";

export interface CartItem {
  productId: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { productId: number; size: string; color: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: number; size: string; color: string; quantity: number } }
  | { type: "CLEAR_CART" };

interface CartState {
  items: CartItem[];
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (item) =>
          item.productId === action.payload.productId &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );
      if (existingIndex >= 0) {
        const updated = [...state.items];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + action.payload.quantity,
        };
        return { ...state, items: updated };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(
              item.productId === action.payload.productId &&
              item.size === action.payload.size &&
              item.color === action.payload.color
            )
        ),
      };
    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return cartReducer(state, { type: "REMOVE_ITEM", payload: action.payload });
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.payload.productId &&
          item.size === action.payload.size &&
          item.color === action.payload.color
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
}

const CartContext = createContext<{
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: number, size: string, color: string) => void;
  updateQuantity: (productId: number, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
} | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = useCallback((item: CartItem) => dispatch({ type: "ADD_ITEM", payload: item }), []);
  const removeItem = useCallback(
    (productId: number, size: string, color: string) =>
      dispatch({ type: "REMOVE_ITEM", payload: { productId, size, color } }),
    []
  );
  const updateQuantity = useCallback(
    (productId: number, size: string, color: string, quantity: number) =>
      dispatch({ type: "UPDATE_QUANTITY", payload: { productId, size, color, quantity } }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items: state.items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartStore() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartStore must be used within a CartProvider");
  }
  return context;
}
