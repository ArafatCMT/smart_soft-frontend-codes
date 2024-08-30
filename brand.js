const loadbrand = () => {
  const ownerId = localStorage.getItem("ownerId");
  // console.log(ownerId)

  const parent = document.getElementById("tbody");

  fetch(
    `https://smart-soft.onrender.com/products/all/brand/?owner_id=${ownerId}`
  )
    .then((res) => res.json())
    .then((brands) => {
      if (brands.length > 0) {
        document.getElementById("empty").style.display = "none";
      }
      let i = 0;
      brands.forEach((brand) => {
        // i++;
        // console.log(unit)
        fetch(
          `https://smart-soft.onrender.com/products/brands/${brand.id}/?owner_id=${ownerId}`
        )
          .then((res) => res.json())
          .then((data) => {
            i++;
            const tr = document.createElement("tr");
            tr.innerHTML = `
                    <td>${i}</td>
                    <td>${brand.name}</td>
                    <td>${data.length}</td>
                    <td><button class="btn btn-success disabled">Manage</button></td>
                    
                `;
            parent.appendChild(tr);
          });
      });
    });
};

const addBrand = (event) => {
  event.preventDefault();
  const form = document.getElementById("brand-form");
  const formData = new FormData(form);
  const name = formData.get("brand");
  const token = localStorage.getItem("authToken");
  const id = localStorage.getItem("ownerId");

  const brandData = {
    name: name,
  };

  fetch(`https://smart-soft.onrender.com/products/add/brand/${id}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(brandData),
  })
    .then((res) => res.json())
    .then((data) => {
      // Set a flag in sessionStorage indicating a successful submission
      sessionStorage.setItem("brandAdded", "true");

      // Optionally reset the form if needed
      form.reset();

      // Redirect to the brand page to show the success message
      window.location.href = "./brand.html";
    })
    .catch((err) => console.log(err));
};
window.addEventListener("load", () => {
  if (sessionStorage.getItem("brandAdded") === "true") {
    // Toastr settings for top-right position
    toastr.options.positionClass = "toast-top-right"; // Set the position to top right
    toastr.options.extendedTimeOut = 0;
    toastr.options.timeOut = 1000;
    toastr.options.fadeOut = 250;
    toastr.options.fadeIn = 250;
    toastr.options.iconClass = ""; // Removes the icon

    // Display the success message
    toastr.success("Brand added successfully!");

    // Clear the flag after displaying the message
    sessionStorage.removeItem("brandAdded");
  }
});
loadbrand();
