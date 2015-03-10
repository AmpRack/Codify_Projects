// Collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});


// Page scrolling / Data-Spy
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


// Adjust carousel size for instantiation and window resizing
function resizeCarousel() {
  var slideCount = $('#img-carousel li').length;
  var slideWidth = $(window).width();
  var slideHeight = $('#img-carousel li img').height();
  var sliderUlWidth = slideCount * slideWidth;

  $('#carousel').css({ width: slideWidth });
  $('#img-carousel').css({ width: sliderUlWidth, marginLeft: - slideWidth });
  $('#img-carousel li').css({ width: $(window).width(), height: slideHeight });
  $('.overlay').css({ height: $('#img-carousel li img').height() });
}


// Move carousel slides
function runCarousel() {
    var slideWidth = $('#img-carousel li').width();

    $('#img-carousel').animate({ left: - slideWidth }, 1500, "easeInOutQuart", function () {
        $('#img-carousel li:first-child').appendTo('#img-carousel');
        $('#img-carousel').css('left', '');
    });

    $('#img-carousel li').each(function() {
        var thisTitle = $(this).attr("title");
        if (thisTitle == "Header01") $(this).css( "background-image", "url('img/header01bw.png')" );
        if (thisTitle == "Header02") $(this).css( "background-image", "url('img/header02bw.png')" );
        if (thisTitle == "Header03") $(this).css( "background-image", "url('img/header03bw.png')" );
        if (thisTitle == "Header04") $(this).css( "background-image", "url('img/header04bw.png')" );
    });

}


// Resize the #about divs to an equal height        
function equalheight(container) {
    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array(),
        $el,
        topPosition = 0;
    $('#about .btn-content').each(function() {

        $el = $(this);
        $($el).height('auto');
        topPostion = $el.position().top;

        if (currentRowStart != topPostion) {
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        }
            rowDivs.length = 0; 
            currentRowStart = topPostion;
            currentTallest = $el.height();
            rowDivs.push($el);
        } else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        };
        for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        };
    });
}


// Animate Digital Clock button on hover
function clockBlink() {
  var currentTime = new Date();
  var secs = currentTime.getSeconds();

  if (secs % 2 == 1) {
      $('#project-clock p').css('border-width', "4px");
      $('#project-clock p').css('padding', "3px 6px");
  } else {
      $('#project-clock p').css('border-width', "2px");
      $('#project-clock p').css('padding', "5px 9px");
  }
  setTimeout(function() {clockBlink()}, 1000);
}


$(document).ready(function() {
  // Instantiate and Run carousel
    resizeCarousel(); // Carousel size must be instantiated here first
    setInterval(function () {
        runCarousel(); 
    }, 5000);
  // Detect hover over Carousel Button
  $('.overlay a').mouseover(function(){
    $('#img-carousel li img').css('opacity', '1');
  });
  $('.overlay a').mouseout(function(){
    $('#img-carousel li img').css('opacity', '0');
  });


  // Detect hover over Digital Clock
  $('.project-item:nth-of-type(1)').mouseover(function(){
    $('#project-clock p').css('border-color', "#05E9FF");
    clockBlink();
  });
  $('.project-item:nth-of-type(1)').mouseout(function(){
    $('#project-clock p').css('border-color', "#000000");
  });

  // Detect hover over Calculator
  $('.project-item:nth-of-type(2)').mouseover(function(){
    $('#calc-bg').css('bottom', '90.25%');
    $('#calc-keys').css('margin-top','44%');
  });
  $('.project-item:nth-of-type(2)').mouseout(function(){
    $('#calc-bg').css('bottom', '-40%');
    $('#calc-keys').css('margin-top','30%');
  });

  // Detect hover over Vault Shop
  $('.project-item:nth-of-type(3)').mouseover(function(){
    $('#project-vault p:first-of-type').css('top', '-80px');
    $('#project-vault p:last-of-type').css('top','-70px');
  });
  $('.project-item:nth-of-type(3)').mouseout(function(){
    $('#project-vault p:first-of-type').css('top', '-210px');
    $('#project-vault p:last-of-type').css('top','40px');
  });

  // Detect hover over Simulator
  var switchCells = [0,1,4,5,7,15];
  $('.project-item:nth-of-type(4)').hover(function(){
    $.each(switchCells, function(i, x){
      $('.sim-cell:nth-of-type(' + x + ')').toggleClass('cell-black');
    });
  });
  
})
$(window).load(function() {
  equalheight('.main article');
});
$(window).resize(function(){
  equalheight('.main article');
  resizeCarousel();
});


