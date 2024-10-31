const loadCustomer = () =>{
    const ownerId = localStorage.getItem("ownerId")
    // console.log(ownerId)

    const parent = document.getElementById("tbody")

    fetch(`https://smart-soft-gold.vercel.app/peoples/all/customer/?owner_id=${ownerId}`)
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

    fetch(`https://smart-soft-gold.vercel.app/peoples/customer/due/report/?owner_id=${ownerId}`)
    .then(res => res.json())
    .then(reports => {
        if (reports.length > 0){
            document.getElementById('empty').style.display = 'none';
        }
        let i = 0;
        reports.forEach((report) => {
           
            fetch(`https://smart-soft-gold.vercel.app/peoples/edit/customer/${report.customer}/`,{
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


const addCustomer = (event) => {
    event.preventDefault();
    const form = document.getElementById("cus-form");
    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const address = formData.get("address");
    const token = localStorage.getItem("authToken");
    const id = localStorage.getItem("ownerId");
  
    const customerData = {
      name: name,
      email: email,
      phone: phone,
      address: address,
    };
  
    fetch(`https://smart-soft-gold.vercel.app/peoples/add/customer/${id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(customerData),
    })
      .then((res) => res.json())
      .then((data) => {
        // Set a flag in sessionStorage indicating a successful submission
        sessionStorage.setItem('customerAdded', 'true');
  
        // Optionally reset the form if needed
        form.reset();
  
        // Reload the page to show the success message
        window.location.href = "./customer.html?id=9"; // Redirect to customer page
      })
      .catch((err) => console.log(err));
  };
  
  // Check for the flag on page load
  window.addEventListener('load', () => {
    if (sessionStorage.getItem('customerAdded') === 'true') {
      // Toastr settings for top-right position
      toastr.options.positionClass = 'toast-top-right'; // Set the position to top right
      toastr.options.extendedTimeOut = 0;
      toastr.options.timeOut = 1000;
      toastr.options.fadeOut = 250;
      toastr.options.fadeIn = 250;
      toastr.options.iconClass = ''; // Removes the icon
  
      // Display the success message
      toastr.success('Customer added successfully!');
  
      // Clear the flag after displaying the message
      sessionStorage.removeItem('customerAdded');
    }
  });
// loadCustomer()


