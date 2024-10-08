const loadPurchaseReport = () =>{
    const ownerId = localStorage.getItem("ownerId")
    const token = localStorage.getItem("authToken");
    const parent = document.getElementById("tbody")

    fetch(`https://smart-soft.onrender.com/purchases/report/?owner_id=${ownerId}`)
    .then(res => res.json())
    .then(purchase => {
        // console.log(purchase)
        if (purchase.length > 0){
            document.getElementById('empty').style.display = 'none';
        }

        let i = 0;
        purchase.forEach((pur) =>{
            const tr = document.createElement('tr')
            // console.log(sl.customer, sl.product)
            fetch(`https://smart-soft.onrender.com/peoples/edit/supplier/${pur.supplier}/`,{
            method: "GET",
            headers: {
            "content-type": "application/json",
            Authorization: `Token ${token}`,
            },
        })
        .then(res => res.json())
        .then(supplier => {
            // console.log(supplier)

            fetch(`https://smart-soft.onrender.com/products/single/product/${pur.product}`)
            .then(res => res.json())
            .then(product => {

                fetch(`https://smart-soft.onrender.com/products/unit/${product.unit}/`)
                .then(res => res.json())
                .then(unit => {
                    i++;
                    tr.innerHTML = ` 
                    <td>${i}</td>
                    <td>${supplier.name}</td>
                    <td>${product.name}</td>
                    <td>${pur.quentity} ${unit.name}</td>
                    <td>${pur.purchase_date}</td>
                    
                    
                    <td>${pur.payable} TK</td>
                    <td>${pur.paid} TK</td>
                    <td>${pur.due} TK</td>
                    
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

    fetch(`https://smart-soft.onrender.com/peoples/all/supplier/?owner_id=${ownerId}`)
    .then(res => res.json())
    .then(suppliers => {
        const select = document.getElementById("supplier")

        suppliers.forEach((supplier) =>{
            const option = document.createElement('option')
            option.value = `${supplier.id}`
            option.innerText = `${supplier.name}`

            select.appendChild(option)
        })
    })

    // product
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

const addPurchase = (event) => {
    event.preventDefault();
    const id = localStorage.getItem("ownerId");
    const token = localStorage.getItem("authToken");
  
    const form = document.getElementById("purchase-form");
    const formData = new FormData(form);
  
    const supplier = formData.get('supplier');
    const product = formData.get('product');
    const quentity = formData.get('quentity');
    const payable = formData.get('payable');
    const paid = formData.get('paid');
  
    const purchaseData = {
      supplier: supplier,
      product: product,
      quentity: quentity,
      payable: payable,
      paid: paid,
    };
  
    fetch(`https://smart-soft.onrender.com/purchases/product/${id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(purchaseData),
    })
      .then((res) => res.json())
      .then((data) => {
        // Set a flag in sessionStorage indicating a successful purchase
        sessionStorage.setItem('purchaseAdded', 'true');
  
        // Optionally reset the form if needed
        form.reset();
  
        // Redirect to the purchase page to show the success message
        window.location.href = "./purchase.html?id=3";
      })
      .catch((err) => console.log(err));
  };
  window.addEventListener('load', () => {
    if (sessionStorage.getItem('purchaseAdded') === 'true') {
      // Toastr settings for top-right position
      toastr.options.positionClass = 'toast-top-right'; // Set the position to top right
      toastr.options.extendedTimeOut = 0;
      toastr.options.timeOut = 1000;
      toastr.options.fadeOut = 250;
      toastr.options.fadeIn = 250;
      toastr.options.iconClass = ''; // Removes the icon

      // Display the success message
      toastr.success('Purchase completed successfully!');

      // Clear the flag after displaying the message
      sessionStorage.removeItem('purchaseAdded');
    }
  });
loadPurchaseReport()