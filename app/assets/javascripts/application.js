// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery3
//= require jquery_ujs
//= require turbolinks
//= require materialize
//= require lodash
//= require lazysizes.min
//= require masonry.pkgd.min
//= require imagesloaded.pkgd.min
//= require_tree .
//= require serviceworker-companion

//this can fix reaload on all properties, carousel problem. but might change on pwa
$(document).on('turbolinks:load', function() {
  M.AutoInit();
  var $grid = $('#main-elem').masonry({
      itemSelector: '.col',
      initLayout: true
  });
  $grid.imagesLoaded().always( function() {
    setTimeout(function(){ $grid.masonry('layout'); }, 120);
  });
  const THRESHOLD = 300;
  const $paginationElem = $('.pagination');
  const $window = $(window);
  const $document = $(document);
  const paginationUrl = $paginationElem.attr('data-pagination-endpoint');
  const pagesAmount = $paginationElem.attr('data-pagination-pages');
  var currentPage = 1;
  var baseEndpoint;

  /* validate if the pagination URL has query params */
  if (paginationUrl.indexOf('?') != -1) {
    baseEndpoint = paginationUrl + "&page=";
  } else {
    baseEndpoint = paginationUrl + "?page=";
  }

  /* initialize pagination */
  $paginationElem.hide();
  var isPaginating = false;

  /* listen to scrolling */
    $window.on('scroll', _.debounce(function () {
      if (!isPaginating && currentPage < pagesAmount && $window.scrollTop() > $document.height() - $window.height() - THRESHOLD) {
        isPaginating = true;
        currentPage++;
        $paginationElem.show();
        $.ajax({
          url: baseEndpoint + currentPage
        }).done(function (result) {
          var $items = $(result);
          $grid.append($items).masonry('appended',$items);
          
          $grid.imagesLoaded().progress( function() {
          }).always(function(){
            setTimeout(function(){ $grid.masonry('layout'); }, 320);
          });
          isPaginating = false;
          $paginationElem.hide();
        }).fail(function (xhr, textStatus, errorThrown){
          M.toast({html: 'There is no internet connection!'});
        });
      }
      //if (currentPage >= pagesAmount) {
      //  $paginationElem.hide();
      //}
    }, 100));
});

