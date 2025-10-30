//import { StorageService} from './index.js';  // Si se esta usando modulos reales, sino duplica la clase

const container = document.querySelector('#productDetail');
const product = JSON.parse(localStorage.getItem('selectedProduct'));

if (!product) {
    container.innerHTML = `<p class="empty">No hay producto seleccionado. 
    <a href="index.html">Volver a la tienda</a></p>`;
} else {
    container.innerHTML = `
    <article class="card-detail">
     <img src="${product.image}" alt ="${product.title}">
     <div class="detail-info">
     <h2>${product.title}</h2>
     <p class="price">$${product.price.toFixed(2)}</p>
     <p class="rating"> ⭐ 4 ${product.rating?.rate ?? 'N/A'} (${product.rating?.count ?? 0} reseñas)</p>
     <p class="description">${product.description}</p>
     <button class="back-btn" onclick="window.location.href='index.html'"> ⬅️ Volver</button>    
    </div>
    </article>
  `;
}

/* En clase
const productDetailsElem = document.querySelector('#productDetails');
const selectedProduct = JSON.parse(window.localStorage.getItem('selectedProduct'));
productDetailsElem.textContent = JSON.stringify(selectedProduct, null,2);

<h2>${product.title}</h2>
      <p><strong>Precio:</strong> $${product.price.toFixed(2)}</p>
      <p><strong>Categoría:</strong> ${product.category}</p>
      <p><strong>Rating:</strong> ${product.rating.rate} ⭐ (${product.rating.count} reseñas)</p>
      <p>${product.description}</p>

*/