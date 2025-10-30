//Index.js
class ApiService{
    static BASE = 'https://dummyjson.com';

    static async getAll(){
        const res = await fetch (`${ApiService.BASE}/products`);
        if (!res.ok) throw new Error (`Error HTTP: ${res.status}`);
        return await res.json();
        return DataTransfer.products;
    }
}

class StorageService {
    static saveProducts (product) {
        localStorage.setItem('totalProducts' , JSON.stringify(product));
    }

    static getProducts() {
        const raw = localStorage.getItem('totalProducts');
        return raw ? JSON.parse(raw) : null;
    }
    static saveSelected(product) {
        localStorage.setItem('selectedProduct', JSON.stringify(product));
    }
    static getSelected() {
        const raw = localStorage.getItem('selectedProduct');
        return raw ? JSON.parse(raw) : null;
    }
}

class UI {
  static container = document.querySelector('#cardContainer');
  static status = document.querySelector('#status');

  static render(products) {
    if (!products || products.length === 0) {
      UI.container.innerHTML = '<p class="empty">No se encontraron productos.</p>';
      UI.status.textContent = '0 productos';
      return;
    }

    const cards = products.map(p => `
      <article class="card" onclick="goToProductDetails(${p.id})">
        <img src="${p.image}" alt="${p.title}" />
        <div class="info">
          <h3>${p.title}</h3>
          <p class="price">$${p.price.toFixed(2)}</p>
          <p class="category">${p.category}</p>
        </div>
      </article>
    `).join('');

    UI.container.innerHTML = cards;
    UI.status.textContent = `Mostrando ${products.length} productos`;
  }
}


let totalProducts = [];

/*

const randomBtn = document.querySelector('#randomBtn');
*/

window.goToProductDetails = (id) => { 
    const selected = totalProducts.find(p => p.id === id);
    StorageService.saveSelected(selected);
    window.location.href = `product-details.html?id=${id}`;
};

async function init() {
    UI.status.textContent = 'Cargando productos...';
    totalProducts = StorageService.getProducts();

    if (totalProducts.length === 0) {
        try {
            totalProducts = await await ApiService.getAll();
            StorageService.saveProducts(totalProducts);
        } catch (err) {
            UI.status.textContent = 'Error al cargar productos';
            console.error(err);
            return;
        }
    }

    UI.render(totalProducts);
}

function filterAndSort() {
    const searchInput = document.querySelector('#searchInput');
    const sortSelect = document.querySelector('#sortSelect');

    let filtered = totalProducts.filter ( p=> 
        p.title.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    if (sortSelect.value === 'price-asc') filtered.sort((a,b) => a.price - b.price);
    if (sortSelect.value === 'price-desc') filtered.sort((a,b) => b.price - a.price);

    UI.render(filtered);    
}

function randomSix() {
    const shuffled = [...totalProducts].sort(() => 0.5 - Math.random());
    const six = shuffled.slice(0,6);
    UI.render(six);
    UI.status.textContent = '🎲Mostrando 6 aleatorios🎲';
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('#searchInput');
    const sortSelect = document.querySelector('#sortSelect');
    const randomBtn = document.querySelector('#randomBtn');

    init ();

    searchInput.addEventListener('input',filterAndSort);
    sortSelect.addEventListener('change', filterAndSort);
    randomBtn.addEventListener('click', randomSix);
});