$(document).ready(function() {

    //Create loop for make the same to all children in product-image
    let containerId = "product-image";
    let containerCanvas = document.getElementById(containerId);
    let imgs = containerCanvas.getElementsByTagName('img');
    let itemsToInteract = [];
    let picQty = 30;
    let centerImg = 12;
    let path = "themes/custom/olaytheme/images/products/product-";
    let ext = ".png";
    let iniImg = 0;
    let animSpeed = 100;

    for (let i = 0; i < imgs.length; i++) {
        itemsToInteract.push(new InteractiveImg(imgs[i], picQty, centerImg, path + i + "/", ext, iniImg, animSpeed));
        itemsToInteract[i].initialize();
        itemsToInteract[i].initialAnimation();
    }

});