const STORAGE_KEY = 'shoplite_cart_v1';

export class Cart {
  constructor() {
    const saved = localStorage.getItem(STORAGE_KEY);
    this.items = saved ? JSON.parse(saved) : {};
  }

  persist() { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items)); }

  add(product) {
    const existing = this.items[product.id];
    if (existing) existing.quantity += 1; else this.items[product.id] = { ...product, quantity: 1 };
    this.persist();
  }

  increment(id) {
    if (!this.items[id]) return; this.items[id].quantity += 1; this.persist();
  }
  decrement(id) {
    if (!this.items[id]) return; this.items[id].quantity -= 1; if (this.items[id].quantity <= 0) delete this.items[id]; this.persist();
  }
  remove(id) { if (!this.items[id]) return; delete this.items[id]; this.persist(); }
  clear() { this.items = {}; this.persist(); }

  getItems() { return Object.values(this.items); }
  getCount() { return this.getItems().reduce((s, it) => s + it.quantity, 0); }
  getTotal() { return this.getItems().reduce((s, it) => s + it.price * it.quantity, 0); }
}


