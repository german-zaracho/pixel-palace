const d = document;

/* -------------------------------------------------------------------------- */
/*                              bestSellerSection                             */
/* -------------------------------------------------------------------------- */

// Here listeners are added to the buttons of the bestSellers section to call the openModal() function to generate a modal.

let bestSellerButtons = d.querySelectorAll('.bestSellerButton');

bestSellerButtons.forEach((button, index) => {

    if (index === 0) {
        button.addEventListener('click', () => openModal(products[33]));
    } else if (index === 1) {
        button.addEventListener('click', () => openModal(products[6]));
    }

});

/* -------------------------------------------------------------------------- */
/*                               Product section                              */
/* -------------------------------------------------------------------------- */

let productItem, productNameContainer, productName, productImgContainer, productImg, productInfoContainer, productPrice, productDescription, headphonesDetailsButton, imgModalContainer;

let headphonesSection = d.createElement('section');
headphonesSection.setAttribute('class', 'headphonesSection');

/* -------------------------------------------------------------------- */
/*                                 Modal                                */
/* -------------------------------------------------------------------- */
const openModal = (product) => {

    let shadow = d.createElement('div');
    shadow.id = 'shadow';

    let spanIconClose = d.createElement('span');
    spanIconClose.setAttribute('class', 'material-icons icon');
    spanIconClose.innerHTML = 'close';

    let exit = d.createElement('a');
    exit.href = '#';
    exit.append(spanIconClose);


    exit.addEventListener('click', () => {
        document.body.removeChild(shadow);
        return false;
    });

    imgModalContainer = d.createElement('div');
    imgModalContainer.setAttribute('class', 'imgModalContainer');

    for (let img in product.images) {

        let imgModalWrapper = d.createElement('div');
        imgModalWrapper.setAttribute('class', 'imgModalWrapper');

        let imgModal = d.createElement('img');
        imgModal.src = `assets/images/${product.category}/${product.brand}/${product.images[img]}`;
        imgModal.setAttribute('alt', `${product.name}${img}`);

        console.log(img, ' as ', product.images[img]);

        imgModalWrapper.append(imgModal);
        imgModalContainer.append(imgModalWrapper);

        // When selecting a thumbnail see it larger
        imgModal.addEventListener('click', (e) => {
            modalBigImg.src = e.target.src;
        });

    }

    let modalSlider = d.createElement('div');
    modalSlider.setAttribute('class', 'modalSlider');

    let actualPosition = 0,
        initialPosition = 0,
        finalPosition = product.images.length - 1;

    const modalSliderNavigation = (direction) => {

        let way = direction == 'prev' ? -1 : 1;
        actualPosition += way;

        if (direction == 'prev') {
            if (actualPosition < initialPosition) {
                actualPosition = finalPosition - 1;
            }
        } else {
            if (actualPosition > finalPosition) {
                actualPosition = initialPosition;
            }
        }

        modalBigImg.src = `assets/images/${product.category}/${product.brand}/${product.images[actualPosition]}`;
        console.log(actualPosition);
    };

    let spanIconChevronLeft = d.createElement('span')
    spanIconChevronLeft.setAttribute('class', 'material-icons icon');
    spanIconChevronLeft.innerHTML = 'chevron_left';

    let modalPrevButton = d.createElement('button');
    modalPrevButton.setAttribute('class', 'modalPrevButton ');
    modalPrevButton.append(spanIconChevronLeft);

    modalPrevButton.addEventListener('click', (e) => {
        modalSliderNavigation('prev');
    });

    let modalBigImgWrapper = d.createElement('div');
    modalBigImgWrapper.className = 'modalBigImgWrapper';

    let modalBigImg = d.createElement('img');
    modalBigImg.src = `assets/images/${product.category}/${product.brand}/${product.images[0]}`;

    let spanIconChevronRight = d.createElement('span')
    spanIconChevronRight.setAttribute('class', 'material-icons icon');
    spanIconChevronRight.innerHTML = 'chevron_right';

    let modalNextButton = d.createElement('button');
    modalNextButton.setAttribute('class', 'modalNextButton');
    modalNextButton.append(spanIconChevronRight);

    modalNextButton.addEventListener('click', (e) => {
        modalSliderNavigation('next');
    });

    modalBigImgWrapper.append(modalBigImg);
    modalSlider.append(modalPrevButton, modalBigImgWrapper, modalNextButton);

    let productNameModal = d.createElement('h2');
    productNameModal.innerHTML = `${product.name}`;

    productDescription = d.createElement('p');
    productDescription.className = "productDescription";
    productDescription.innerHTML = `Description: ${product.description}`;

    let productPriceModal = d.createElement('p');
    productPriceModal.innerHTML = `Price: $${product.price}`;

    let addToCartButton = d.createElement('button');
    addToCartButton.setAttribute('class', 'addToCartButton');
    addToCartButton.innerHTML = 'Add To Cart';

    // When clicked save the product information in localstorage
    addToCartButton.addEventListener('click', () => {

        let name = product.name;
        let price = product.price;
        let category = product.category;
        let brand = product.brand;
        let image = product.images[0];

        console.log('Next thing is the product', product, name, price, category, brand, image);

        pushProductToCart(name, price, category, brand, image);
        console.log('The product was saved in localStorage', name, price);

    });

    let modalInfo = d.createElement('div');
    modalInfo.setAttribute('class', 'modalInfo');

    let modalContainer = d.createElement('div');
    modalContainer.setAttribute('class', 'modalContainer');

    if (window.innerWidth <= 790) {
        modalContainer.append(productNameModal, modalSlider, productDescription, productPriceModal, addToCartButton);
    } else {
        modalInfo.append(productNameModal, productDescription, productPriceModal, addToCartButton);

        modalContainer.append(imgModalContainer, modalSlider, modalInfo);
    }

    shadow.append(exit, modalContainer);
    document.body.append(shadow);

};

