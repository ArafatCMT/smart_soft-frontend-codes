const loadSaleReport = () =>{
    const ownerId = localStorage.getItem("ownerId")
    const token = localStorage.getItem("authToken");
    // console.log(ownerId)

    const parent = document.getElementById("tbody")

    fetch(`https://smart-soft.onrender.com/purchases/sale/report/?owner_id=${ownerId}`)
    .then(res => res.json())
    .then(sale => {
        console.log(sale.length)

        if (sale.length > 0){
            document.getElementById('empty').style.display = 'none';
        }
        let i=0;
        sale.forEach((sl)=>{
            const tr = document.createElement('tr')
            // console.log(sl.customer, sl.product)
            fetch(`https://smart-soft.onrender.com/peoples/edit/customer/${sl.customer}/`,{
            method: "GET",
            headers: {
            "content-type": "application/json",
            Authorization: `Token ${token}`,
            },
        })
        .then(res => res.json())
        .then(customer => {

            fetch(`https://smart-soft.onrender.com/products/single/product/${sl.product}`)
            .then(res => res.json())
            .then(product => {

                fetch(`https://smart-soft.onrender.com/products/unit/${product.unit}/`)
                .then(res => res.json())
                .then(unit => {
                    i++;
                    tr.innerHTML = ` 
                    <td>${i}</td>
                    <td>${customer.name}</td>
                    <td>${product.name}</td>
                    <td>${sl.quentity} ${unit.name}</td>
                    <td>${sl.date}</td>
                    
                    
                    <td>${sl.receivable} TK</td>
                    <td>${sl.paid} TK</td>
                    <td>${sl.due} TK</td>
                    <td>${sl.purchase_cost} TK</td>
                    <td>${sl.profit} TK</td>
                    <td>${sl.status}</td>
                                `
                    parent.appendChild(tr)
                })
            })
        })
        })

        

    })
}

const Display = () =>{
    const ownerId = localStorage.getItem("ownerId")
    const token = localStorage.getItem("authToken");

    fetch(`https://smart-soft.onrender.com/peoples/all/customer/?owner_id=${ownerId}`)
    .then(res => res.json())
    .then(customers => {
        const select = document.getElementById("customer")

        customers.forEach((cus) =>{
            const option = document.createElement('option')
            option.value = `${cus.id}`
            option.innerText = `${cus.name}`
            select.appendChild(option)
        })
    })

    fetch(`https://smart-soft.onrender.com/products/all/product/?owner_id=${ownerId}`)
    .then(res => res.json())
    .then(products => {
        const select = document.getElementById("product")
        products.forEach((product) =>{
            // console.log(product)
            const option = document.createElement('option')
            option.value = `${product.id}`
            option.innerText = `${product.name}`

            select.appendChild(option)
        })
    })
}

const addSale = (event) => {
    event.preventDefault();
    const id = localStorage.getItem("ownerId");
    const token = localStorage.getItem("authToken");
  
    const form = document.getElementById("sale-form");
    const formData = new FormData(form);
  
    const cus = formData.get('customer');
    const product = formData.get('product');
    const quentity = formData.get('quentity');
    const receivable = formData.get('receivable');
    const paid = formData.get('paid');
  
    const saleData = {
      customer: cus,
      product: product,
      quentity: quentity,
      receivable: receivable,
      paid: paid,
    };
  
    fetch(`https://smart-soft.onrender.com/stocks/check/${product}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.available_stock >= quentity) {
          fetch(`https://smart-soft.onrender.com/purchases/sale/${id}/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
            body: JSON.stringify(saleData),
          })
            .then((res) => res.json())
            .then((data) => {
              // Set a flag in sessionStorage indicating a successful sale
              sessionStorage.setItem('saleAdded', 'true');
  
              // Optionally reset the form if needed
              form.reset();
  
              // Redirect to the sale page to show the success message
              window.location.href = "./sale.html";
            })
            .catch((err) => console.log(err));
        } else {
          alert("Not Available Stock!");
          // Redirect to the sale page even if there's no stock
          window.location.href = "./sale.html";
        }
      })
      .catch((err) => console.log(err));
  };
  window.addEventListener('load', () => {
    if (sessionStorage.getItem('saleAdded') === 'true') {
      // Toastr settings for top-right position
      toastr.options.positionClass = 'toast-top-right'; // Set the position to top right
      toastr.options.extendedTimeOut = 0;
      toastr.options.timeOut = 1000;
      toastr.options.fadeOut = 250;
      toastr.options.fadeIn = 250;
      toastr.options.iconClass = ''; // Removes the icon

      // Display the success message
      toastr.success('Sale completed successfully!');

      // Clear the flag after displaying the message
      sessionStorage.removeItem('saleAdded');
    }
  });
loadSaleReport()


