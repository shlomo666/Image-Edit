/**
 * A directive meant to enable a custom browing button, which can have a custom 
 * presentation rather than the <input type='file'> HTML 5 element, which shows 
 * the file name along side with the button. 
 * 
 * This is done by a background button which is declared in the javascript only, 
 * and is not shown on the page. When the user clicks the custom button - the 
 * background button gets clicked and so, a browse file dialog is shown.
 * When the file is chosen it is sent to 'setAsBackgroundForCanvas' method.
 */
app.directive("browseButton", function(canvasService){
    var fileSelect = document.createElement('input'); //input it's not displayed in html, I want to trigger it form other elements
    fileSelect.type = 'file';
    fileSelect.accept = "image/*";
    
    var r = new FileReader();
    r.onloadend = function(e) { //callback after files finish loading
        canvasService.setAsBackgroundForCanvas(e.target.result);
    }

    fileSelect.onchange = function() { //set callback to action after choosing file
        if (fileSelect.files == null || fileSelect.files == undefined) {
            alert("This Browser has no support for HTML5 FileReader yet!");
            return false;
        }

        var f = fileSelect.files[0];
        if(f != null){ // accures when the same picture is loaded again.
            canvasService.backgroundImageName = f.name.replace(/\.[^/.]+$/, "");	//	set backgroundImageName so once saving the name will be "<name> Edited.png"
            r.readAsDataURL(f); //once defined all callbacks, begin reading the file
        }
    };
    
    return {
        restrict : "A",
        link: function ($scope, element, attrs) { //DOM manipulation
            element.bind('click', function () {
                fileSelect.click(); //activate function to begin input file on click
            });
        } 
    };
});