let main = d.querySelector('main');

function callCategories(category) {
    console.log("The next category is ", category);

    let headphonesTitle = document.createElement('h1');
    let productsContainer = document.createElement('div');
    productsContainer.setAttribute('class', 'productsContainer');

    // The next loop compares the category you receive with the category of the products. If there is a match, makes cards.

    for (let product of products) {
        headphonesTitle.innerHTML = category;

        if (product.category == category) {
            productItem = d.createElement('div');
            productItem.setAttribute('class', 'product');

            productNameContainer = d.createElement('div');
            productNameContainer.setAttribute('class', 'productNameContainer');

            productName = d.createElement('h2');
            productName.innerHTML = product.name;

            productImgContainer = d.createElement('div');
            productImgContainer.setAttribute('class', 'productImgContainer');

            productImg = d.createElement('img');
            productImg.src = `assets/images/${product.category}/${product.brand}/${product.images[0]}`;
            productImg.setAttribute('alt', `${product.name}`);

            productInfoContainer = d.createElement('div');
            productInfoContainer.setAttribute('class', 'productInfoContainer');

            productPrice = d.createElement('p');
            productPrice.innerHTML = `Price: $${product.price}`;

            headphonesDetailsButton = d.createElement('button');
            headphonesDetailsButton.setAttribute('class', 'headphonesDetailsButton');
            headphonesDetailsButton.innerHTML = 'See More Details';

            productNameContainer.append(productName);
            productImgContainer.append(productImg);
            productInfoContainer.append(productPrice);

            productItem.append(productNameContainer, productImgContainer, productInfoContainer, headphonesDetailsButton);

            productsContainer.append(productItem);

            headphonesDetailsButton.addEventListener('click', () => openModal(product));

        }
    }

    headphonesSection.replaceChildren(headphonesTitle, productsContainer);
    appendSection([headphonesSection]);

    if (category == 'cart') {
        cartSection();
    };

    window.addEventListener('keydown', (e) => {
        // console.log(e.key);
        if (e.key == 'Escape' && document.querySelector('#shadow')) {
            document.querySelector('#shadow').remove();
        }

    });
}

let actualSection = main.querySelector('.headphonesSection');
function removeSection(sectionsToRemove) {

    sectionsToRemove.forEach(section => {
        if (main.contains(section)) {
            main.removeChild(section);
        }
    });
    console.log('I removed all the sections');
}

function appendSection(sectionsToAppend) {

    if (actualSection) {
        main.replaceChild(sectionsToAppend[0], actualSection);
    } else {
        main.append(...sectionsToAppend);
    }

}

let bestSellerSection = d.querySelector('.bestSellerSection');

function handleListener(categorySelected) {

    console.log('handleListener was called', "(", categorySelected, ")");

    if (categorySelected === 'home') {

        console.log('home was called');
        removeSection([headphonesSection]);
        appendSection([carousel, sliderSection, bestSellerSection]);

    } else if (categorySelected === 'purchases') {

        removeSection([carousel, sliderSection, bestSellerSection, headphonesSection]);
        console.log('purchases section');
        callCategories(categorySelected);
        purchasesSection();

    } else if (!categorySelected.includes('shopping_cart')) {

        removeSection([carousel, sliderSection, bestSellerSection, headphonesSection]);
        console.log('cartContent', cartContent);
        callCategories(categorySelected);

    }

}

function addClickListener(selector, callback, identifier) {

    const elements = document.querySelectorAll(selector);

    elements.forEach(function (item) {
        // Checks if there is already an event listener with the given identifier
        if (item.hasEventListener && item.hasEventListener[identifier]) {
            return;
        }
        else if (item.parentNode.parentNode.parentNode.className == 'footer-col') {
            // console.log("footer-col li a");
        }
        else {

            item.addEventListener('click', function () {
                const value = selector.includes('li')
                    ? item.textContent.toLowerCase()
                    : item.classList[1];

                callback(value);

            });
            // Mark the element as with event listener and save the identifier
            item.hasEventListener = item.hasEventListener || {};
            item.hasEventListener[identifier] = true;

        }

    });

}

addClickListener('li a', handleListener, 'li a');
addClickListener('.carouselButton', handleListener, 'carouselButton');

/* -------------------------------------------------------------------------- */
/*                                    Cart                                    */
/* -------------------------------------------------------------------------- */

let cartQuantity = d.querySelector('.cartQuantity');

// Get cart from localStorage (if exists)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function pushProductToCart(name, price, category, brand, image) {


    // Check if the product is already in the cart
    let productExists = cart.find(product => product.name === name);

    if (productExists) {
        // Update the quantity
        productExists.quantity++;

    } else {

        // Add a new product to cart
        let newProduct = {
            name: name,
            price: price,
            quantity: 1,
            category: category,
            brand: brand,
            image: image
        };

        cart.push(newProduct);

    }

    runCartQuantity();
    // Update cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

};

function runCartQuantity() {
    cartQuantity.innerHTML = `${cart.length}`;
    console.log('cartQuantity', cartQuantity, cart.length);
}

runCartQuantity();

let cartStatus = d.querySelector('.cartStatus');

let cartTableContainer = d.createElement('div');
cartTableContainer.setAttribute('class', 'cartTableContainer');

let cartTable = d.createElement('table');

let tableRow = d.createElement('tr');

let tableHeaderName = d.createElement('th');
tableHeaderName.innerHTML = 'Name';
let tableHeaderQuantity = d.createElement('th');
tableHeaderQuantity.innerHTML = 'Quantity';
let tableHeaderPrice = d.createElement('th');
tableHeaderPrice.innerHTML = 'Price';
let tableHeaderSubtotal = d.createElement('th');
tableHeaderSubtotal.innerHTML = 'Subtotal';

