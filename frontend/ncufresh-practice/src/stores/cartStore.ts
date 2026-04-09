import { defineStore } from "pinia";

interface Item {
    id: number;
    name: string;
    price: number;
}

interface CartItem extends Item {
    quantity: number;
}

export const useCartStore = defineStore("cart", {
    state: () => ({
        items: [] as CartItem[],
    }),
    actions: {
        addToCart(item: Item, amount: number = 1) {
            const existingItem = this.items.find((i: CartItem) => i.id === item.id);
            if (existingItem) {
                existingItem.quantity += amount;
            } else {
                this.items.push({ ...item, quantity: amount });
            }
            console.log(this.items);
        },
        modifyItemData(itemId: number, name?: string, price?: number) {
            const item = this.items.find((i: CartItem) => i.id === itemId);
            if (item) {
                if (name) {
                    item.name = name;
                }
                if (price) {
                    item.price = price;
                }
            } else {
                throw new Error(`Item with ID ${itemId} not found in cart.`);
            }
        },
        changeQuantity(itemId: number, newQuantity: number) {
            const item = this.items.find((i: CartItem) => i.id === itemId);
            if (item) {
                item.quantity = newQuantity;
            } else {
                throw new Error(`Item with ID ${itemId} not found in cart.`);
            }
        },
        removeFromCart(itemId: number) {
            this.items = this.items.filter((item: CartItem) => item.id !== itemId);
        },
        clearCart() {
            this.items = [];
        },
        getItemCount(): number {
            return this.items.reduce((count: number, item: CartItem) => {
                return count + item.quantity;
            }, 0);
        },
        getTotalPrice(): number {
            return this.items.reduce((total: number, item: CartItem) => {
                return total + item.price * item.quantity;
            }, 0);
        }
    },
    persist: true,
});
