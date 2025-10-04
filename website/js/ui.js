function srcWithParams(p) {
  let url = p.image;
  if (url.includes('images.unsplash.com') && !url.includes('auto=format')) {
    url += (url.includes('?') ? '&' : '?') + 'auto=format&fit=crop&w=1000&q=80';
  }
  // cache-bust per product id to avoid stale browser cache
  url += (url.includes('?') ? '&' : '?') + 'v=' + encodeURIComponent(p.id);
  return url;
}

export function renderProducts(container, items, handlers) {
  container.innerHTML = '';
  items.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${srcWithParams(p)}" alt="${p.name}" loading="lazy" onerror="this.src='https://picsum.photos/seed/${p.id}/600/400';this.onerror=null;" />
      <div class="content">
        <div class="title">${p.name}</div>
        <div class="price">₹${p.price}</div>
        <div class="actions">
          <button class="btn primary" data-action="add">Add to Cart</button>
          <button class="btn" data-action="view">Quick View</button>
        </div>
      </div>
    `;
    card.querySelector('[data-action="add"]').addEventListener('click', () => handlers.onAddToCart(p));
    card.querySelector('[data-action="view"]').addEventListener('click', () => handlers.onQuickView(p));
    container.appendChild(card);
  });
}

export function renderSlides(track, items) {
  track.innerHTML = '';
  items.forEach(p => {
    const slide = document.createElement('div');
    slide.className = 'slide card';
    slide.innerHTML = `
      <img src="${srcWithParams(p)}" alt="${p.name}" onerror="this.src='https://picsum.photos/seed/${p.id}-s/600/400';this.onerror=null;" />
      <div class="content">
        <div class="title">${p.name}</div>
        <div class="price">₹${p.price}</div>
      </div>
    `;
    track.appendChild(slide);
  });
}


