import { create } from "zustand";

interface CartState {}

const useCartStore = create<CartState>()((set, get) => ({}));

export default useCartStore;