let goToCart = d.createElement('button');
goToCart.setAttribute('class', 'goToCart cart');
goToCart.innerHTML = "Go To Cart!";

tableRow.append(tableHeaderName, tableHeaderQuantity, tableHeaderPrice, tableHeaderSubtotal);
cartTable.append(tableRow);
cartTableContainer.append(cartTable, goToCart);


let cartStatusA = d.querySelector('.cartStatus a');
cartStatusA.addEventListener('click', () => {

    console.log('cart clicked');

    updateCart(cart);
});


goToCart.addEventListener('click', () => {

    console.log('Go To Cart clicked');

    updateCart(cart);

});

d.addEventListener('click', function (event) {

    console.log('If the menu cart was open, it will close');
    let cartExist = d.querySelector('.cartTableContainer');

    if (cartExist && (!event.target.closest('.cartStatus'))) {

        updateCart(cart);

    }

});

addClickListener('.goToCart', handleListener, 'goToCart');

function updateCart(cart) {
    // When you click on the 'Cart', it checks if the cart information is visible. If it is, it hides it; otherwise, it displays it. However, if the screen width is less than 1070, it simply redirects you to the cart.

    console.log('cart update', cart);

    let cartExist = d.querySelector('.cartTableContainer');
    console.log(cartExist, 'cartExist');

    if (window.innerWidth <= 1070) {
        console.log('estamos a 1070');
        handleListener('cart');
    } else if (cartExist == null) {
        cartStatus.append(cartTableContainer);
        updateCartInfo(cart);
    } else if (cartExist) {
        console.log('removiendo', cartTableContainer);
        cartTableContainer.remove();
    }

    addClickListener('.goToCart', handleListener, 'goToCart');

};

function updateCartInfo(cart) {

    console.log('cart update info', cart);

    let allTableRow = d.querySelectorAll('tr');
    let oldNavTotalContainer = d.querySelector('.navTotal');

    if (allTableRow !== null && oldNavTotalContainer) {

        for (let row of allTableRow) {
            if (row !== allTableRow[0]) {
                row.remove();
            }
        }

        console.log('old', oldNavTotalContainer);
        oldNavTotalContainer.remove();
    }

    if (cart.length !== 0) {
        console.log('cart uploading', localStorage);

        let newCartTotal = 0;

        for (product of cart) {
            let newTableRow = d.createElement('tr');
            newTableRow.className += "productTr";

            let newTableDataName = d.createElement('td');
            newTableDataName.innerHTML = `${product.name}`;

            let newTableDataQuantity = d.createElement('td');
            newTableDataQuantity.innerHTML = `(${product.quantity})`;

            let newTableDataPrice = d.createElement('td');
            newTableDataPrice.innerHTML = `$${product.price}`;

            let newTableDataSubtotal = d.createElement('td');
            newTableDataSubtotal.innerHTML = `$${product.price * product.quantity}`;

            newTableRow.append(newTableDataName, newTableDataQuantity, newTableDataPrice, newTableDataSubtotal);

            cartTable.append(newTableRow);
            newCartTotal += (product.price * product.quantity);
            console.log(newCartTotal);
        }

        console.log('Total ', newCartTotal);

        let navTotalContainer = d.createElement('div');
        navTotalContainer.setAttribute("class", "navTotal");

        let totalText = d.createElement('p');
        totalText.innerHTML = `[Total]`;

        let cartTotal = d.createElement('p');
        cartTotal.innerHTML = `$${newCartTotal}`;

        navTotalContainer.append(totalText, cartTotal);
        cartTableContainer.removeChild(goToCart);
        cartTableContainer.append(navTotalContainer, goToCart);

    }

}

let cartContent = d.createElement('div');
cartContent.setAttribute('class', 'cartContent');

let productBox = d.createElement('div');
productBox.setAttribute('class', 'productBox');

let purchaseSummary = d.createElement('div');
purchaseSummary.setAttribute('class', 'purchaseSummary');

