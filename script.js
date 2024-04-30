const productContainer = document.getElementById('productContainer')
const addToCartBtn = document.getElementById('addToCartBtn');
const toastLiveExample = document.getElementById('liveToast');
const all = document.getElementById('all');
const mensClothing = document.getElementById('mens-cloth');
const jewellery = document.getElementById('jewell');
const womensClothing = document.getElementById('womens-cloth')
const electronics = document.getElementById('electronics');


//Getting the product details from Fake Store API
document.addEventListener('DOMContentLoaded', () => {

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(jsonResponse => {

            jsonResponse.forEach(p => {
                const id = p.id;
                const productTitle = p.title;
                const productPrice = p.price;
                const productDescription = p.description;
                const category = p.category;
                const imageUrl = p.image;
                const rate = p.rating.rate;
                const count = p.rating.count;

                productContainer.appendChild(createProductCard(id, productTitle, productDescription, productPrice, category, imageUrl, rate, count))
            })
        })
})



// Function to create product card component
function createProductCard(id, productName, productDescription, productPrice, category, imageUrl, rate, count) {
    // Create outer div
    const outerDiv = createElement('div', {
        classNames: 'col-lg-4 col-md-6 col-sm-12'

    });

    // Create inner div for card
    const innerDiv = createElement('div', {
        classNames: 'card mb-4',
        dataId: id
    });

    // Create div for image
    const imageDiv = createElement('div', {
        classNames: 'd-flex justify-content-center m-2 imgContainer'
    });

    // Create image element
    const image = createElement('img', {
        src: imageUrl,
        classNames: 'card-img-top',
        alt: productName,
    });

    // Append image to imageDiv
    imageDiv.appendChild(image);

    // Create div for card body
    const bodyDiv = createElement('div', {
        classNames: 'card-body p-4'
    });

    // Create badge
    const badge = createElement('p', {
        classNames: 'badge text-bg-secondary',
        innerHtml: category
    });

    // Create title
    const title = createElement('h5', {
        classNames: 'card-title',
        innerHtml: productName
    });

    // Create text
    const text = createElement('p', {
        classNames: 'card-text product-description',
        innerHtml: productDescription
    });

    // Create div for price and rating
    const priceRatingDiv = createElement('div', {
        classNames: 'd-flex align-items-center justify-content-between'
    });

    // Create price
    const price = createElement('h3', {
        innerHtml: `$ ${productPrice}`
    });

    // Create rating
    const rating = createElement('div', {
        innerHtml: `<b>Rating:</b> ${rate} (${count})`
    });

    // Append price and rating to priceRatingDiv
    priceRatingDiv.appendChild(price);
    priceRatingDiv.appendChild(rating);

    // Create div for select and button
    const selectButtonDiv = createElement('div', {
        classNames: 'd-flex justify-content-center gap-3 mt-4'
    });

    // Create select element
    const select = createElement('select', {
        classNames: 'form-select',
        attributes: {
            'aria-label': 'Default select example'
        }
    });

    // Create options for select
    const options = ['Quantity', '1', '2', '3', '4', '5'];
    options.forEach(optionText => {
        const option = createElement('option', {
            innerHtml: optionText
        });
        select.appendChild(option);
    });

    // Create button
    const button = createElement('button', {
        id: "addToCartBtn",
        classNames: 'btn w-100 btn-dark d-flex gap-2 justify-content-center align-items-center',
        innerHtml: '<i class="fa-solid fa-cart-shopping"></i>Add to Cart'
    });

    button.addEventListener('click', handleAddToCart)


    // Append select and button to selectButtonDiv
    selectButtonDiv.appendChild(select);
    selectButtonDiv.appendChild(button);

    // Append badge, title, text, priceRatingDiv, selectButtonDiv to bodyDiv
    bodyDiv.appendChild(badge);
    bodyDiv.appendChild(title);
    bodyDiv.appendChild(text);
    bodyDiv.appendChild(priceRatingDiv);
    bodyDiv.appendChild(selectButtonDiv);

    // Append imageDiv and bodyDiv to innerDiv
    innerDiv.appendChild(imageDiv);
    innerDiv.appendChild(bodyDiv);

    // Append innerDiv to outerDiv
    outerDiv.appendChild(innerDiv);

    return outerDiv;
}


