fetch("navbar.html")
.then(res => res.text())
.then(data =>{
    document.getElementById("navbar").innerHTML = data


    const navLeftSideElement = document.getElementById("nav-left-container")
    const navRightSideElement = document.getElementById("nav-right-container")

    const token = localStorage.getItem("authToken")
    // console.log(token)

    // if (token){
    //     navLeftSideElement.innerHTML += `
    //                         <li class="nav-item">
    //                         <a class="nav-link active mx-lg-2" aria-current="page" href="./dashboard.html">Dashboard</a>
    //                             </li>
    //                         <li class="nav-item">
    //                             <a class="nav-link mx-lg-2" href="#">About</a>
    //                         </li>
    //                         <li class="nav-item">
    //                             <a class="nav-link mx-lg-2" href="#">Services</a>
    //                         </li>
    //                         <li class="nav-item">
    //                             <a class="nav-link mx-lg-2" href="#">Portfolio</a>
    //                         </li>
    //                         <li class="nav-item">
    //                             <a class="nav-link mx-lg-2" href="#">Contact</a>
    //                         </li>

    //                         `;

    //     navRightSideElement.innerHTML +=`
                            
    //                         <li class="nav-but">
    //                             <a class="btn btn-danger" onclick="handleLogout()">Logout</a>
    //                         </li>
                            

    //                         `;
    // }
    
        navLeftSideElement.innerHTML += `
                            <li class="nav-item">
                                <a class="nav-link active mx-lg-2" aria-current="page" href="./index.html">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link mx-lg-2" href="#">Features</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link mx-lg-2" href="#">Services</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link mx-lg-2" href="#">Portfolio</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link mx-lg-2" href="#">Contact</a>
                            </li>

                            `;
        navRightSideElement.innerHTML +=`
                            
                             <li class="nav-but mb-2">
                                <a href="./login.html" class="login-button">Login</a>
                            </li>
                            `;
    
})