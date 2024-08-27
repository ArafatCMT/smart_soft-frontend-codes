fetch("sidebar.html")
.then(res => res.text())
.then(data =>{
    document.getElementById("sidebar").innerHTML = data


    // const navLeftSideElement = document.getElementById("nav-left-container")
    // const navRightSideElement = document.getElementById("nav-right-container")

    const token = localStorage.getItem("authToken")

})