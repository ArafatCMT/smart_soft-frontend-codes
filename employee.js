const loadEmployee = () =>{
    const ownerId = localStorage.getItem("ownerId")
    // console.log(ownerId)

    const parent = document.getElementById("tbody")

    fetch(`https://smart-soft.onrender.com/peoples/all/employee/?owner_id=${ownerId}`)
    .then(res => res.json())
    .then(empls => {
        if (empls.length > 0){
            document.getElementById('empty').style.display = 'none';
        }
        let i = 0;
        empls.forEach((emp) => {
            i++;
            const tr = document.createElement('tr')
                tr.innerHTML = `
                    <td>${i}</td>
                    <td>${emp.joining_date}</td>
                    <td>${emp.name}</td>
                    <td>${emp.email}</td>
                    <td>${emp.phone}</td>
                    <td>${emp.address}</td>
                    <td>${emp.salary} TK</td>
                    <td>${emp.total_receivable} TK</td>
                    <td>${emp.total_paid} TK</td>
                    <td>${emp.total_due} TK</td>                  
                    
                `
                parent.appendChild(tr)
        })
    })
}
const addEmployee = (event) =>{
    event.preventDefault();
    const form = document.getElementById("emp-form");
    const formData = new FormData(form);
    const name = formData.get("name")
    const email = formData.get("email")
    const phone = formData.get("phone")
    const address = formData.get("address")
    const salary = formData.get("salary")
    console.log(name)
    const token = localStorage.getItem("authToken");
    const id = localStorage.getItem("ownerId");

    const empData = {
        name:name,
        email:email,
        phone:phone,
        address:address,
        salary:salary,
    }

    // console.log(JSON.stringify(categoryData))

    fetch(`https://smart-soft.onrender.com/peoples/add/employee/${id}/`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(empData),
    })
    .then((res) => res.json())
    .then((data) =>{
        alert("Employee Added Successfully!")
        (window.location.href = "./employee.html")
    } )
    .catch((err) => console.log(err));
}
loadEmployee()