function cartSection() {

    console.log('The cart section will be assembled', cart);

    deleteCartSection();

    if (cart.length !== 0) {

        console.log('cart uploading', localStorage, cart.length);

        let index = 0;

        let newCartTotal = 0;

        for (product of cart) {

            let newProductContainer = d.createElement('div');
            newProductContainer.setAttribute('class', 'productContainer');

            let newImgSrc = products.filter(stockProduct => stockProduct.name === product.name);

            let newImgWrapper = d.createElement('div');
            newImgWrapper.setAttribute('class', 'imgWrapper');

            let newProductImg = d.createElement('img');
            newProductImg.src = `assets/images/${newImgSrc[0].category}/${newImgSrc[0].brand}/${newImgSrc[0].images[0]}`;

            let newProduct = d.createElement('div');
            newProduct.setAttribute('class', 'productName');

            let newProductName = d.createElement('p');
            newProductName.innerHTML = `${product.name}`;

            let newDeleteButton = d.createElement('button');
            newDeleteButton.setAttribute("class", "deleteButton");
            newDeleteButton.innerHTML = 'Delete';

            newDeleteButton.addEventListener('click', () => deleteFromCart(index));

            let newQuantityProductContainer = d.createElement('div');
            newQuantityProductContainer.setAttribute('class', 'quantityProductContainer');

            let newQuantityButtonLess = d.createElement('button');
            newQuantityButtonLess.setAttribute('class', 'buttonLess');
            newQuantityButtonLess.innerHTML = ' - ';

            let newQuantityProduct = d.createElement('span');
            newQuantityProduct.innerHTML = `${product.quantity}`;

            let newQuantityButtonPlus = d.createElement('button');
            newQuantityButtonPlus.setAttribute('class', 'buttonPlus');
            newQuantityButtonPlus.innerHTML = ' + ';

            let newProductValues = d.createElement('div');
            newProductValues.setAttribute('class', 'productValues');

            let newPriceContainer = d.createElement('div');
            newPriceContainer.setAttribute('class', 'priceContainer');

            let newPrice = d.createElement('p');
            newPrice.innerHTML = 'Price';

            let newPriceValue = d.createElement('span');
            newPriceValue.innerHTML = `$${product.price}`;

            let newSubtotalContainer = d.createElement('div');
            newSubtotalContainer.setAttribute('class', 'subtotalContainer');

            let newSubtotal = d.createElement('p');
            newSubtotal.innerHTML = 'Subtotal';

            let newSubtotalValue = d.createElement('span');
            newSubtotalValue.innerHTML = `$${product.price * product.quantity}`;

            newImgWrapper.append(newProductImg);

            newProduct.append(newProductName, newDeleteButton);

            newQuantityProductContainer.append(newQuantityButtonLess, newQuantityProduct, newQuantityButtonPlus);

            newPriceContainer.append(newPrice, newPriceValue);
            newSubtotalContainer.append(newSubtotal, newSubtotalValue);
            newProductValues.append(newPriceContainer, newSubtotalContainer);

            newProductContainer.append(newImgWrapper, newProduct, newQuantityProductContainer, newProductValues);

            productBox.append(newProductContainer);

            newCartTotal += (product.price * product.quantity);

            index++;

        }

        index = 0;
        cartContent.append(productBox);
        newPurchaseSummary(newCartTotal);

    } else {

        let noProductResponse = d.createElement('p');
        noProductResponse.innerHTML = "There's no products here.";
        cartContent.append(noProductResponse);

    }

    headphonesSection.append(cartContent);

    let buttonsLess = d.querySelectorAll('.buttonLess');
    let buttonsPlus = d.querySelectorAll('.buttonPlus');

    buttonsLess.forEach((buttonLess, index) => {

        buttonLess.addEventListener('click', () => {
            updateQuantity(index, -1);
            // console.log('good 1');
        });

    });

    buttonsPlus.forEach((buttonPlus, index) => {

        buttonPlus.addEventListener('click', () => {
            updateQuantity(index, 1);
            // console.log('good 2');
        });

    });

}

function newPurchaseSummary(newCartTotal) {

    console.log('creating newSummary ')
    let summaryTitle = d.createElement('p');
    summaryTitle.setAttribute('class', 'summaryTitle');
    summaryTitle.innerHTML = "Purchase Summary";

    let summaryHr = d.createElement('hr');

    let allCostContainer = d.createElement('div');
    allCostContainer.setAttribute('class', 'allCostContainer');

    let productAmountContainer = d.createElement('div');
    productAmountContainer.setAttribute('class', 'productAmountContainer');

    let productAmount = d.createElement('p');
    productAmount.setAttribute('class', 'productAmount');
    productAmount.innerHTML = `Products (${cart.length})`;

    let productTotalPrice = d.createElement('span');
    productTotalPrice.setAttribute('class', 'productTotalPrice');
    productTotalPrice.innerHTML = `$${newCartTotal}`;

    productAmountContainer.append(productAmount, productTotalPrice);

    let productShippingContainer = d.createElement('div');
    productShippingContainer.setAttribute('class', 'productShippingContainer');

    let productShipping = d.createElement('p');
    productShipping.setAttribute('class', 'productShipping');
    productShipping.innerHTML = `Shipping`;

    let shippingCost = d.createElement('span');
    shippingCost.setAttribute('class', 'shippingCost');
    shippingCost.innerHTML = `Free`;

    productShippingContainer.append(productShipping, shippingCost);

    let productsTotalCostContainer = d.createElement('div');
    productsTotalCostContainer.setAttribute('class', 'productsTotalCostContainer');

    let productFinalCost = d.createElement('p');
    productFinalCost.setAttribute('class', 'productFinalCost');
    productFinalCost.innerHTML = `Total`;

    let totalCost = d.createElement('span');
    totalCost.setAttribute('class', 'totalCost');
    totalCost.innerHTML = `$${newCartTotal}`;

    productsTotalCostContainer.append(productFinalCost, totalCost);

    allCostContainer.append(productAmountContainer, productShippingContainer, productsTotalCostContainer);

    let proceedToCheckoutContainer = d.createElement('div');
    proceedToCheckoutContainer.setAttribute('class', 'proceedToCheckoutContainer');

    let proceedToCheckout = d.createElement('button');
    proceedToCheckout.setAttribute('class', 'proceedToCheckout');
    proceedToCheckout.innerHTML = `Proceed to checkout`;

    proceedToCheckoutContainer.append(proceedToCheckout);

    purchaseSummary.append(summaryTitle, summaryHr, allCostContainer, proceedToCheckoutContainer);

    proceedToCheckout.addEventListener('click', () => {

        console.log('Proceeding to checkout');
        checkout();
        console.log('number 1');
        removeProceedButton();

    });

    cartContent.append(purchaseSummary);

}

function removeProceedButton() {

    let proceedButton = d.querySelector('.proceedToCheckout');

    proceedButton.remove();

};



function updateQuantity(index, quantity) {

    let productsNames = d.querySelectorAll('.productName p');
    // console.log('good 3');
    // Gets the name of the current product
    const currentProductName = productsNames[index].textContent;

    // Search the product in the cart
    const productInCart = cart.find(product => product.name === currentProductName);

    if (productInCart) {

        productInCart.quantity += quantity;

        if (productInCart.quantity < 1) {
            productInCart.quantity = 1;
        }

    }

    // console.log('good 4');
    // Update cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // We pass the current values ​​to the DOM
    let quantitySpan = d.querySelectorAll('.quantityProductContainer span')[index];
    let currentSubtotal = d.querySelectorAll('.subtotalContainer span')[index];
    if (productInCart) {
        quantitySpan.textContent = productInCart.quantity;
        currentSubtotal.textContent = `$${productInCart.quantity * productInCart.price}`;
    }

    console.log('quantity', quantitySpan, productInCart);

};


