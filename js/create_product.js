let database = firebase.database();

// Función para añadir productos a FireBase
async function addProduct(name, description, imgUrl){
    return await database.ref().child("products").push(
        {
            name: name,
            description: description,
            imgUrl: imgUrl,
        });
}

//Funcion para obtener los datos registrados en mi página html create_product.html
function getProductData(){
    let productName = document.getElementById("product-name-input").value;
    let productDescription = document.getElementById("product-description-textarea").value;
    let imgUrl = document.getElementById("image-url-input").value;
    
    let result = {
        name: productName,
        description: productDescription,
        imgUrl: imgUrl,
    };
    return result;
}

// cuando presione el botón "guardar", enviar los datos a firebase, es decir, hacer uso de las funciones creadas anteriormente
let saveButton = document.getElementById("btn-save");

saveButton.addEventListener("click", async ()=>{
    let product_data = getProductData();
    let response= await addProduct(
        product_data.name, 
        product_data.description, 
        product_data.imgUrl
        );
    alert("Has registrado el producto correctamente :3 ");
});