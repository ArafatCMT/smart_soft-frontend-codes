const summary = ()=>{
    const ownerId = localStorage.getItem("ownerId")

    // purchase
    fetch(`https://smart-soft-gold.vercel.app/purchases/today/${ownerId}/`)
    .then(res => res.json())
    .then(data =>{
        let purchase = 0;
        data.forEach((ele)=>{
            purchase += ele.payable
        })
        document.getElementById("purchase").innerText = `${purchase} TK`
    })

    // sold
    fetch(`https://smart-soft-gold.vercel.app/purchases/sale/today/${ownerId}/`)
    .then(res => res.json())
    .then(data =>{
        let sold = 0;
        let profit = 0;
        
        data.forEach((ele)=>{
            sold = sold + parseInt(ele.receivable)
            profit += parseInt(ele.profit)
        })
        document.getElementById("profit").innerText = `${profit} TK`
        document.getElementById("sold").innerText = `${sold} TK`
    })


    // customer
    fetch(`https://smart-soft-gold.vercel.app/peoples/all/customer/?owner_id=${ownerId}`)
    .then(res => res.json())
    .then(customers => {
        let total = 0;
        total += customers.length
       
        document.getElementById("customer").innerText = `${total}`
    })

    //supplier
    fetch(`https://smart-soft-gold.vercel.app/peoples/all/supplier/?owner_id=${ownerId}`)
    .then(res => res.json())
    .then(sup => {
        let total = 0;
        total += sup.length
        
        document.getElementById("supplier").innerText = `${total}`
    })

    // product 
    fetch(`https://smart-soft-gold.vercel.app/products/all/product/?owner_id=${ownerId}`)
    .then(res => res.json())
    .then(products => {
        let total = 0;
        total += products.length
        
        document.getElementById("product").innerText = `${total}`
    })

    // receivable
    fetch(`https://smart-soft-gold.vercel.app/peoples/customer/due/report/?owner_id=${ownerId}`)
    .then(res => res.json())
    .then(due => {
        let total = 0;
        due.forEach((ele)=>{
            total += ele.total_due
        })
        document.getElementById("receive").innerText = `${total} TK`
    })

    //payable
    fetch(`https://smart-soft-gold.vercel.app/peoples/supplier/due/report/?owner_id=${ownerId}`)
    .then(res => res.json())
    .then(due => {
        let total = 0;
        due.forEach((ele)=>{
            total += ele.total_due
        })
        document.getElementById("payable").innerText = `${total} TK`
    })

    // stock
    fetch(`https://smart-soft-gold.vercel.app/stocks/show/?owner_id=${ownerId}`)
    .then(res => res.json())
    .then(stock => {
        let sale = 0;
        let purchase = 0;
        stock.forEach((ele)=>{
            sale += ele.sale_value
            purchase += ele.purchase_value
        })
        document.getElementById("stock_1").innerText = `${purchase} TK`
        document.getElementById("stock_2").innerText = `${sale} TK`
    })
}
summary()
