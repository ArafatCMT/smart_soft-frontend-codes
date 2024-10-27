const loadSalaryReport = () => {
  const ownerId = localStorage.getItem("ownerId");
  const token = localStorage.getItem("token");
  // console.log(ownerId)

  const parent = document.getElementById("tbody");

  fetch(
    `https://smart-soft-gold.vercel.app/peoples/salary/report/?owner_id=${ownerId}`
  )
    .then((res) => res.json())
    .then((reports) => {
      if (reports.length > 0) {
        document.getElementById("empty").style.display = "none";
      }
      let i = 0;
      reports.forEach((rep) => {
        fetch(
          `https://smart-soft-gold.vercel.app/peoples/edit/employee/${rep.employee}/`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        )
          .then((res) => res.json())
          .then((emp) => {
            i++;
            const tr = document.createElement("tr");
            tr.innerHTML = `
                    <td>${i}</td>
                    <td>${rep.date}</td>
                    <td>${emp.name}</td>
                    <td>${emp.email}</td>
                    <td>${emp.phone}</td>
                    <td>${emp.address}</td>
                    <td>${emp.salary} TK</td>                  
                    <td>${rep.paid_amount} TK</td>                  
                    <td>${
                      emp.salary - rep.paid_amount
                    } TK</td>                  
                                     
                    
                `;
            parent.appendChild(tr);
          });
      });
    });
};

const showEmployee = () => {
  const ownerId = localStorage.getItem("ownerId");
  const token = localStorage.getItem("token");

  fetch(
    `https://smart-soft-gold.vercel.app/peoples/all/employee/?owner_id=${ownerId}`
  )
    .then((res) => res.json())
    .then((empls) => {
      const select = document.getElementById("employee");

      empls.forEach((emp) => {
        const option = document.createElement("option");
        option.value = `${emp.id}`;
        option.innerText = `${emp.name}`;

        select.appendChild(option);
      });
    });
};

const addSalary = (event) => {
  event.preventDefault();
  const id = localStorage.getItem("ownerId");
  const token = localStorage.getItem("token");

  const form = document.getElementById("salary-form");
  const formData = new FormData(form);

  const employee = formData.get("employee");
  const amount = formData.get("amount");
  // console.log(employee.valueOf(), {"amount":amount})

  const salaryData = {
    employee: employee.valueOf(),
    paid_amount: amount,
  };

  // console.log(JSON.stringify(salaryData))
  fetch(`https://smart-soft-gold.vercel.app/peoples/salary/${id}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(salaryData),
  })
    .then((res) => res.json())
    .then((data) => {
      // Set a flag in sessionStorage indicating a successful salary payment
      sessionStorage.setItem("salaryPaid", "true");

      // Optionally reset the form if needed
      form.reset();

      // Redirect to the salary page to show the success message
      window.location.href = "./salary.html?id=12";
    })
    .catch((err) => console.log(err));
};
window.addEventListener("load", () => {
  if (sessionStorage.getItem("salaryPaid") === "true") {
    // Toastr settings for top-right position
    toastr.options.positionClass = "toast-top-right"; // Set the position to top right
    toastr.options.extendedTimeOut = 0;
    toastr.options.timeOut = 1000;
    toastr.options.fadeOut = 250;
    toastr.options.fadeIn = 250;
    toastr.options.iconClass = ""; // Removes the icon

    // Display the success message
    toastr.success("Salary paid successfully!");

    // Clear the flag after displaying the message
    sessionStorage.removeItem("salaryPaid");
  }
});

loadSalaryReport();
