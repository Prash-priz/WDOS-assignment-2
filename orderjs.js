 let prices = []

 fetch('prices.json')
 .then(response => response.json())
 .then(data =>{
     prices = data;
     localStorage.setItem("prices",JSON.stringify(prices));
    });



    function gatherOrder() {
        const order = {};
        for (const item in prices[0]) {
            console.log(item)
            const quantity = document.getElementById(item).value;
            if (quantity > 0) {
                order[item] = quantity;
            }   
        }
        return order;


    }


    function updateOrderTable() {
        const order = gatherOrder();
        const tbody = document.querySelector('#orderTable tbody');
        tbody.innerHTML = '';
        let total = 0;

        for (const item in order) {
            const quantity = order[item];
            const price = prices[0][item] * quantity;
            total += price;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item}</td>
                <td>${quantity}</td>
                <td>Rs.${price.toFixed(2)}</td>
            `;
            tbody.appendChild(row);
        }

        document.getElementById('totalPrice').innerText = `Rs.${total.toFixed(2)}`;
    }

    let input=document.querySelectorAll('input[type="number"]');
    input.forEach(input => {
        input.addEventListener('input', updateOrderTable);
    });

    //add favourites//
    let addfav=document.getElementById('addToFavourites');
    function addFav(){
        const order = gatherOrder();
        localStorage.setItem('favouriteOrder', JSON.stringify(order));
        alert('Order saved as favourite.');
    }
    addfav.addEventListener('click',addFav);

    // apply favourites//
    function applyOrder(order) {
        for (const item in order) {
            document.getElementById(item).value = order[item];
        }
        updateOrderTable();
    }


    let applyfav=document.getElementById('applyFavourites');
    function applyFav(){
        const favouriteOrder = JSON.parse(localStorage.getItem('favouriteOrder'));
        if (favouriteOrder) {
            applyOrder(favouriteOrder);
        } else {
            alert('No favourite order found.');
        }
    }
    applyfav.addEventListener('click',applyFav);


    //linking the checkout page //
    let buynow=document.getElementById('buyNow');
    function buyNow(){
        const order = gatherOrder();
        if(Object.keys(order).length != 0){
        localStorage.setItem('currentOrder', JSON.stringify(order));
         localStorage.removeItem('favouriteOrder', JSON.stringify(order));
        window.location.href = 'checkout.html';
        }
        else{
           localStorage.removeItem('currentOrder');
            alert('no order found');
        }
    }
    buynow.addEventListener('click',buyNow);


//reset button//
    let reset=document.getElementById('reset');
    function Reset(){
        for (const item in prices[0]) {
            document.getElementById(item).value = 0;
        }
        localStorage.removeItem('currentOrder');
        const tbody = document.querySelector('#orderTable tbody');
        tbody.innerHTML = '';
        document.getElementById('totalPrice').innerText = '';
    
    }
    reset.addEventListener('click',Reset);




