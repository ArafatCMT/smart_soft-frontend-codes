const loadSupplier = () => {
  const ownerId = localStorage.getItem("ownerId");
  // console.log(ownerId)

  const parent = document.getElementById("tbody");

  fetch(
    `https://smart-soft-gold.vercel.app/peoples/all/supplier/?owner_id=${ownerId}`
  )
    .then((res) => res.json())
    .then((suppliers) => {
      if (suppliers.length > 0) {
        document.getElementById("empty").style.display = "none";
      }
      let i = 0;
      suppliers.forEach((supplier) => {
        i++;
        // console.log(customer)
        const tr = document.createElement("tr");
        tr.innerHTML = `
                    <td>${i}</td>
                    <td>${supplier.name}</td>
                    <td>${supplier.email}</td>
                    <td>${supplier.phone}</td>
                    <td>${supplier.address}</td>
                    <td>${supplier.payable} TK</td>
                    <td>${supplier.paid} TK</td>
                    <td>${supplier.purchase_due} TK</td>                  
                    
                `;
        parent.appendChild(tr);
      });
    });
};

const loadDueReport = () => {
  const ownerId = localStorage.getItem("ownerId");
  const token = localStorage.getItem("token");
  // console.log(ownerId)

  const parent = document.getElementById("tbody");

  fetch(
    `https://smart-soft-gold.vercel.app/peoples/supplier/due/report/?owner_id=${ownerId}`
  )
    .then((res) => res.json())
    .then((reports) => {
      if (reports.length > 0) {
        document.getElementById("empty").style.display = "none";
      }
      let i = 0;
      reports.forEach((report) => {
        fetch(
          `https://smart-soft-gold.vercel.app/peoples/edit/supplier/${report.supplier}/`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        )
          .then((res) => res.json())
          .then((supplier) => {
            i++;
            const tr = document.createElement("tr");
            tr.innerHTML = `
                    <td>${i}</td>
                    <td>${supplier.name}</td>
                    <td>${supplier.email}</td>
                    <td>${supplier.phone}</td>
                    <td>${supplier.address}</td>
                    <td>${report.total_due} TK</td>                  
                    
                `;
            parent.appendChild(tr);
          });
        // console.log(report)
      });
    });
};

const addSupplier = (event) => {
  event.preventDefault();
  const form = document.getElementById("supplier-form");
  const formData = new FormData(form);
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const address = formData.get("address");
  console.log(name);
  const token = localStorage.getItem("authToken");
  const id = localStorage.getItem("ownerId");

  const supplierData = {
    name: name,
    email: email,
    phone: phone,
    address: address,
  };

  // console.log(JSON.stringify(supplierData))

  fetch(`https://smart-soft-gold.vercel.app/peoples/add/supplier/${id}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(supplierData),
  })
    .then((res) => res.json())
    .then((data) => {
      // Set a flag in sessionStorage indicating a successful supplier addition
      sessionStorage.setItem("supplierAdded", "true");

      // Optionally reset the form if needed
      form.reset();

      // Redirect to the supplier page to show the success message
      window.location.href = "./supplier.html?id=10";
    })
    .catch((err) => console.log(err));
};
window.addEventListener("load", () => {
  if (sessionStorage.getItem("supplierAdded") === "true") {
    // Toastr settings for top-right position
    toastr.options.positionClass = "toast-top-right"; // Set the position to top right
    toastr.options.extendedTimeOut = 0;
    toastr.options.timeOut = 1000;
    toastr.options.fadeOut = 250;
    toastr.options.fadeIn = 250;
    toastr.options.iconClass = ""; // Removes the icon

    // Display the success message
    toastr.success("Supplier added successfully!");

    // Clear the flag after displaying the message
    sessionStorage.removeItem("supplierAdded");
  }
});

// loadSupplier()
// loadDueReport()
