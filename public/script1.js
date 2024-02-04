
document.addEventListener("DOMContentLoaded", function() {
    var writebutton = document.getElementById("write-now");
    var viewbutton = document.getElementById("view-now");
    var editbutton = document.getElementById("edit-now");

    writebutton.addEventListener("click" , function (){
        // used to open links in new tab
        window.open("/write" , "_blank");
    });

    editbutton.addEventListener("click" , function () {
        window.open("/edit" , "_blank");
    });

    viewbutton.addEventListener("click" , function () {
        window.open("/view" , "_blank")
    })
});


