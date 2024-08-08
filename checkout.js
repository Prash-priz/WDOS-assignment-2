

    const form = document.getElementById('checkoutForm');
    const order = JSON.parse(localStorage.getItem('currentOrder'));
    let prices = JSON.parse(localStorage.getItem('prices'))
    
    
    
     function confirmation(){
        if (form.checkValidity()) {
            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + 3);
            window.location.href = 'order.html';
            alert(`Thank you for your purchase! Your order will be delivered on ${deliveryDate.toDateString()}`);
            localStorage.removeItem('currentOrder');
           
        }
       
    };

    form.addEventListener('submit', confirmation);

    function updateOrderTable() {
        const order = JSON.parse(localStorage.getItem('currentOrder'));;
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
    updateOrderTable()

    
