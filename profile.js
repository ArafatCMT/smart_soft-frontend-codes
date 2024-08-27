const loadProfile = () =>{
    const ownerId = localStorage.getItem("ownerId")

    fetch(`https://smart-soft.onrender.com/owners/profile/${ownerId}/`)
    .then(res => res.json())
    .then(profile =>{
        console.log(profile)
        fetch(`https://smart-soft.onrender.com/owners/user/${ownerId}/`)
        .then(res => res.json())
        .then(user =>{console.log(user)

            document.getElementById("name").innerHTML = `${user.first_name+" "+user.last_name}`
            document.getElementById("email").innerHTML = `${user.email}`
            document.getElementById("address").innerHTML = `${profile.address}`
        })
    })
}