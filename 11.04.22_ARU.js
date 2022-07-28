window.onload = function() {    //loads with page to account for Canvas loading JS first

    //Global Javascript

    var acc = document.getElementsByClassName("accordion");
    //console.log(acc);
    var i;
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            //console.log(this);
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.visibility === "visible") {
                panel.style.visibility = "hidden";
                panel.style.height = "0";
                panel.style.padding = "0";
            } else {
                panel.style.visibility = "visible";
                panel.style.height = "unset";
                panel.style.padding = "6px 14px";
            }
        });
    }


    /*let accordion = document.getElementsByClassName("accordion");
    let i;

    for (i = 0; i < accordion.length; i++) {
        accordion[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight){
        panel.style.maxHeight = null;
        } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        } 
    });
}*/
        
}


var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

function myFunction() {
    var dots = document.getElementsByClassName("dots");
    var moreText = document.getElementsByClassName("more");
    var btnText = document.getElementsByClassName("myBtn");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read more";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read less";
        moreText.style.display = "inline";
    }
}