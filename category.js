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

const addCategory = (event) => {
    event.preventDefault();
    const form = document.getElementById("category-form");
    const formData = new FormData(form);
    const name = formData.get("category");
    const token = localStorage.getItem("authToken");
    const id = localStorage.getItem("ownerId");
  
    const categoryData = {
      name: name,
    };
  
    fetch(`https://smart-soft.onrender.com/products/add/category/${id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(categoryData),
    })
      .then((res) => res.json())
      .then((data) => {
        // Set a flag in sessionStorage indicating a successful submission
        sessionStorage.setItem('categoryAdded', 'true');
  
        // Optionally hide the modal and reset form
        $('#exampleModal').modal('hide');
        form.reset();
  
        // Reload the page to trigger showing the success message
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  
  // Check for the flag on page load
  window.addEventListener('load', () => {
    if (sessionStorage.getItem('categoryAdded') === 'true') {
      // Toastr settings for top-right position and no icon
      toastr.options.positionClass = 'toast-top-right';
      toastr.options.extendedTimeOut = 0;
      toastr.options.timeOut = 1000;
      toastr.options.fadeOut = 250;
      toastr.options.fadeIn = 250;
      toastr.options.iconClass = '';  // Removes the icon
  
      // Display the success message without an icon
      toastr.success('Category added successfully!');
  
      // Clear the flag after displaying the message
      sessionStorage.removeItem('categoryAdded');
    }
  });
loadCategory()