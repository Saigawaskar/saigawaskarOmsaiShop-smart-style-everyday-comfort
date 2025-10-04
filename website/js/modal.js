export function initModal() {
  const dialog = document.getElementById('productModal');
  const closeBtn = document.getElementById('modalClose');
  const content = document.getElementById('modalContent');

  function open(product) {
    content.innerHTML = `
      <div class="modal-body">
        <img src="${product.image}" alt="${product.name}" />
        <div>
          <h3>${product.name}</h3>
          <p>₹${product.price}</p>
          <p>${product.description}</p>
        </div>
      </div>
    `;
    if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
  }
  function close() {
    if (typeof dialog.close === 'function') dialog.close(); else dialog.removeAttribute('open');
  }

  closeBtn.addEventListener('click', close);
  dialog.addEventListener('click', (e) => { if (e.target === dialog) close(); });

  return { open, close };
}


