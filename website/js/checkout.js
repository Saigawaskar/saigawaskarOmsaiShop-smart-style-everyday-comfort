export function initCheckout(onSuccess) {
  const form = document.getElementById('checkoutForm');
  const fields = ['name', 'email', 'address', 'card', 'cvv', 'upi'];

  function setError(name, message) {
    const span = form.querySelector(`.error[data-for="${name}"]`);
    span.textContent = message || '';
  }

  function validate() {
    let ok = true;
    const pay = form.querySelector('input[name="pay"]:checked')?.value || 'card';
    // Name
    const name = form.name.value.trim();
    if (name.length < 2) { setError('name', 'Enter a valid name'); ok = false; } else setError('name');
    // Email
    const email = form.email.value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) { setError('email', 'Enter a valid email'); ok = false; } else setError('email');
    // Address
    const address = form.address.value.trim();
    if (address.length < 5) { setError('address', 'Enter a full address'); ok = false; } else setError('address');
    if (pay === 'card') {
      const card = form.card.value.replace(/\s+/g, '');
      if (!/^\d{16}$/.test(card)) { setError('card', 'Enter 16-digit card'); ok = false; } else setError('card');
      const cvv = form.cvv.value.trim();
      if (!/^\d{3,4}$/.test(cvv)) { setError('cvv', 'Enter 3-4 digit CVV'); ok = false; } else setError('cvv');
    } else {
      setError('card'); setError('cvv');
    }
    if (pay === 'upi') {
      const upi = form.upi.value.trim();
      if (!/^[-.\w]{2,}@[a-z]{2,}$/i.test(upi)) { setError('upi', 'Enter valid UPI ID'); ok = false; } else setError('upi');
    } else { setError('upi'); }
    return ok;
  }

  form.addEventListener('input', (e) => {
    const t = e.target;
    if (!(t instanceof HTMLInputElement)) return;
    if (t.name === 'card') {
      t.value = t.value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim();
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) return;
    alert('Order placed successfully!');
    form.reset();
    if (typeof onSuccess === 'function') onSuccess();
  });
}