function deleteFromCart(index) {
    // Remove the product at the specified index from the cart array
    cart.splice(index, 1);

    // Nav cart quantity; 
    cartQuantity.innerHTML = `${cart.length}`;

    // Update cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));


    // Remove the old view of cart
    let oldViewOfCart = d.querySelector('.cartContent');
    console.log('old cart', oldViewOfCart);
    oldViewOfCart.remove();

    // Re-render the cart section to reflect the changes
    cartSection();

}

function checkout() {

    console.log('Checking in');
    deleteCartSection();
    let checkoutHeader = d.querySelector('.headphonesSection h1');
    checkoutHeader.innerHTML = 'Checkout';

    checkoutInfo();

    let subtotalPrices = cart.map(product => product.price * product.quantity);
    let newCartTotal = subtotalPrices.reduce((accumulator, subtotal) => accumulator + subtotal, 0);

    newPurchaseSummary(newCartTotal);

};

let checkoutSection = d.createElement('section');
checkoutSection.className = "checkoutSection";

function checkoutInfo() {

    console.log('Adding info to checkout');

    let clientDataContainer = d.createElement('div');
    clientDataContainer.className = "clientDataContainer";

    let clientDataHeader = d.createElement('h2');
    clientDataHeader.innerHTML = 'Client data';

    let clientDataForm = d.createElement('form');

    let fNameContainer = d.createElement('div');
    fNameContainer.className = 'fNameContainer';

    let fNameLabel = d.createElement('label');
    fNameLabel.setAttribute("for", "fName");
    fNameLabel.innerHTML = "First Name: ";

    let fNameInput = d.createElement('input');
    fNameInput.type = "text";
    fNameInput.id = "fName";
    fNameInput.required = true;
    fNameInput.name = 'fName';

    let lNameContainer = d.createElement('div');
    lNameContainer.className = 'lNameContainer';

    let lNameLabel = d.createElement('label');
    lNameLabel.setAttribute("for", "lName");
    lNameLabel.innerHTML = "Last Name: ";

    let lNameInput = d.createElement('input');
    lNameInput.type = "text";
    lNameInput.id = "lName";
    lNameInput.required = true;
    lNameInput.name = 'lName';

    let phoneNumberContainer = d.createElement('div');
    phoneNumberContainer.className = 'phoneNumberContainer';

    let phoneNumberLabel = d.createElement('label');
    phoneNumberLabel.setAttribute("for", "phoneNumber");
    phoneNumberLabel.innerHTML = "Phone number: ";

    let phoneNumberInput = d.createElement('input');
    phoneNumberInput.type = "text";
    phoneNumberInput.id = "phoneNumber";
    phoneNumberInput.required = true;
    phoneNumberInput.name = 'phoneNumber';

    let deliveryDetailsContainer = d.createElement('div');
    deliveryDetailsContainer.className = "deliveryDetailsContainer";

    let deliveryDetailsHeader = d.createElement('h2');
    deliveryDetailsHeader.innerHTML = 'Delivery details';

    let deliveryDetailsForm = d.createElement('form');
    // deliveryDetailsForm.method = "post";

    let deliveryAddressContainer = d.createElement('div');
    deliveryAddressContainer.className = "deliveryAddressContainer";

    let deliveryAddressLabel = d.createElement('label');
    deliveryAddressLabel.setAttribute('for', 'deliveryAddress');
    deliveryAddressLabel.innerHTML = "Delivery Address: "

    let deliveryAddressInput = d.createElement('input');
    deliveryAddressInput.type = "text";
    deliveryAddressInput.id = 'deliveryAddress';
    deliveryAddressInput.required = true;
    deliveryAddressInput.name = 'deliveryAddress';

    let date = d.createElement('p');

    let dateText = d.createElement('span');
    dateText.innerHTML = "Delivery date: ";

    let dateInfo = d.createElement('span');
    dateInfo.innerHTML = `${nextDate()}`;

    let paymentDetailsContainer = d.createElement('div');
    paymentDetailsContainer.className = "paymentDetailsContainer";

    let paymentDetailsHeader = d.createElement('h2');
    paymentDetailsHeader.innerHTML = 'Payment details';

    let paymentDetailsForm = d.createElement('form');

    let creditCardOptionContainer = d.createElement('div');
    creditCardOptionContainer.className = "creditCardOptionContainer";

    let creditCardInput = d.createElement('input');
    creditCardInput.type = 'radio';
    creditCardInput.name = 'payment';
    creditCardInput.id = 'creditCard';
    creditCardInput.value = 'Credit card';

    let creditCardLabel = d.createElement('label');
    creditCardLabel.setAttribute('for', 'creditCard');
    creditCardLabel.innerHTML = 'Credit card';

    let creditCardInfoContainer = d.createElement('div');
    creditCardInfoContainer.className = "creditCardInfoContainer";

    let creditCardNumberContainer = d.createElement('div');
    creditCardNumberContainer.className = "creditCardNumberContainer";

    let creditCardNumberLabel = d.createElement('label');
    creditCardNumberLabel.setAttribute("for", "creditCardNumber");
    creditCardNumberLabel.innerHTML = "Credit card number: ";

    let creditCardNumberInput = d.createElement('input');
    creditCardNumberInput.type = "text";
    creditCardNumberInput.id = "creditCardNumber";
    creditCardNumberInput.required = true;
    creditCardNumberInput.name = 'creditCardNumber';

    let nameInCreditCardContainer = d.createElement('div');
    nameInCreditCardContainer.className = 'nameInCreditCardContainer';

    let nameInCreditCardLabel = d.createElement('label');
    nameInCreditCardLabel.setAttribute("for", "nameInCreditCard");
    nameInCreditCardLabel.innerHTML = "Full name(as shown on the card): ";

    let nameInCreditCardInput = d.createElement('input');
    nameInCreditCardInput.type = "text";
    nameInCreditCardInput.id = "nameInCreditCard";
    nameInCreditCardInput.required = true;
    nameInCreditCardInput.name = 'nameInCreditCard';

    let expirationDateContainer = d.createElement('div');
    expirationDateContainer.className = 'expirationDateContainer';

    let expirationDateLabel = d.createElement('label');
    expirationDateLabel.setAttribute("for", "expirationDate");
    expirationDateLabel.innerHTML = "Expiration Date(mount/year): ";

    let expirationDateInput = d.createElement('input');
    expirationDateInput.type = "text";
    expirationDateInput.id = "expirationDate";
    expirationDateInput.required = true;
    expirationDateInput.name = 'expirationDate';

    let cardSecurityCodeContainer = d.createElement('div');
    cardSecurityCodeContainer.className = 'cardSecurityCodeContainer';

    let cardSecurityCodeLabel = d.createElement('label');
    cardSecurityCodeLabel.setAttribute("for", "cardSecurityCode");
    cardSecurityCodeLabel.innerHTML = "Card security code (CVV): ";

    let cardSecurityCodeInput = d.createElement('input');
    cardSecurityCodeInput.type = "text";
    cardSecurityCodeInput.id = "cardSecurityCode";
    cardSecurityCodeInput.required = true;
    cardSecurityCodeInput.name = 'cardSecurityCode';

    let ownerDniContainer = d.createElement('div');
    ownerDniContainer.className = 'ownerDniContainer';

    let ownerDniLabel = d.createElement('label');
    ownerDniLabel.setAttribute("for", "ownerDni");
    ownerDniLabel.innerHTML = "Owner's D.N.I.: ";

    let ownerDniInput = d.createElement('input');
    ownerDniInput.type = "text";
    ownerDniInput.id = "ownerDni";
    ownerDniInput.required = true;
    ownerDniInput.name = 'ownerDni';

    let installmentsContainer = d.createElement('div');
    installmentsContainer.className = 'installmentsContainer';

    let installmentsLabel = d.createElement('label');
    installmentsLabel.setAttribute('for', 'installments');
    installmentsLabel.innerHTML = "Installments: ";

    let installmentsSelect = d.createElement('select');
    installmentsSelect.id = 'installments';
    installmentsSelect.name = 'installments';

    let firstOption = d.createElement('option');
    firstOption.value = 3;
    firstOption.innerHTML = 3;

    let secondOption = d.createElement('option');
    secondOption.value = 6;
    secondOption.innerHTML = 6;

    let thirdOption = d.createElement('option');
    thirdOption.value = 12;
    thirdOption.innerHTML = 12;

    let cashOptionContainer = d.createElement('div');
    cashOptionContainer.className = 'cashOptionContainer';

    let cashInput = d.createElement('input');
    cashInput.type = 'radio';
    cashInput.name = 'payment';
    cashInput.id = 'cash';
    cashInput.value = 'Cash';

    let cashLabel = d.createElement('label');
    cashLabel.setAttribute('for', 'cash');
    cashLabel.innerHTML = 'Cash';

    let cashInfoContainer = d.createElement('div');
    cashInfoContainer.className = 'cashInfoContainer';

    let pagoFacilContainer = d.createElement('div');
    pagoFacilContainer.className = 'pagoFacilContainer';

    let pagoFacilInput = d.createElement('input');
    pagoFacilInput.type = 'radio';
    pagoFacilInput.name = 'cashOption';
    pagoFacilInput.id = 'pagoFacil';
    pagoFacilInput.value = 'Pago Fácil';

    let pagoFacilLabel = d.createElement('label');
    pagoFacilLabel.setAttribute('for', 'pagoFacil');
    pagoFacilLabel.innerHTML = 'Pago Fácil';

    let rapiPagoContainer = d.createElement('div');
    rapiPagoContainer.className = 'rapipagoContainer';

    let rapiPagoInput = d.createElement('input');
    rapiPagoInput.type = 'radio';
    rapiPagoInput.name = 'cashOption';
    rapiPagoInput.id = 'rapiPago';
    rapiPagoInput.value = 'Rapipago';

    let rapiPagoLabel = d.createElement('label');
    rapiPagoLabel.setAttribute('for', 'rapiPago');
    rapiPagoLabel.innerHTML = 'Rapipago';

    let checkoutContinueButton = d.createElement('button');
    checkoutContinueButton.className = 'checkoutContinueButton';
    checkoutContinueButton.innerHTML = 'Continue';

    let backToCartButton = d.createElement("button");
    backToCartButton.className = 'backToCartButton';
    backToCartButton.innerHTML = 'Return to Cart';

    backToCartButton.addEventListener('click', () => {
        handleListener('cart');
    });

    fNameContainer.append(fNameLabel, fNameInput);
    lNameContainer.append(lNameLabel, lNameInput);
    phoneNumberContainer.append(phoneNumberLabel, phoneNumberInput);

    clientDataForm.append(fNameContainer, lNameContainer, phoneNumberContainer);

    clientDataContainer.append(clientDataHeader, clientDataForm);

    date.append(dateText, dateInfo);

    deliveryAddressContainer.append(deliveryAddressLabel, deliveryAddressInput);

    deliveryDetailsForm.append(deliveryAddressContainer, date);
    deliveryDetailsContainer.append(deliveryDetailsHeader, deliveryDetailsForm);

    creditCardOptionContainer.append(creditCardInput, creditCardLabel);

    creditCardNumberContainer.append(creditCardNumberLabel, creditCardNumberInput);

    nameInCreditCardContainer.append(nameInCreditCardLabel, nameInCreditCardInput);

    expirationDateContainer.append(expirationDateLabel, expirationDateInput);

    cardSecurityCodeContainer.append(cardSecurityCodeLabel, cardSecurityCodeInput);

    ownerDniContainer.append(ownerDniLabel, ownerDniInput);

    installmentsSelect.append(firstOption, secondOption, thirdOption);

    installmentsContainer.append(installmentsLabel, installmentsSelect);

    creditCardInfoContainer.append(creditCardNumberContainer, nameInCreditCardContainer, expirationDateContainer, cardSecurityCodeContainer, ownerDniContainer, installmentsContainer);

    cashOptionContainer.append(cashInput, cashLabel);

    pagoFacilContainer.append(pagoFacilInput, pagoFacilLabel);

    rapiPagoContainer.append(rapiPagoInput, rapiPagoLabel);

    cashInfoContainer.append(pagoFacilContainer, rapiPagoContainer);

    paymentDetailsForm.append(creditCardOptionContainer, creditCardInfoContainer, cashOptionContainer, cashInfoContainer);
    paymentDetailsContainer.append(paymentDetailsHeader, paymentDetailsForm);

    checkoutSection.append(clientDataContainer, deliveryDetailsContainer, paymentDetailsContainer, checkoutContinueButton, backToCartButton);

    cartContent.append(checkoutSection);

    formPreventDefault();
}

