let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName,price)
{   
    cart.push({productName, price})
    localStorage.setItem('cart',JSON.stringify(cart));
    updateCount();
    addProduct();
    alert("Added to cart:"+productName+" "+price+"EGP");
}

function addProduct()
{
    const tbody = document.querySelector(".table tbody");
    if (!tbody) return;

    tbody.innerHTML = '';

    let total = 0;

    cart.forEach((item, index) => {     
    const product = document.createElement("tr");

    const product_cell = document.createElement("td");
    product_cell.textContent = item.productName;
    product.appendChild(product_cell);

    const price_cell = document.createElement("td");
    price_cell.textContent = item.price.toFixed(2);
    product.appendChild(price_cell);

    const removeButton_cell = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = () => removeProduct(index);
    removeButton_cell.appendChild(removeButton);
    product.appendChild(removeButton_cell);

    tbody.appendChild(product);

    total += item.price;
    });
    
    const totalElement = document.getElementById("total");
    if (totalElement) totalElement.textContent = total.toFixed(2);
}


function removeProduct(index)
{
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCount();
    addProduct();
}

function updateCount()
{
    const cartNotification = document.getElementById("notification");
    if (cartNotification) {
        cartNotification.style.display = "block";
        cartNotification.textContent = cart.length;
    }
}  

function remove_all_element()
{
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCount();
    addProduct();
}

function fav(button) 
{
    let icon = button.querySelector('svg');
    let currentColor = icon.getAttribute("fill");
    
    if (currentColor === "#000000") {
        icon.setAttribute("fill", "#EA3323");
    } else {
        icon.setAttribute("fill", "#000000");
    }
}




document.addEventListener("DOMContentLoaded", () => {
    updateCount();
    addProduct();
});

document.addEventListener("DOMContentLoaded", function() {
    const aboutUsButton = document.querySelector('.about_us');
    if (aboutUsButton) {
        aboutUsButton.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector('#footer');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
