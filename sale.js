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

const addSale = (event) =>{
    event.preventDefault()
    const id = localStorage.getItem("ownerId")
    const token = localStorage.getItem("authToken");

    const form = document.getElementById("sale-form");
    const formData = new FormData(form);

    const cus = formData.get('customer')
    const product = formData.get('product')
    const quentity = formData.get('quentity')
    const receivable = formData.get('receivable')
    const paid = formData.get('paid')
    
    // console.log(supplier, product, quentity, payable, paid)

    const saleData = {
        customer:cus.valueOf(),
        product:product.valueOf(),
        quentity:quentity,
        receivable:receivable,
        paid:paid,
    }

    // console.log(JSON.stringify(saleData))
    fetch(`https://smart-soft.onrender.com/stocks/check/${product.valueOf()}/`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
    })
    .then((res) => res.json())
    .then((data) => {

        if (data.available_stock >= quentity){
            fetch(`https://smart-soft.onrender.com/purchases/sale/${id}/`,{
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Token ${token}`,
                },
                body: JSON.stringify(saleData),
            })
            .then((res) => res.json())
            .then((data) => {

                alert("sale successfully")

                (window.location.href = "./sale.html")
            })
            .catch((err) => console.log(err));
        }
        else{
            alert("Not Available Stock!")
            (window.location.href = "./sale.html")
        }
    })



    
}
loadSaleReport()


// from django.utils import timezone

// def get_todays_orders(request):
//     today = timezone.now().date()
//     todays_orders = Order.objects.filter(order_date__date=today)

// def get_todays_orders(request):
//     today = timezone.now().date()
//     todays_orders = Order.objects.filter(order_date=today)

// def get_todays_orders(request):
//     today = timezone.now().date()
//     todays_orders = Order.objects.filter(order_date=today)

//     def get_todays_orders(request):
//     today = timezone.now().date()
//     todays_orders = Order.objects.filter(order_date=today)