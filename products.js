const loadProducts = () =>{
    const ownerId = localStorage.getItem("ownerId")
    // console.log(ownerId)

    const parent = document.getElementById("tbody")

    fetch(`https://smart-soft.onrender.com/products/all/product/?owner_id=${ownerId}`)
    .then(res => res.json())
    .then(products => {
        if (products.length > 0){
            document.getElementById('empty').style.display = 'none';
        }
        products.forEach((product) =>{
            const tr = document.createElement('tr')
            
            
            fetch(`https://smart-soft.onrender.com/products/cat/${product.category}/`)
            .then(res => res.json())
            .then(cat =>{

                fetch(`https://smart-soft.onrender.com/products/unit/${product.unit}/`)
                .then(res => res.json())
                .then(unit => {
                    
                    
                    if (product.brand != null)
                        {   
                            fetch(`https://smart-soft.onrender.com/products/brand/${product.brand}/`)
                            .then(res => res.json())
                            .then(brand =>{
                                tr.innerHTML = `
                                    
                                    
                                    <td>${product.name}</td>
                                    <td>${cat.name}</td>
                                    <td>${brand.name}</td>
                                    <td>${unit.name}</td>
                                    <td>${product.sale_price} TK</td>
                                    <td>${product.purchase_cost} TK</td>
                                    
                                    
                                `
                                parent.appendChild(tr)
                                            })
                        }
                    else{
                        tr.innerHTML = `
                                    
                                    <td>${product.name}</td>
                                    <td>${cat.name}</td>
                                    <td>-</td>
                                    <td>${unit.name}</td>
                                    <td>${product.sale_price} TK</td>
                                    <td>${product.purchase_cost} TK</td>
                                `
                                parent.appendChild(tr)  
                    }
                })
            })
        })
    })
}

const Display = () =>{
    const ownerId = localStorage.getItem("ownerId")
    const token = localStorage.getItem('token')

    // category 
    fetch(`https://smart-soft.onrender.com/products/all/category/?owner_id=${ownerId}`)
    .then(res => res.json())
    .then(cats => {
        const select = document.getElementById("category")
        cats.forEach((cat) =>{
            const option = document.createElement('option')
            option.value = `${cat.id}`
            option.innerText = `${cat.name}`
            select.appendChild(option)
        })
    })

    // unit
    fetch(`https://smart-soft.onrender.com/products/all/unit/?owner_id=${ownerId}`)
    .then(res => res.json())
    .then(units => {
        const select = document.getElementById("unit")

        units.forEach((unit) =>{
            const option = document.createElement('option')
            option.value = `${unit.id}`
            option.innerText = `${unit.name}`
            select.appendChild(option)
        })
    })

    // brand 
    fetch(`https://smart-soft.onrender.com/products/all/brand/?owner_id=${ownerId}`)
    .then(res => res.json())
    .then(brands => {
        const select = document.getElementById("brand")

        brands.forEach((brand) =>{
            const option = document.createElement('option')
            option.value = `${brand.id}`
            option.innerText = `${brand.name}`
            select.appendChild(option)
        })
    })
}

const addProduct = (event) =>{
    event.preventDefault();
    const id = localStorage.getItem("ownerId")
    const token = localStorage.getItem('token')

    const form = document.getElementById("product-form");
    const formData = new FormData(form);

    const name = formData.get('name')
    const category = formData.get('category')
    const brand = formData.get('brand')
    const unit = formData.get('unit')
    const price = formData.get('price')
    const cost = formData.get('cost')
    // console.log(category, name, brand, unit, price, cost)

    const ProductData = {
        name:name,
        category:category.valueOf(),
        brand:brand.valueOf(),
        unit:unit.valueOf(),
        sale_price:price,
        purchase_cost:cost,
    }

    // console.log(JSON.stringify(ProductData))
    fetch(`https://smart-soft.onrender.com/products/add/product/${id}/`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(ProductData),
    })
    .then((res) => res.json())
    .then((data) =>{
        alert("Product Added successfully")
         (window.location.href = "./product_list.html")
        })
    .catch((err) => console.log(err));
}

loadProducts()