function dateFormat(date) {

    let year = date.getFullYear();
    let month = date.getMonth() + 1; // Months go from 0 to 11
    let day = date.getDate();

    // Format the date of the next day
    let nextDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;

    // console.log('date', year, month, day, nextDate);

    return nextDate;

}

function nextDate() {

    let nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);
    console.log(nextDate);
    return dateFormat(nextDate);

}

function currentDate() {

    let currentDate = new Date();
    console.log(currentDate);
    return dateFormat(currentDate);

}


function formPreventDefault() {
    console.log('the preventer is working');
    let forms = d.querySelectorAll('form');

    forms.forEach(function (form) {
        form.addEventListener("submit", function (e) {
            console.log('the preventer is working 2');
            // Prevent automatic form submission
            e.preventDefault();
        });
    });

    finishCheckout();

}

// Get purchases from localStorage (if exists)
let purchases = JSON.parse(localStorage.getItem('purchases')) || [];


function finishCheckout() {

    let checkoutContinueButton = d.querySelector('.checkoutContinueButton');
    let formData = {};

    let fName = d.getElementById('fName');
    let lName = d.getElementById('lName');
    let phoneNumber = d.getElementById('phoneNumber');
    let deliveryAddress = d.getElementById('deliveryAddress');
    let creditCardNumber = d.getElementById('creditCardNumber');
    let nameInCreditCard = d.getElementById('nameInCreditCard');
    let expirationDate = d.getElementById('expirationDate');
    let cardSecurityCode = d.getElementById('cardSecurityCode');
    let ownerDni = d.getElementById('ownerDni');
    let installmentSelected = document.getElementById('installments');

    checkoutContinueButton.addEventListener('click', () => {

        console.log('checkoutButton has been click');

        const requiredFields = document.querySelectorAll('[required]');
        let filledCount = 0;

        requiredFields.forEach(function (field) {
            if (field.value) {
                filledCount++;
            } else {

                const errorMessage = document.createElement('p');
                errorMessage.className = 'errorMessage';
                errorMessage.textContent = 'Please complete this field.';
                field.parentNode.insertBefore(errorMessage, field.nextSibling);

            }
        });

        if (filledCount !== requiredFields.length) {
            console.log("at least 1 field is empty");

        }

        else {

            let payment = d.querySelector('input[type="radio"][name="payment"]:checked');
            let cashOption = d.querySelector('input[type="radio"][name="cashOption"]:checked');

            formData[fName.name] = fName.value;
            formData[lName.name] = lName.value;
            formData[phoneNumber.name] = phoneNumber.value;
            formData[deliveryAddress.name] = deliveryAddress.value;
            formData['deliveryDate'] = `${nextDate()}`;
            formData['purchaseDate'] = `${currentDate()}`;
            formData[payment.name] = payment.value;
            formData[creditCardNumber.name] = creditCardNumber.value;
            formData[nameInCreditCard.name] = nameInCreditCard.value;
            formData[expirationDate.name] = expirationDate.value;
            formData[cardSecurityCode.name] = cardSecurityCode.value;
            formData[ownerDni.name] = ownerDni.value;
            formData[installmentSelected.name] = installmentSelected.value;
            formData[cashOption.name] = cashOption.value;

            console.log('info checkout => success', formData, cart);

            const newPurchase = {
                formData: formData,
                products: cart,
            };

            purchases.push(newPurchase);

            localStorage.setItem('purchases', JSON.stringify(purchases));

            deleteCartSection();

            emptyCart();

            runCartQuantity();

            successMessage();

            console.log(purchases, 'purchase complete');

        }

    });

}

