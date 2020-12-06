$(document).ready(function() {

    //Create loop for make the same to all children in product-image
    let containerId = "product-image"; 
    let containerCanvas = document.getElementById(containerId);
    let imgs = containerCanvas.getElementsByTagName('img');
    let itemsToInteract = [];
    let picQty = 60;
    let centerImg = 32;
    let path = "themes/custom/olaytheme/images/products/product-";
    let ext = ".png";

    for (let i = 0; i < imgs.length; i++) {
        itemsToInteract.push(new InteractiveImg(imgs[i], picQty, centerImg, path + i + "/", ext));
        itemsToInteract[i].initialize();
    }
});
