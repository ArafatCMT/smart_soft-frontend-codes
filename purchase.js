const loadPurchaseReport = () => {
  const ownerId = localStorage.getItem("ownerId");
  const token = localStorage.getItem("authToken");
  const parent = document.getElementById("tbody");

  fetch(
    `https://smart-soft-gold.vercel.app/purchases/report/?owner_id=${ownerId}`
  )
    .then((res) => res.json())
    .then((purchase) => {
      // console.log(purchase)
      if (purchase.length > 0) {
        document.getElementById("empty").style.display = "none";
      }

      let i = 0;
      purchase.forEach((pur) => {
        const tr = document.createElement("tr");
        // console.log(sl.customer, sl.product)
        fetch(
          `https://smart-soft-gold.vercel.app/peoples/edit/supplier/${pur.supplier}/`,
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
            // console.log(supplier)

            fetch(
              `https://smart-soft-gold.vercel.app/products/single/product/${pur.product}`
            )
              .then((res) => res.json())
              .then((product) => {
                fetch(
                  `https://smart-soft-gold.vercel.app/products/unit/${product.unit}/`
                )
                  .then((res) => res.json())
                  .then((unit) => {
                    i++;
                    tr.innerHTML = ` 
                    <td>${i}</td>
                    <td>${supplier.name}</td>
                    <td>${product.name}</td>
                    <td>${pur.quentity} ${unit.name}</td>
                    <td>${pur.purchase_date}</td>
                    
                    
                    <td>${pur.payable} TK</td>
                    <td>${pur.paid} TK</td>
                    <td>${pur.due} TK</td>
                    
                                `;
                    parent.appendChild(tr);
                  });
              });
          });
      });
    });
};

const Display = () => {
  const ownerId = localStorage.getItem("ownerId");
  const token = localStorage.getItem("authToken");

  fetch(
    `https://smart-soft-gold.vercel.app/peoples/all/supplier/?owner_id=${ownerId}`
  )
    .then((res) => res.json())
    .then((suppliers) => {
      const select = document.getElementById("supplier");

      suppliers.forEach((supplier) => {
        const option = document.createElement("option");
        option.value = `${supplier.id}`;
        option.innerText = `${supplier.name}`;

        select.appendChild(option);
      });
    });

  // product
  fetch(
    `https://smart-soft-gold.vercel.app/products/all/product/?owner_id=${ownerId}`
  )
    .then((res) => res.json())
    .then((products) => {
      const select = document.getElementById("product");
      products.forEach((product) => {
        // console.log(product)
        const option = document.createElement("option");
        option.value = `${product.id}`;
        option.innerText = `${product.name}`;

        select.appendChild(option);
      });
    });
};

const addPurchase = (event) => {
  event.preventDefault();
  const id = localStorage.getItem("ownerId");
  const token = localStorage.getItem("authToken");

  const form = document.getElementById("purchase-form");
  const formData = new FormData(form);

  const supplier = formData.get("supplier");
  const product = formData.get("product");
  const quentity = formData.get("quentity");
  const payable = formData.get("payable");
  const paid = formData.get("paid");

  const purchaseData = {
    supplier: supplier,
    product: product,
    quentity: quentity,
    payable: payable,
    paid: paid,
  };

  fetch(`https://smart-soft-gold.vercel.app/purchases/product/${id}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(purchaseData),
  })
    .then((res) => res.json())
    .then((data) => {
      window.location.href = `https://smart-soft-gold.vercel.app/purchases/pay/${
        data.id
      }/${3}`;
    })
    .catch((err) => console.log(err));
};
window.addEventListener("load", () => {
  const statusParam = new URLSearchParams(window.location.search).get("status");

  if (statusParam === "success") {
    console.log("Success");
    sessionStorage.setItem("purchaseAdded", "true");
  } else if (statusParam === "failed") {
    console.log("Failed");
    sessionStorage.setItem("purchaseAdded", "false");
  }

  
  if (sessionStorage.getItem("purchaseAdded") === "true") {
    toastr.options.positionClass = "toast-top-right";
    toastr.options.extendedTimeOut = 0;
    toastr.options.timeOut = 1000;
    toastr.options.fadeOut = 250;
    toastr.options.fadeIn = 250;
    toastr.options.iconClass = "";

    toastr.success("Purchase completed successfully!");

    sessionStorage.removeItem("purchaseAdded");
    console.log("Successfull");
  } else if (sessionStorage.getItem("purchaseAdded") === "false") {
    toastr.options.positionClass = "toast-top-right";
    toastr.options.extendedTimeOut = 0;
    toastr.options.timeOut = 1000;
    toastr.options.fadeOut = 250;
    toastr.options.fadeIn = 250;
    toastr.options.iconClass = "";
    // Display the failure message
    toastr.error("Purchase failed. Please try again!");

    // Remove the session storage item
    sessionStorage.removeItem("purchaseAdded");
    console.log("Failed----");
  }
});
loadPurchaseReport();
