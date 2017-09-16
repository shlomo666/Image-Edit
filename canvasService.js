/**
 * This service deals with the canvas.
 */
app.service("canvasService", function(){
    this.backgroundImageName = "Image";
    var self = this;
    var canvas = new fabric.Canvas("myCanvas");
     
    this.setOnCanvas = function(picAddress, left, top, width, height, callback){
        fabric.Image.fromURL(picAddress, function(img){
            img.setLeft(left==undefined ? 0:left);
            img.setTop(top==undefined ? 0:top);
            if(width!=undefined)
                img.setWidth(width);
            if(height!=undefined)
                img.setHeight(height);
            canvas.add(img);

            if(callback != undefined)
                callback(img);
        });
    };
    this.setAsBackgroundForCanvas = function(imageBase64){
        fabric.Image.fromURL(imageBase64, function(img){
            canvas.setBackgroundImage(img);
            canvas.renderAll();
        });
    };

    this.save = function(){
        // Accessing the actual htmlElement by its id as featured in ES5
        document.getElementById("myCanvas").toBlob(function(blob){
            saveAs(blob, self.backgroundImageName + " Edited.png")
        });
    };
});
