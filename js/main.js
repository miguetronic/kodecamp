function addNewCard(title, description, imgUrl, databaseId) {

    let mainContainer = document.getElementById("main-container");
    let card = document.createElement("div");
    let image = document.createElement("img");
    let cardBody = document.createElement("div");

    let cardLink = document.createElement("a");
    let cardTitle = document.createElement("h3");
    let cardText = document.createElement("p");
    let cardButton = document.createElement("a");

    card.classList.add("card", "product-card", "m-auto", "mx-6");
    image.classList.add("card-img-top");
    image.src = imgUrl;
   
    cardTitle.classList.add("card-title");
    cardTitle.appendChild(cardLink);
    
    cardLink.href = `./product_details.html?id=${databaseId}`;
    cardLink.innerText = title;
    
    cardButton.classList.add("btn", "btn-primary");
    cardButton.href = `./product_details.html?id=${databaseId}`;
    cardButton.innerText= "Ver más";
    
    cardText.classList.add("card-text");
    cardText.innerText = description;

    cardBody.classList.add("card-body", "text-center");

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardButton);
    card.appendChild(image);
    card.appendChild(cardBody);
    mainContainer.appendChild(card);
}

let database1= firebase.database();

async function retrieveAllProducts(){
    let products = {};

    await database1.ref().child("products").get().then((result)=>{
        if (result.exists()){ //si hay datos que peudo consultar entonces...
            products = result.val();
        } else{
            console.log("Item not found");
        }
    });
    return products;
}

// ejecutando la funcion para recuperar los productos guardados en firebase y también para crear las tarjetas (cards)

async function showAllProducts(){
    let allProducts = await retrieveAllProducts();
    let listOfIds = Object.keys(allProducts);
    listOfIds.forEach((id) =>{
        let product = allProducts[id];
        addNewCard(product.name, product.description, product.imgUrl, id)
    });
}

showAllProducts();


// Función para añadir email a FireBase
async function addEmail(email){
    return await database1.ref().child("newsletter").push(
        {
            email: email,
        });
}

//Funcion para obtener el correo registrado en la sección newsletter
function getEmail(){
    let newsletterEmail = document.getElementById("mail-newsletter").value;
        
    let result = {
        email: newsletterEmail,
    };
    
    return result;
}

// cuando presione el botón "suscribirse", enviar los datos a firebase, es decir, hacer uso de las funciones creadas anteriormente
let suscribeButton = document.getElementById("btn-suscribe");

suscribeButton.addEventListener("click", async ()=>{
    
    let newsletter_Email = getEmail();
    let response= await addEmail(newsletter_Email.email).key;
    console.log(response);
    alert("Has registrado correctamente tu correo :3");
});




// antes de tener firebase, podiamos utilizar este array de objetos


/* 
product_list.forEach((element) => {
    addNewCard(element.title, element.description, element.imgUrl, element.id);
});

let product_list = [
    {
        id: 1,
        title: "Producto No. 1",
        description: "Lorem Ipsum 1 ",
        imgUrl: "https://via.placeholder.com/300",
    },
    {
        id: 2,
        title: "Producto No. 2",
        description: "Lorem Ipsum 2",
        imgUrl: "https://via.placeholder.com/300",
    },
    {
        id: 3,
        title: "Producto No. 3",
        description: "Lorem Ipsum 3",
        imgUrl: "https://via.placeholder.com/300",
    },
    {
        id: 4,
        title: "Producto No. 4",
        description: "Lorem Ipsum 4",
        imgUrl: "https://via.placeholder.com/300",
    },
];*/

