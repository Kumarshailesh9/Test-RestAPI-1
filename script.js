function bookAppoiment(e){
    e.preventDefault();
    const name= e.target.name.value;
    const mail= e.target.mail.value;
    const mo= e.target.mob.value;

    const userInfo = {
        name,
        mail,
        mo
    }

    axios
    .post('https://crudcrud.com/api/46c24d444a4049a0a6044c2a00ac73d1/details',userInfo)
    .then((resolve)=>{
        console.log(resolve);
        showuserInfo(resolve.data);
    })
    .catch((err)=>{
        document.body.innerHTML=document.body.innerHTML+"<h4>Somthing went wrong</h4>";
    })
    
    
}
window.addEventListener('DOMContentLoaded',()=>{
    axios
    .get('https://crudcrud.com/api/46c24d444a4049a0a6044c2a00ac73d1/details')
    .then((response)=>{
        for(let i=0;i<response.data.length;i++){
            showuserInfo(response.data[i]);
        }
    })
    .catch((err)=>{
        console.log(err=>console.log("Don't Have Any Data Here"));
    })
})
    


function showuserInfo(user){
    document.getElementById('mail').value="";
     document.getElementById('name').value ="";
     document.getElementById('mob').value="";

    const ptnode = document.getElementById('items');
    const childNode = `<li id=${user._id}> ${user.name}-${user.mail}-${user.mo}
    <button onclick=DeleteUser('${user._id}')>DELETE</button>
    <button>EDIT</button>
    </li>`

    ptnode.innerHTML=ptnode.innerHTML+childNode;
}

function DeleteUser(userId){
    axios
    .delete(`https://crudcrud.com/api/46c24d444a4049a0a6044c2a00ac73d1/details/${userId}`)
    .then((response)=>{
        console.log(response)
        removeElementfromscr(userId);
    })
    .catch((err)=>console.log(err));
}

function removeElementfromscr(userId){
    const ptnode = document.getElementById('items');
    const childNode = document.getElementById(userId);
    if(childNode){
        ptnode.removeChild(childNode);
    }
}



