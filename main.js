
const results = document.getElementById("results");
const form = document.getElementById("form");
const search = document.getElementById("search");
const load = document.getElementById("load");
const add = document.getElementById('add');

// --------------------------------------------- get list request



const loadList = async () => {
try {
const { data } = await axios.get(`http://localhost:3001/products`);
makeDiv(data);
}
catch (error) {
console.log(error);
results.innerHTML = error;
}
};

const makeDiv = (product) => {

var dataArray = [];
product.forEach(e => {dataArray.push( '<tr><td class="id">' + e.id +'</td><td class="id">'+ e.name +'</td><td>'+ e.quantity + '</td></tr>');});
const productData = dataArray.join('');


const htmlText = 
                `
                <div class="border">
                <table>
                <h3><strong><u>Shopping List:</u></strong></h3>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Quantity</th>
                </tr>
                ${productData}
                </table>
                <br>
                </div>
                `
                  
results.innerHTML = htmlText;

const backToId = document.getElementsByClassName('id')
for (let i of Array.from(backToId))
{
i.addEventListener("click", () => {loadProduct(i.innerHTML);});
}


}


load.addEventListener("click", () => {loadList();});


//---------------------------------------- get product request


const loadProduct = async (productId) => {
try {
const { data } = await axios.get(`http://localhost:3001/products/${productId}`);
makeProduct(data.id, data.name, data.quantity);
}
catch (error) {
console.log(error);
results.innerHTML = '<div> This Product does not exist!</div>';
}
};

function promptFunc() {
var productInput = prompt('Please enter the ID or name of the product');

if (productInput != null){
var inputLower = productInput.toLowerCase();
loadProduct(inputLower);
}
}


search.addEventListener("click", () => {promptFunc();});


const makeProduct = (id, name, quantity) => {

    if(id)
    {
        const htmlText = 
                `
                <div class="border">
                <h3><u><strong>Product information:</strong></u></h3> 
                <li><strong>Id:</strong> ${id}</li>
                <li><strong>Product:</strong> ${name}</li>
                <li><strong>Quantity:</strong> ${quantity}</li>    
                <button id="updateButton">Update</button>  <button id="deleteButton">Delete</button> 
                <br><br>
                </div>

                `


results.innerHTML = htmlText;

var updateButton = document.getElementById('updateButton');
var deleteButton = document.getElementById('deleteButton');


updateButton.addEventListener("click", () => {updateData(id, name, quantity);});
deleteButton.addEventListener("click", () => {deleteProduct(id);});


    }
    else
    {
        results.innerHTML = '<div> This Product does not exist!</div>';
    }
}

//---------------------------------------- post request

const addProduct = async (id, name, quantity) => {
try{
await axios.post(`http://localhost:3001/products/`, {
    id: id,
    name: name,
    quantity: quantity,
  })
  .then(function (response) {
    if (response.data =='The inserted ID already is in use' || response.data =='The inserted name is already in use'){
    console.log(response.data);
   results.innerHTML = `<div>${response.data}<div>`;
    } 
    else
    {
    newProduct(id, name, quantity)
    }
  })}
    catch(error) {
    console.log(error);
    }
}


add.onclick = function checkData(){
var idUpper = document.getElementById('textInputId').value;
var nameUpper = document.getElementById('textInputName').value;
var name = nameUpper.toLowerCase();
var id = idUpper.toLowerCase();
var quantity = document.getElementById('textInputQuantity').value;

if(id != '' && /^[a-z0-9]+|[\b]+$/.test(name) && /^[0-9]+$/.test(quantity))
{
addProduct(id, name, quantity);
}
else
{
  results.innerHTML = '<div>Either one of the properties you inserted is empty or invalid.</div>'
}
}



const newProduct = (id, name, quantity) => {

        const htmlText = 
                `
                 <div class="border">
                 <ul><u><h3><strong>Product added:</strong></u></h3> 
                 <li><strong>Id:</strong> ${id}</li>
                 <li><strong>Product:</strong> ${name}</li>
                 <li><strong>Quantity:</strong> ${quantity}</li>
                 </ul>
                 <button id="updateButton">Update</button>  <button id="deleteButton">Delete</button> 
                 <br><br>
                 </div>

                `
results.innerHTML = htmlText;

var updateButton = document.getElementById('updateButton');
var deleteButton = document.getElementById('deleteButton');

updateButton.addEventListener("click", () => {updateData(id, name, quantity);});
deleteButton.addEventListener("click", () => {deleteProduct(id);});

}





// --------------------------------------------------------- put request





const updateProduct = async (id, name, quantity) => {
await axios.put(`http://localhost:3001/products/${id}`, {
    id: id,
    name: name,
    quantity: quantity
  })
  .then(function (response) {
    updateDiv(id, name, quantity)
    console.log(response);
  })
    .catch(function (error) {
    console.log(error);
    })
}

function updateDiv(id, name, quantity){


        const htmlText = 
                `
                 <div class="border"><ul> <u><h3><strong>Product updated:</strong></h3></u>
                 <li><strong>Id:</strong> ${id}</li>
                 <li><strong>Product:</strong> ${name}</li>
                 <li><strong>Quantity:</strong> ${quantity}</li>
                 </ul>
                 <button id="updateButton">Update</button>  <button id="deleteButton">Delete</button><br><br>
                 </div>
                `
                  
results.innerHTML = htmlText;

var updateButton = document.getElementById('updateButton');
var deleteButton = document.getElementById('deleteButton');

updateButton.addEventListener("click", () => {updateData(id, name, quantity);});
deleteButton.addEventListener("click", () => {deleteProduct(id);});

}

function updateData(id, name, quantity ){
var productName = prompt('Please enter new name', name);

if (productName != null){
var productQuantity = prompt('Please enter new quantity', quantity);
}

if (productQuantity == null){
console.log('canceled')
}
else if (/^[A-Za-z0-9]+|[\b]+$/.test(productName) && /^[0-9]+$/.test(productQuantity)){
var nameLower = productName.toLowerCase();
updateProduct(id, nameLower, productQuantity);
}
else
{
results.innerHTML = '<div>Either one of the properties you inserted is empty or invalid</div>'
}
}


// -------------------------------------------- delete request
const deleteProduct = async (id) => {
const { data } = await axios.delete(`http://localhost:3001/products/${id}`);
console.log('product deleted');
results.innerHTML = "Product is successfully deleted!"
}


