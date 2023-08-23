
function expensiveTracker(e){
    e.preventDefault();
    const cost= e.target.price.value;
    const product = e.target.product.value;

    const productInfo ={
        cost,
        product
    }

    if (!isNaN(cost)) {
        total += parseInt(cost);
        scrtotal(total);
        cost.value = ''; // Clear the input field
    }

    axios
    .post('https://crudcrud.com/api/959f90117194439bbf909b72ba19f9f5/products',productInfo)
    .then((res)=>{
          console.log(res)
          showuserInfo(res.data)

     })
     .catch((err)=>{
         document.body.innerHTML= document.body.innerHTML+"<h4>  Something went wrong </h4>";
         console.log(err)
     });

}
let total=0;
window.addEventListener('DOMContentLoaded',()=>{
    axios
    .get('https://crudcrud.com/api/959f90117194439bbf909b72ba19f9f5/products')
    .then((res)=>{
       
        for(let i=0;i<res.data.length;i++){
            showuserInfo(res.data[i]);
            total=total+parseInt(res.data[i].cost);
        }
        console.log(total);
       scrtotal(total);
    } )
    .catch((err)=>console.log(err));
})


function showuserInfo(pro){
   
    const parentNode = document.getElementById('items')
    const childNode = `<li id="${pro._id}">${pro.cost}-${pro.product}
                        <button onclick=deletePro('${pro._id}','${pro.cost}')>Delete</button>
                        </li>`
    parentNode.innerHTML =parentNode.innerHTML+childNode;
    
  }

function deletePro(userId,cost){
    total = (total-cost);
    axios
    .delete(`https://crudcrud.com/api/959f90117194439bbf909b72ba19f9f5/products/${userId}`)
    .then((res)=>{
        removeScreen(userId)
        console.log(res)
        scrtotal(total);
        
    })
    .catch((err)=>console.log(err));
}
function removeScreen(id){
    const ptNode = document.getElementById('items');
    const childNode = document.getElementById(id);
    ptNode.removeChild(childNode);
}

function scrtotal(fin){
   document.getElementById('tvalue').innerHTML= `Total Price of product is : ${fin}`
   
}

