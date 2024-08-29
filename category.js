const loadCategory = () =>{
    const ownerId = localStorage.getItem("ownerId")
    // console.log(ownerId)

    const parent = document.getElementById("tbody")

    fetch(`https://smart-soft.onrender.com/products/all/category/?owner_id=${ownerId}`)
    .then(res => res.json())
    .then(categoris => {

        if (categoris.length > 0){
            document.getElementById('empty').style.display = 'none';
        }
        let i = 0;
        categoris.forEach((cat) => {
            
            // console.log(i)

            fetch(`https://smart-soft.onrender.com/products/category/${cat.id}`)
            .then(res => res.json())
            .then(data => {
                i++;
                // console.log(i)
                // console.log(data.length)

                const tr = document.createElement('tr')
                tr.innerHTML = `
                    <td>${i}</td>
                    <td>${cat.name}</td>
                    <td>${data.length}</td>
                    <td><button class="btn btn-success disabled">Manage</button></td>
                    
                `
                parent.appendChild(tr)
            })

            
        })
    })
}

const addCategory = (event) =>{
    event.preventDefault();
    const form = document.getElementById("category-form");
    const formData = new FormData(form);
    const name = formData.get("category")
    console.log(name)
    const token = localStorage.getItem("authToken");
    const id = localStorage.getItem("ownerId");

    const categoryData = {
        name:name,
    }

    console.log(JSON.stringify(categoryData))

    fetch(`https://smart-soft.onrender.com/products/add/category/${id}/`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(categoryData),
    })
    .then((res) => res.json())
    .then((data) =>{alert("Category Added successfully") (window.location.href = "./category.html")})
    .catch((err) => console.log(err));
}

loadCategory()