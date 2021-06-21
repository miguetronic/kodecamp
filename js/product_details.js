
let database = firebase.database();

let params = new URLSearchParams(window.location.search);

let productId = params.get("id");

async function retrieveProduct(id){
    let product = {}

    await database.ref().child("products").child(id).get().then((result)=>{
        if (result.exists()){
            product = result.val();
        } else{
            console.log(`Product ${id} not found`)
        }
    });
    return product;
}

// To print this information on the page:
async function showProductDetails(){
    let productTitle = document.getElementById("product-title");
    let productImage = document.getElementById("product-image");
    let productDescription = document.getElementById("product-description");

    let productData = await retrieveProduct(productId);

    productTitle.innerText = productData.name;
    productImage.src = productData.imgUrl;
    /* productImage.setAttribute("src", productData.imgUrl); */
    productDescription.innerText = productData.description;
}

let deleteBtn = document.getElementById("btn-delete");
deleteBtn.addEventListener("click", ()=>{
    database.ref().child("products").child(productId).remove();
    window.location.href = "/";
});

showProductDetails();