// Collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

// Page scrolling feature (requires jQuery Easing plugin)
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Close the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

// Stretch text to fit in a given width
$.fn.stretch_text = function(){
    var elmt          = $(this),
        cont_width    = elmt.width(),
        txt           = elmt.html(),
        one_line      = $('<span class="stretch_it">' + txt + '</span>'),
        nb_char       = elmt.text().length,
        spacing       = cont_width/nb_char,
        txt_width;
    
    elmt.html(one_line);
    txt_width = one_line.width();
    
    if (txt_width < cont_width){
        var  char_width     = txt_width/nb_char,
             ltr_spacing    = spacing - char_width + (spacing - char_width)/nb_char ; 
  
        one_line.css({'letter-spacing': ltr_spacing});
    } else {
        one_line.contents().unwrap();
        elmt.addClass('justify');
    }
};
$(document).ready(function () {
    $('.stretch').each(function(){
        $(this).stretch_text();
    });
});

// Force divs to be equal height, based on the tallest
/* Isnt working quite right... 
var currentTallest = 0;
var currentRowStart = 0;
var rowDivs = new Array();
var $el = 0
var topPosition = 0;

$('.height-fix').each(function() { // This is the class that does that work
    $el = $(this);
    topPostion = $el.position().top;

    if (var currentRowStart != topPostion) {
        for (currentDiv = 0; currentDiv < rowDivs.length ; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        }
    rowDivs.length = 0;
    currentRowStart = topPostion;
    currentTallest = $el.height();
    rowDivs.push($el);
   }
   else {
        rowDivs.push($el);
        currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
    }
 
    for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
        rowDivs[currentDiv].height(currentTallest);
    }
});​  */