const loadbrand = () =>{
    const ownerId = localStorage.getItem("ownerId")
    // console.log(ownerId)

    const parent = document.getElementById("tbody")

    fetch(`https://smart-soft.onrender.com/products/all/brand/?owner_id=${ownerId}`)
    .then(res => res.json())
    .then(brands => {
        if (brands.length > 0){
            document.getElementById('empty').style.display = 'none';
        }
        let i = 0;
        brands.forEach((brand) => {
            // i++;
            // console.log(unit)
            fetch(`https://smart-soft.onrender.com/products/brands/${brand.id}/?owner_id=${ownerId}`)
            .then(res => res.json())
            .then(data =>{
                i++
                const tr = document.createElement('tr')
                tr.innerHTML = `
                    <td>${i}</td>
                    <td>${brand.name}</td>
                    <td>${data.length}</td>
                    <td><button class="btn btn-success disabled">Manage</button></td>
                    
                `
                parent.appendChild(tr)
            })
        })
    })
}

const addBrand = (event) =>{
    event.preventDefault();
    const form = document.getElementById("brand-form");
    const formData = new FormData(form);
    const name = formData.get("brand")
    console.log(name)
    const token = localStorage.getItem("authToken");
    const id = localStorage.getItem("ownerId");

    const brandData = {
        name:name,
    }

    // console.log(JSON.stringify(categoryData))

    fetch(`https://smart-soft.onrender.com/products/add/brand/${id}/`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(brandData),
    })
    .then((res) => res.json())
    .then((data) =>{alert("Brand Added successfully") (window.location.href = "./brand.html")})
    .catch((err) => console.log(err));
}
loadbrand()