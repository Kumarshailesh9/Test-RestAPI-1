function bookorder(e){
    e.preventDefault();
    const name = e.target.name.value;
    const mail = e.target.mail.value;
    const mob = e.target.mob.value;

    const userinfo = {
        name,
        mail,
        mob
    }
    //Axios for network call
    axios
    .post('https://crudcrud.com/api/bde3a269e83b4f01822fa188d347789b/details',userinfo)
    .then((res)=>{
        console.log(res);
        showonScr(res.data)
    })
    .catch((err)=>{
        console.log(err);
    })
}
window.addEventListener('DOMContentLoaded',()=>{
axios
.get('https://crudcrud.com/api/bde3a269e83b4f01822fa188d347789b/details')
.then((res)=>{
    for(let i=0;i<res.data.length;i++){
        showonScr(res.data[i]);
    }
})
.catch((err)=>{
    console.log(err);
})
})
function showonScr(userinfo){
    document.getElementById('mail').value="";
    document.getElementById('name').value ="";
    document.getElementById('mob').value="";
    
    const ptnode = document.getElementById('items');
    const childNode = `<li id=${userinfo._id}>${userinfo.name}-${userinfo.mail}-${userinfo.mob}
    <button onclick=deleteUser('${userinfo._id}')>Delete</button>
    <button onclick=edituserInfo('${userinfo.name}','${userinfo.mail}','${userinfo.mob}','${userinfo._id
    }')>Edit</button>
    </li>`
    ptnode.innerHTML=ptnode.innerHTML+childNode;
}

function deleteUser(userId){
    axios
    .delete(`https://crudcrud.com/api/bde3a269e83b4f01822fa188d347789b/details/${userId}`)
    .then((res)=>{
        console.log(res);
        removeFromScr(userId);
    })
    .catch((err)=>{
        console.log(err);
    })
}

function removeFromScr(userId){
    const ptnode = document.getElementById('items')
    const childNode = document.getElementById(userId)
    if(childNode){
    ptnode.removeChild(childNode);
    }
}

function edituserInfo(name,mail,mob,id){
    document.getElementById('name').value=name;
    document.getElementById('mail').value=mail;
    document.getElementById('mob').value=mob;

    deleteUser(id)

}