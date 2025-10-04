import { products } from './data.js';
import { renderProducts, renderSlides } from './ui.js';
import { Cart } from './cart.js';
import { initModal } from './modal.js';
import { initSearch } from './search.js';
import { initTheme } from './theme.js';

const productsGrid = document.getElementById('productsGrid');
const sliderTrack = document.getElementById('sliderTrack');
const yearEl = document.getElementById('year');
yearEl.textContent = new Date().getFullYear();

// Cart
const cart = new Cart();
const cartButton = document.getElementById('cartButton');
const cartDrawer = document.getElementById('cartDrawer');
const closeCart = document.getElementById('closeCart');
const overlay = document.getElementById('overlay');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const cartCountEl = document.getElementById('cartCount');

function openCart() {
  cartDrawer.classList.add('open');
  overlay.hidden = false;
}
function closeCartDrawer() {
  cartDrawer.classList.remove('open');
  overlay.hidden = true;
}
cartButton.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartDrawer);
overlay.addEventListener('click', closeCartDrawer);

function renderCart() {
  const items = cart.getItems();
  cartItemsEl.innerHTML = '';
  items.forEach(item => {
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="meta">
        <div>${item.name}</div>
        <div class="price">₹${item.price}</div>
        <div class="qty">
          <button data-action="dec" data-id="${item.id}" class="btn">-</button>
          <span>${item.quantity}</span>
          <button data-action="inc" data-id="${item.id}" class="btn">+</button>
          <button data-action="remove" data-id="${item.id}" class="btn">Remove</button>
        </div>
      </div>
    `;
    cartItemsEl.appendChild(row);
  });
  cartTotalEl.textContent = cart.getTotal().toFixed(2);
  cartCountEl.textContent = cart.getCount();
}

cartItemsEl.addEventListener('click', (e) => {
  const target = e.target;
  if (!(target instanceof HTMLElement)) return;
  const id = target.getAttribute('data-id');
  const action = target.getAttribute('data-action');
  if (!id || !action) return;
  if (action === 'inc') cart.increment(id);
  if (action === 'dec') cart.decrement(id);
  if (action === 'remove') cart.remove(id);
  renderCart();
});

// Initial render
renderProducts(productsGrid, products, {
  onAddToCart: (product) => { cart.add(product); renderCart(); },
  onQuickView: (product) => modal.open(product)
});
renderSlides(sliderTrack, products.slice(0, 10));
renderCart();

// Modal
const modal = initModal();

// Search
initSearch(products, (filtered) => {
  renderProducts(productsGrid, filtered, {
    onAddToCart: (product) => { cart.add(product); renderCart(); },
    onQuickView: (product) => modal.open(product)
  });
});

// Theme
initTheme();

// Slider controls
const prevBtn = document.querySelector('.slider .prev');
const nextBtn = document.querySelector('.slider .next');
prevBtn.addEventListener('click', () => sliderTrack.scrollBy({ left: -280, behavior: 'smooth' }));
nextBtn.addEventListener('click', () => sliderTrack.scrollBy({ left: 280, behavior: 'smooth' }));

// Checkout removed on home; handled on cart.html

console.log(products); // This will print the array of products to the console


