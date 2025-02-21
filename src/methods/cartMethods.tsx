import toast from "react-hot-toast";
import { PackType } from "../types/types";

let addToCart = (
	item: PackType,
	setCart: (prev: any) => any,
	cart: PackType[]
) => {
	let found = cart.find((e) => item.id == e.id);
	if (found) {
		toast.error("already in cart", {});
		return;
	}

	setCart((prev: any) => {
		return [...prev, item];
	});
	toast.success(`added: ${item.title} to cart`);
};

let clearCart = (setCart: (prev: any) => any, cart: PackType[]) => {
	if (cart.length != 0) {
		setCart([]);
		toast.success("cart cleared");
		return;
	}

	toast.error("cart is empty");
};

export { addToCart, clearCart };
