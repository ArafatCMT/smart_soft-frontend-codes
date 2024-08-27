const loadStock = () =>{
    const ownerId = localStorage.getItem("ownerId")
    // console.log(ownerId)

    const parent = document.getElementById("tbody")

    fetch(`https://smart-soft.onrender.com/stocks/show/?owner_id=${ownerId}`)
    .then(res => res.json())
    .then(stocks => {
        // console.log(stocks)
        let i=0;
        stocks.forEach((stock) =>{
            const tr = document.createElement('tr')
            fetch(`https://smart-soft.onrender.com/products/single/product/${stock.product}`)
            .then(res => res.json())
            .then(product => {
                

            fetch(`https://smart-soft.onrender.com/products/cat/${product.category}/`)
            .then(res => res.json())
            .then(cat =>{
                
                fetch(`https://smart-soft.onrender.com/products/unit/${product.unit}/`)
                .then(res => res.json())
                .then(unit => {
                    i++;
                    tr.innerHTML = ` 
                    <td>${i}</td>
                    <td>${product.name}</td>
                    <td>${cat.name}</td>
                    <td>${product.sale_price} Tk</td>
                    <td>${product.purchase_cost} TK</td>
                    <td>${stock.purchase} ${unit.name}</td>
                    
                    <td>${stock.sold} ${unit.name}</td>
                    <td>${stock.available_stock} ${unit.name}</td>
                    <td>${stock.sale_value} TK</td>
                    <td>${stock.purchase_value} TK</td>
                                `
                                parent.appendChild(tr)
                })
                
            })
        })
        })
        
    })
}
loadStock()