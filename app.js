let selectedPrice = 0;

/* NAV */
function show(id){
document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
document.getElementById(id).classList.add('active');
}

/* LOADER */
function showLoader(){ loader.style.display="flex"; }
function hideLoader(){ loader.style.display="none"; }

/* REGISTER */
function register(){
showLoader();
auth.createUserWithEmailAndPassword(email.value,password.value)
.then(()=>{
hideLoader();
})
.catch(e=>{
hideLoader();
alert(e.message);
});
}

/* LOGIN */
function login(){
showLoader();
auth.signInWithEmailAndPassword(email.value,password.value)
.then(()=>{
hideLoader();
})
.catch(e=>{
hideLoader();
alert(e.message);
});
}

/* SELECT SERVICE */
function selectService(service,price){
serviceInput.value = service;
priceInput.value = price;
selectedPrice = price;
show('dashboard');
}

/* PAY */
function pay(){

if(!auth.currentUser){
alert("Login first");
return;
}

showLoader();

PaystackPop.setup({
key:"pk_test_f9c8ed728fac1059de000e81d0a57ce44e59d8d0",
email:auth.currentUser.email,
amount:selectedPrice*100,
currency:"NGN",

callback:function(res){

db.collection("orders").add({
userId:auth.currentUser.uid,
name:name.value,
phone:phone.value,
service:serviceInput.value,
price:selectedPrice,
desc:desc.value,
status:"Pending",
paymentStatus:"paid",
reference:res.reference,
createdAt:new Date()
});

hideLoader();
loadMyOrders();
loadAllOrders();

alert("Order successful");
}
}).openIframe();
}

/* MY ORDERS */
function loadMyOrders(){
if(!auth.currentUser) return;

db.collection("orders")
.where("userId","==",auth.currentUser.uid)
.onSnapshot(snap=>{
myOrders.innerHTML="";
snap.forEach(doc=>{
let o=doc.data();
myOrders.innerHTML += `
<div class="card">
${o.service}<br>
₦${o.price}<br>
Status: ${o.status}
</div>`;
});
});
}

/* ADMIN */
function loadAllOrders(){
db.collection("orders").onSnapshot(snap=>{
allOrders.innerHTML="";
snap.forEach(doc=>{
let o=doc.data();

allOrders.innerHTML += `
<div class="card">
${o.name}<br>
${o.service}<br>
₦${o.price}<br>

<button onclick="deleteOrder('${doc.id}')">Delete</button>

</div>`;
});
});
}

/* DELETE */
function deleteOrder(id){
db.collection("orders").doc(id).delete();
}

/* AUTH STATE */
auth.onAuthStateChanged(user=>{
if(user){
loadMyOrders();
show('dashboard');
}else{
show('home');
}
});
