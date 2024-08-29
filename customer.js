const loadCustomer = () =>{
    const ownerId = localStorage.getItem("ownerId")
    // console.log(ownerId)

    const parent = document.getElementById("tbody")

    fetch(`https://smart-soft.onrender.com/peoples/all/customer/?owner_id=${ownerId}`)
    .then(res => res.json())
    .then(customers => {
        if (customers.length > 0){
            document.getElementById('empty').style.display = 'none';
        }
        let i = 0;
        customers.forEach((customer) => {
            i++;
            console.log(customer)
            const tr = document.createElement('tr')
                tr.innerHTML = `
                    <td>${i}</td>
                    <td>${customer.name}</td>
                    <td>${customer.email}</td>
                    <td>${customer.phone}</td>
                    <td>${customer.address}</td>
                    <td>${customer.receivable} TK</td>
                    <td>${customer.paid} TK</td>
                    <td>${customer.sale_due} TK</td>                  
                    
                `
                parent.appendChild(tr)
        })
    })
}

const loadDueReport = () =>{
    const ownerId = localStorage.getItem("ownerId")
    const token = localStorage.getItem('token')
    // console.log(ownerId)

    const parent = document.getElementById("tbody")

    fetch(`https://smart-soft.onrender.com/peoples/customer/due/report/?owner_id=${ownerId}`)
    .then(res => res.json())
    .then(reports => {
        if (reports.length > 0){
            document.getElementById('empty').style.display = 'none';
        }
        let i = 0;
        reports.forEach((report) => {
           
            fetch(`https://smart-soft.onrender.com/peoples/edit/customer/${report.customer}/`,{
                method: "GET",
                headers: {
                "content-type": "application/json",
                Authorization: `Token ${token}`,
                },
            })
            .then(res => res.json())
            .then(customer => {
                i++
                const tr = document.createElement('tr')
                tr.innerHTML = `
                    <td>${i}</td>
                    <td>${customer.name}</td>
                    <td>${customer.email}</td>
                    <td>${customer.phone}</td>
                    <td>${customer.address}</td>
                    <td>${report.total_due} TK</td>                  
                    
                `
                parent.appendChild(tr)
            })
            // console.log(report)
            
        })
    })
}

const addCustomer = (event) =>{
    event.preventDefault();
    const form = document.getElementById("cus-form");
    const formData = new FormData(form);
    const name = formData.get("name")
    const email = formData.get("email")
    const phone = formData.get("phone")
    const address = formData.get("address")
    console.log(name)
    const token = localStorage.getItem("authToken");
    const id = localStorage.getItem("ownerId");

    const customerData = {
        name:name,
        email:email,
        phone:phone,
        address:address,
    }

    // console.log(JSON.stringify(categoryData))

    fetch(`https://smart-soft.onrender.com/peoples/add/customer/${id}/`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(customerData),
    })
    .then((res) => res.json())
    .then((data) =>{ alert("Customer Added successfully") (window.location.href = "./customer.html")})
    .catch((err) => console.log(err));
}

// loadCustomer()
