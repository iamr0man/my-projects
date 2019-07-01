const $tabs = $('.tabs-title');
const $tabsContent = $('.content-item');
const $decorationTriangular = $('<div></div>').addClass("arrow-down"); //create arrow

$('.content-item:not(:first-child)').hide(); //hide all element instead first

let index = 0;
$tabs.click(function(e){
    $tabs.eq(index).removeClass('active');
    $tabsContent.eq(index).hide();

    index = $(e.target).index();
    $(e.target).addClass('active');
    $tabsContent.eq(index).show();

    const $halfWidth = $(e.target).innerWidth()/2 - 30; //write half width

    $decorationTriangular.css('left', $halfWidth + "px"); //make position arrow in middle of tabs-title
    $(e.target).append($decorationTriangular)
})

