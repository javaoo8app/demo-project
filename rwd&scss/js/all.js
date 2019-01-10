$(document).ready(function() {
   $('.showmenu').on('click',  function(e){
      e.preventDefault();
      $('.menu').toggleClass('menu-show');
  });
});