// Function to create element using DOM
function createElement(elementName, args) {
    const element = document.createElement(elementName);

    if (args.dataId) {
        element.setAttribute('data-id', args.dataId);
    }

    if (args.id) {
        element.id = args.id;
    }

    if (args.classNames) {
        args.classNames.split(' ').forEach(c => {
            element.classList.add(c);
        });
    }

    if (args.innerHtml) {
        element.innerHTML = args.innerHtml;
    }

    if (args.src) {
        element.src = args.src;
    }

    return element;
}


function handleAddToCart(e) {
    const id = e.target.parentNode.parentNode.parentNode.attributes['data-id'].value;
    const userId = 1 // Considering we are logged in as user with id 1
    const quantity = +e.target.parentNode.firstChild.selectedOptions[0].innerText || 1

    const payload = {
        userId: userId,
        date: "2024-04-29",
        products: [{ productId: id, quantity: quantity }]
    }

    fetch('https://fakestoreapi.com/carts', {
        method: "POST",
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(json => {

            //Code to trigger toast message
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
            toastBootstrap.show();
        })
        .catch(err => alert(err.message))
}



//Filters 

mensClothing.addEventListener('click', () => {
    fetch(`https://fakestoreapi.com/products/category/men's%20clothing`)
        .then(res => res.json())
        .then(jsonResponse => {
            productContainer.innerHTML = '';
            jsonResponse.forEach(p => {
                const id = p.id;
                const productTitle = p.title;
                const productPrice = p.price;
                const productDescription = p.description;
                const category = p.category;
                const imageUrl = p.image;
                const rate = p.rating.rate;
                const count = p.rating.count;

                productContainer.appendChild(createProductCard(id, productTitle, productDescription, productPrice, category, imageUrl, rate, count))
            })
        })
        .catch(err => alert(err.message))
})

jewellery.addEventListener('click', () => {
    fetch(`https://fakestoreapi.com/products/category/jewelery`)
        .then(res => res.json())
        .then(jsonResponse => {
            productContainer.innerHTML = '';
            jsonResponse.forEach(p => {
                const id = p.id;
                const productTitle = p.title;
                const productPrice = p.price;
                const productDescription = p.description;
                const category = p.category;
                const imageUrl = p.image;
                const rate = p.rating.rate;
                const count = p.rating.count;

                productContainer.appendChild(createProductCard(id, productTitle, productDescription, productPrice, category, imageUrl, rate, count))
            })
        })
        .catch(err => alert(err.message))
})

womensClothing.addEventListener('click', () => {
    fetch(`https://fakestoreapi.com/products/category/women's%20clothing`)
        .then(res => res.json())
        .then(jsonResponse => {
            productContainer.innerHTML = '';
            jsonResponse.forEach(p => {
                const id = p.id;
                const productTitle = p.title;
                const productPrice = p.price;
                const productDescription = p.description;
                const category = p.category;
                const imageUrl = p.image;
                const rate = p.rating.rate;
                const count = p.rating.count;

                productContainer.appendChild(createProductCard(id, productTitle, productDescription, productPrice, category, imageUrl, rate, count))
            })
        })
        .catch(err => alert(err.message))
})

electronics.addEventListener('click', () => {
    fetch(`https://fakestoreapi.com/products/category/electronics`)
        .then(res => res.json())
        .then(jsonResponse => {
            productContainer.innerHTML = '';
            jsonResponse.forEach(p => {
                const id = p.id;
                const productTitle = p.title;
                const productPrice = p.price;
                const productDescription = p.description;
                const category = p.category;
                const imageUrl = p.image;
                const rate = p.rating.rate;
                const count = p.rating.count;

                productContainer.appendChild(createProductCard(id, productTitle, productDescription, productPrice, category, imageUrl, rate, count))
            })
        })
        .catch(err => alert(err.message))
})

all.addEventListener('click', () => {
    fetch(`https://fakestoreapi.com/products`)
        .then(res => res.json())
        .then(jsonResponse => {
            productContainer.innerHTML = '';
            jsonResponse.forEach(p => {
                const id = p.id;
                const productTitle = p.title;
                const productPrice = p.price;
                const productDescription = p.description;
                const category = p.category;
                const imageUrl = p.image;
                const rate = p.rating.rate;
                const count = p.rating.count;

                productContainer.appendChild(createProductCard(id, productTitle, productDescription, productPrice, category, imageUrl, rate, count))
            })
        })
        .catch(err => alert(err.message))
})