function emptyCart() {

    cart = [];

    localStorage.removeItem("cart");

    console.log(cart, 'empty cart');

}

function successMessage() {

    let checkoutResponseContainer = d.createElement('div');
    checkoutResponseContainer.className = 'checkoutResponseContainer';

    let messageContainer = d.createElement("div");
    messageContainer.className = 'messageContainer';

    let successImage = d.createElement('img');
    successImage.src = 'assets/images/success.png';
    successImage.alt = 'Success Image';

    let successMessageP = d.createElement('div');
    successMessageP.className = 'successMessage';
    successMessageP.innerHTML = 'Your purchase was successful! Thank you for choosing us!';

    let successButtonsContainer = d.createElement("div");
    successButtonsContainer.className = 'successButtonsContainer';

    let seePurchasesButton = d.createElement("button");
    seePurchasesButton.className = 'seePurchasesButton';
    seePurchasesButton.innerHTML = 'See your purchases';

    seePurchasesButton.addEventListener('click', () => {
        handleListener('purchases');
    });

    let backToHomeButton = d.createElement("button");
    backToHomeButton.className = 'backToHomeButton';
    backToHomeButton.innerHTML = 'Back to home';

    backToHomeButton.addEventListener('click', () => {
        handleListener('home');
    });

    messageContainer.append(successImage, successMessageP);

    successButtonsContainer.append(seePurchasesButton, backToHomeButton);

    checkoutResponseContainer.append(messageContainer, successButtonsContainer);

    cartContent.append(checkoutResponseContainer);

}

