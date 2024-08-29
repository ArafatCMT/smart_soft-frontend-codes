const loadUnit = () =>{
    const ownerId = localStorage.getItem("ownerId")
    // console.log(ownerId)

    const parent = document.getElementById("tbody")

    fetch(`https://smart-soft.onrender.com/products/all/unit/?owner_id=${ownerId}`)
    .then(res => res.json())
    .then(units => {
        if (units.length > 0){
            document.getElementById('empty').style.display = 'none';
        }
        let i = 0;
        units.forEach((unit) => {
            i++;
            // console.log(unit)
            const tr = document.createElement('tr')
                tr.innerHTML = `
                    <td>${i}</td>
                    <td>${unit.name}</td>
                    <td><button class="btn btn-success disabled">Manage</button></td>
                    
                    
                `
                parent.appendChild(tr)
        })
    })
}

const addUnit = (event) =>{
    event.preventDefault();
    const form = document.getElementById("unit-form");
    const formData = new FormData(form);
    const name = formData.get("unit")
    console.log(name)
    const token = localStorage.getItem("authToken");
    const id = localStorage.getItem("ownerId");

    const unitData = {
        name:name,
    }

    console.log(JSON.stringify(unitData))

    fetch(`https://smart-soft.onrender.com/products/add/unit/${id}`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(unitData),
    })
    .then((res) => res.json())
    .then((data) =>{
        alert("Unit Added successfully")
        (window.location.href = "./unit.html")
    })
    .catch((err) => console.log(err));
}

loadUnit()