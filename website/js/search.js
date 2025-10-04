export function initSearch(allProducts, onResults) {
  const input = document.getElementById('searchInput');
  const doFilter = () => {
    const q = input.value.trim().toLowerCase();
    const res = allProducts.filter(p => p.name.toLowerCase().includes(q));
    onResults(res);
  };
  input.addEventListener('input', doFilter);
}