function deleteCartSection() {

    console.log('Deleting cart content');

    if (productBox !== null) {
        while (productBox.firstChild) {
            productBox.removeChild(productBox.firstChild);
        }
    }

    if (purchaseSummary !== null) {
        while (purchaseSummary.firstChild) {
            purchaseSummary.removeChild(purchaseSummary.firstChild);
        }
    }

    if (checkoutSection !== null) {
        while (checkoutSection.firstChild) {
            checkoutSection.removeChild(checkoutSection.firstChild);
        }
    }

    if (cartContent !== null) {
        while (cartContent.firstChild) {
            cartContent.removeChild(cartContent.firstChild);
        }
    }

};

function purchasesSection() {

    console.log('purchases Section has begun');

    let purchasesContainer = d.createElement('div');
    purchasesContainer.setAttribute("class", "purchasesContainer");

    if (purchases) {

        purchases.forEach((purchase, index) => {

            console.log(`Purchase number ${index + 1}`);

            let formData = purchase.formData;

            let purchaseContainer = d.createElement('div');
            purchaseContainer.className = 'purchaseContainer';

            let purchaseDate = d.createElement('p');
            purchaseDate.className = 'purchaseDate';
            purchaseDate.innerHTML = `Purchase Date: ${formData.purchaseDate}`;

            console.log(`Método de pago: ${formData.payment}`);

            let shoppingProducts = d.createElement('div');
            shoppingProducts.className = 'shoppingProducts';

            let totalPrice = 0;

            // Iterate over each product in the purchase
            purchase.products.forEach((product) => {

                let productContainer = d.createElement('div');
                productContainer.className = 'productContainer';

                let imageWrapper = d.createElement('div');
                imageWrapper.className = 'imageWrapper';

                let productImage = d.createElement('img');
                productImage.src = `assets/images/${product.category}/${product.brand}/${product.image}`;
                productImage.setAttribute('alt', `${product.name}`);

                let productDetails = d.createElement('div');
                productDetails.className = 'productDetails';

                let productName = d.createElement('p');
                productName.className = 'productName';
                productName.innerHTML = `${product.name}`;

                let productQuantity = d.createElement('p');
                productQuantity.className = 'productQuantity';
                productQuantity.innerHTML = `Quantity: ${product.quantity}`;

                let amountInfo = d.createElement('div');
                amountInfo.className = 'amountInfo';

                let productPrice = d.createElement('p');
                productPrice.className = 'productPrice';
                productPrice.innerHTML = `Price: ${product.price}`;

                let productSubtotal = d.createElement('p');
                productSubtotal.className = 'productSubtotal';
                productSubtotal.innerHTML = `Subtotal: ${(product.price * product.quantity)}`;

                imageWrapper.append(productImage);

                productDetails.append(productName, productQuantity);

                amountInfo.append(productPrice, productSubtotal);

                productContainer.append(imageWrapper, productDetails, amountInfo);

                shoppingProducts.append(productContainer);

                totalPrice += (product.price * product.quantity);

            });

            let orderSummary = d.createElement('div');
            orderSummary.className = 'orderSummary';

            let deliveryDate = d.createElement('p');
            deliveryDate.className = 'deliveryDate';
            deliveryDate.innerHTML = `Delivery Date: ${formData.deliveryDate}`;

            let totalPurchasePrice = d.createElement('p');
            totalPurchasePrice.className = 'totalPurchasePrice';
            totalPurchasePrice.innerHTML = `Total: ${totalPrice}`;

            let deletePurchase = d.createElement('button')
            deletePurchase.className = 'deletePurchase';
            deletePurchase.innerHTML = "Delete Purchase";

            let purchaseRemoved = purchases[index];

            deletePurchase.addEventListener("click", () => { deletePurchases(purchaseRemoved) });

            orderSummary.append(deliveryDate, totalPurchasePrice);

            purchaseContainer.append(purchaseDate, shoppingProducts, orderSummary, deletePurchase);

            purchasesContainer.append(purchaseContainer);
        })
    }

    headphonesSection.append(purchasesContainer);

}

// Filters the array of purchases, deletes the selected purchase and returns a new array. Then replace the localStorage and refresh the purchases section.
function deletePurchases(purchaseRemoved) {

    let newPurchases = purchases.filter(function (purchase) {

        return purchase !== purchaseRemoved;

    })

    purchases = newPurchases;

    localStorage.setItem('purchases', JSON.stringify(purchases));

    handleListener('purchases');

}

/* -------------------------------------------------------------------------- */
/*                               Logo and footer                              */
/* -------------------------------------------------------------------------- */

let footerLinks = document.querySelectorAll('.footer-col a');

footerLinks.forEach(link => {

    link.addEventListener('click', () => {

        console.log('Footer link clicked', link);

    });

});

let logoContainerListener = document.querySelector('.logoContainer').addEventListener('click', () => {

    console.log('Logo clicked', logoContainerListener, carousel);

    if (carousel) {
        handleListener('home');
    }

});















