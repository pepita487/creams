InteractiveImg = function(image, picQty, centerImg, path, ext) {
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

    this.initialAnimation = function(){

        var interactImg = this;
            var interval = setInterval(animate, 40);
            function animate() {
                interactImg._image.src = interactImg.path + interactImg.count + interactImg._ext;
                interactImg.count++;
                    if (interactImg.count >= interactImg.picQty) {
                        interactImg.count = 0;
                    }
                    if (interactImg.count < 0) {
                        interactImg.count = interactImg.picQty;
                    }
                    if(interactImg.count == interactImg.centerImg ){
                        clearInterval(interval);
                    }
            }
    }

    this.changeImage = function() {

        if (this.interacting) {
            if (this.lastPos.x < this.mousePos.x) {
                this.count++;
                if (this.count >= this.picQty) {
                    this.count = 0;
                }
                if (this.count < 0) {
                    this.count = this.picQty;
                }
            } else if (this.lastPos.x > this.mousePos.x) {
                this.count--;
                if (this.count < 0) {
                    this.count = this.picQty;
                }
            }

        }
        this._image.src = this.path + this.count + this._ext;
        this.lastPos = this.mousePos;
    }
}