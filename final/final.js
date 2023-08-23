function bookorder(e){
    e.preventDefault();
    const name = e.target.name.value;
    const mail = e.target.mail.value;
    const mo = e.target.mob.value;
    const userInfo = {
        name,
        mail,
        mo
    }
    axios
    .post('https://crudcrud.com/api/41eec786b1054bfbb151b336e27750cd/details',userInfo)
    .then((res)=>{
        console.log(res)
        
            showUser(res.data)
    })
    .catch((err)=>console.log(err))
}
window.addEventListener('DOMContentLoaded',()=>{
            axios
        .get('https://crudcrud.com/api/41eec786b1054bfbb151b336e27750cd/details')
        .then((res)=>{
            for(var i=0;i<res.data.length;i++){
                showUser(res.data[i]);
            }
        })
        .catch((err)=>{
            console.log(err);
        })
})
 

function showUser(users){
     document.getElementById('name').value="";
     document.getElementById('mail').value="";
     document.getElementById('mob').value="";
    
    const pn = document.getElementById('items')
    const cn =`<li id='${users._id}'>${users.name}---${users.mail}--${users.mo}
    <button onclick=deleteuser('${users._id}')>Delete</button>
    <button onclick=edituser('${users._id}','${users.name}','${users.mail}','${users.mo}')>Edit</button>
    </li>`

    pn.innerHTML=pn.innerHTML+cn;
}

function deleteuser(userId){
    axios
    .delete(`https://crudcrud.com/api/41eec786b1054bfbb151b336e27750cd/details/${userId}`)
    .then((res)=>{
        console.log(res)
        removeformscr(userId);
    })
    .catch((err)=>console.log(err));
}
function edituser(id,name,mail,mob){
    document.getElementById('name').value=name;
    document.getElementById('mail').value=mail;
    document.getElementById('mob').value=mob;

    deleteuser(id);
}
function removeformscr(userId){
    const ptnode=document.getElementById('items')
    const childnode =document.getElementById(userId)
    ptnode.removeChild(childnode);
}