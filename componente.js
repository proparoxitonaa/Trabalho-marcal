document.addEventListener("DOMContentLoaded", function() {
    const productContainer = document.getElementById('product-list');
    let productsData = [];

    // Carregar produtos do JSON e armazenar os dados
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            productsData = data.products;
            renderProducts(productsData);
        })
        .catch(error => console.error('Erro ao carregar os produtos:', error));

    // Função para criar e renderizar os cards de produtos
    function renderProducts(products) {
        productContainer.innerHTML = ''; // Limpa a lista de produtos
        products.forEach(product => {
            const productCard = createProductCard(product);
            productContainer.appendChild(productCard);
        });
    }

    // Função para criar um card de produto
    function createProductCard(product) {
        const col = document.createElement('div');
        col.className = 'col-lg-3 col-md-6 mb-4';

        const card = document.createElement('div');
        card.className = 'card h-100';

        const img = document.createElement('img');
        img.className = 'card-img-top';
        img.src = product.image;
        img.alt = product.name;

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardTitle = document.createElement('h4');
        cardTitle.className = 'card-title';
        cardTitle.textContent = product.name;

        const cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = product.description + " R$" + product.price.toFixed(2);

        const cardFooter = document.createElement('div');
        cardFooter.className = 'card-footer';

        // Botão "Ver Detalhes"
        const detailsButton = document.createElement('a');
        detailsButton.className = 'btn btn-primary mr-2';
        detailsButton.href = `Detalhes do produto ${product.id}.html`;  // Redirecionamento específico para cada produto
        detailsButton.textContent = 'Ver Detalhes';

        // Botão "View"
        const viewButton = document.createElement('a');
        viewButton.className = 'btn btn-secondary';
        viewButton.href = `view.html?produto=${product.id}`;  // Redireciona para a página view.html com o ID do produto
        viewButton.textContent = 'View';

        cardFooter.appendChild(detailsButton);
        cardFooter.appendChild(viewButton);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        card.appendChild(img);
        card.appendChild(cardBody);
        card.appendChild(cardFooter);
        col.appendChild(card);

        return col;
    }

    // Função de pesquisa
    const searchForm = document.querySelector('.form-inline');
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const query = document.querySelector('input[type="search"]').value.toLowerCase();
        const filteredProducts = productsData.filter(product =>
            product.name.toLowerCase().includes(query)
        );
        renderProducts(filteredProducts);
    });

    // Função para lidar com a inscrição
    window.subscribe = function() {
        const email = document.getElementById("emailInput").value;

        setTimeout(function () {
            document.getElementById("subscribe-box").style.display = "none";
            document.getElementById("thankYouMessage").style.display = "block";
        }, 1000);
    };

    // Função de filtro de preço
    const priceFilterForm = document.getElementById('price-filter-form');
    priceFilterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
        const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;

        const filteredProducts = productsData.filter(product =>
            product.price >= minPrice && product.price <= maxPrice
        );
        renderProducts(filteredProducts);
    });
});
