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

const addUnit = (event) => {
    event.preventDefault();
    const form = document.getElementById("unit-form");
    const formData = new FormData(form);
    const name = formData.get("unit");
    console.log(name);
    const token = localStorage.getItem("authToken");
    const id = localStorage.getItem("ownerId");
  
    const unitData = {
      name: name,
    };
  
    console.log(JSON.stringify(unitData));
  
    fetch(`https://smart-soft.onrender.com/products/add/unit/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(unitData),
    })
      .then((res) => res.json())
      .then((data) => {
        // Set a flag in sessionStorage indicating a successful unit addition
        sessionStorage.setItem('unitAdded', 'true');
  
        // Optionally reset the form if needed
        form.reset();
  
        // Redirect to the unit page to show the success message
        window.location.href = "./unit.html";
      })
      .catch((err) => console.log(err));
  };
  window.addEventListener('load', () => {
    if (sessionStorage.getItem('unitAdded') === 'true') {
      // Toastr settings for top-right position
      toastr.options.positionClass = 'toast-top-right'; // Set the position to top right
      toastr.options.extendedTimeOut = 0;
      toastr.options.timeOut = 1000;
      toastr.options.fadeOut = 250;
      toastr.options.fadeIn = 250;
      toastr.options.iconClass = ''; // Removes the icon

      // Display the success message
      toastr.success('Unit added successfully!');

      // Clear the flag after displaying the message
      sessionStorage.removeItem('unitAdded');
    }
  });

loadUnit()