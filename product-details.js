//import { StorageService} from './index.js';  // Si se esta usando modulos reales, sino duplica la clase


const container = document.querySelector('#productDetail');
let product = JSON.parse(localStorage.getItem('selectedProduct'));
async function loadProduct() {
  if (!product) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        product = await res.json();
      } catch (error) {
        console.error('Error cargando producto:', error);
        container.innerHTML = `<p class="empty">Error al cargar el producto. <a href="index.html">Volver</a></p>`;
        return;
      }
    }
  }

  if (!product) {
    container.innerHTML = `<p class="empty">No hay producto seleccionado. <a href="index.html">Volver</a></p>`;
    return;
  }

  container.innerHTML = `
    <article class="card-detail">
      <img src="${product.image}" alt="${product.title}">
      <div class="detail-info">
        <h2>${product.title}</h2>
        <p class="price">$${product.price.toFixed(2)}</p>
        <p class="category">Categoría: <strong>${product.category}</strong></p>
        <p class="rating">⭐ ${product.rating?.rate ?? 'N/A'} (${product.rating?.count ?? 0} reseñas)</p>
        <p class="description">${product.description}</p>
        <button class="back-btn" onclick="window.location.href='index.html'">⬅️ Volver</button>
      </div>
    </article>
  `;
}

// Ejecutamos al cargar la página
document.addEventListener('DOMContentLoaded', loadProduct);
StorageService.saveSelected(selected);
