InteractiveImg = function(image, picQty, centerImg, path, ext, iniImg, animSpeed) {
    this.path = path;
    this.coordinates = { x1: 0, y1: 0, x2: 0, y2: 0 };
    this.picQty = picQty;
    this._image = image;
    this.interacting = false;
    this.mousePos = { x: 0, y: 0 };
    this.lastPos = this.mousePos;
    this.centerImg = centerImg;
    this.count = centerImg;
    this._picQty = picQty;
    this._ext = ext;
    this.iniImg = iniImg;
    this.objAnim = "";
    this.animSpeed = animSpeed;


    this.initialize = function() {
        this.AddEventListenersClick();
        this.AddEventListenersTouch();
    }

    this.getTouchPos = function(imageDom, touchEvent) {
        let rect = imageDom.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - rect.left,
            y: touchEvent.touches[0].clientY - rect.top
        };
    }

    // Get the position of the mouse relative to the canvas
    this.getMousePos = function(imageDom, mouseEvent) {
        let rect = imageDom.getBoundingClientRect();
        return {
            x: mouseEvent.clientX - rect.left,
            y: mouseEvent.clientY - rect.top
        };
    };

    this.AddEventListenersClick = function() {

        let interactiveImg = this;

        this._image.addEventListener("mousedown", function(e) {
            interactiveImg.interacting = true;
            interactiveImg.lastPos = interactiveImg.getMousePos(interactiveImg._image, e);
            interactiveImg.changeImage();
        }, false);
        this._image.addEventListener("mouseup", function(e) {
            interactiveImg.interacting = false;
        }, false);
        this._image.addEventListener("mouseleave", function(e) {
            interactiveImg.interacting = false;
        }, false);
        this._image.addEventListener("mousemove", function(e) {
            interactiveImg.mousePos = interactiveImg.getMousePos(interactiveImg._image, e);
            interactiveImg.changeImage();
        }, false);
    };

    this.AddEventListenersTouch = function() {

        // Set up touch events for mobile, etc

        let interactiveImg = this;

        this._image.addEventListener("touchstart", function(e) {
            interactiveImg.interacting = true;
            interactiveImg.initialAnimation(true);
            interactiveImg.lastPos = getTouchPos(interactiveImg._image, e);
            let touch = e.touches[0];
            let mouseEvent = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            interactiveImg.changeImage();
            interactiveImg._image.dispatchEvent(mouseEvent);
        }, false);
        interactiveImg._image.addEventListener("touchend", function(e) {
            interactiveImg.interacting = false;
            interactiveImg.initialAnimation(true);
            let mouseEvent = new MouseEvent("mouseup", {});
            interactiveImg._image.dispatchEvent(mouseEvent);
        }, false);
        interactiveImg._image.addEventListener("touchmove", function(e) {
            let touch = e.touches[0];
            let mouseEvent = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            interactiveImg._image.dispatchEvent(mouseEvent);
            interactiveImg.initialAnimation(true);
        }, false);

        // Prevent scrolling when touching the canvas
        document.body.addEventListener("touchstart", function(e) {
            if (e.target == interactiveImg._image) {
                e.preventDefault();
            }
        }, false);
        document.body.addEventListener("touchend", function(e) {
            if (e.target == interactiveImg._image) {
                e.preventDefault();
            }
        }, false);
        document.body.addEventListener("touchmove", function(e) {
            if (e.target == interactiveImg._image) {
                e.preventDefault();
            }
        }, false);
    };

    this.initialAnimation = function() {

        var interactImg = this;
        this.objAnim = setInterval(animate, this.animSpeed);

        function animate() {

            if (interactImg._image.style.display == "none") {
                interactImg.count = interactImg.centerImg;
            } else {

                if (!interactImg.interacting) {
                    interactImg._image.src = interactImg.path + interactImg.count.toString().padStart(3, "0") + interactImg._ext;
                    interactImg.count++;
                    if (interactImg.count >= interactImg.picQty) {
                        interactImg.count = interactImg.iniImg;
                    }
                    if (interactImg.count < interactImg.iniImg) {
                        interactImg.count = interactImg.picQty;
                    }
                }
            }

        }
    }



    this.changeImage = async function() {

        if (this.interacting) {
            if (this.lastPos.x < this.mousePos.x) {
                this.count++;
                if (this.count >= this.picQty) {
                    this.count = this.iniImg;
                }
                if (this.count < this.iniImg) {
                    this.count = this.picQty;
                }
            } else if (this.lastPos.x > this.mousePos.x) {
                this.count--;
                if (this.count < this.iniImg) {
                    this.count = this.picQty;
                }
            }
        }




        function delay(delayInms) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(2);
                }, delayInms);
            });
        }

        await delay(2000);
        this._image.src = this.path + this.count.toString().padStart(3, "0") + this._ext;
        this.lastPos = this.mousePos;
    }


}