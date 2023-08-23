function bookAppoiment(event){
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.mail.value;
    const mo = event.target.mob.value;
   // const dt = event.target.date.value;
   // const t = event.target.time.value;

    let userInfo = {
        name,
        email,
        mo,
       // dt,
       // t
    };
    axios.post("https://crudcrud.com/api/bde3a269e83b4f01822fa188d347789b/details",userInfo)
    .then((res)=>{
       showuserInfo(res.data)
         console.log(res)
    })
    .catch((err)=>{
        document.body.innerHTML= document.body.innerHTML+"<h4>  Something went wrong </h4>";
        console.log(err)
    });
}

window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/bde3a269e83b4f01822fa188d347789b/details")
        .then((response) => {
            console.log(response)
            for(var i=0;i<response.data.length;i++){
                showuserInfo(response.data[i])
            }
        })
        .catch((err)=>{
            console.log(err)
        }) 

 })


  function showuserInfo(user){
    document.getElementById('name').value="";
    document.getElementById('mail').value="";
    document.getElementById('mob').value="";
    const parentNode = document.getElementById('items')
    const childNode = `<li id=${user._id}>${user.name}-${user.email}-${user.mo}
                        <button onclick=deleteUser('${user._id}')>DELETE</button>
                        <button onclick=editUser('${user.email}','${user.name}','${user.mo}','${user._id}')>EDIT</button>
                        </li>`
    parentNode.innerHTML =parentNode.innerHTML+childNode;
  }

   function deleteUser(userId){
    axios.delete(`https://crudcrud.com/api/bde3a269e83b4f01822fa188d347789b/details/${userId}`)
    .then((response) => {
        console.log(response)
        removeFromScreen(userId)
    })
    .catch((err) => console.log(err))

    }

function removeFromScreen(userId){
        const parentNode = document.getElementById('items');
        const childNodeToBeDeleted = document.getElementById(userId);
        if(childNodeToBeDeleted){
            parentNode.removeChild(childNodeToBeDeleted)
        }
}

function editUser(emailId,name,mob,userId){
    document.getElementById('name').value=name;
    document.getElementById('mail').value=emailId;
    document.getElementById('mob').value=mob;

    deleteUser(userId)
}