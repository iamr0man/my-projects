const $tabs = $('.tabs-title');
const $tabsContent = $('.content-item');
const $decorationTriangular = $('<div></div>').addClass("arrow-down"); //create arrow

$('.content-item:not(:first-child)').hide(); //hide all element instead first
$('.tabs-title').eq(0).append($decorationTriangular)

let index = 0;
$tabs.click(function(e){
    $tabs.eq(index).removeClass('active');
    $tabsContent.eq(index).hide();

    index = $(e.target).index();
    $(e.target).addClass('active');
    $tabsContent.eq(index).show();

    $(e.target).append($decorationTriangular)
})

$('.bar-menu-content-wrap>li:not(:first-child)').hide(); //hide all img of content instead first

$(document).ready(function(){
    const arr = [];

    for(let i = 1; i <= 12; i++){
        arr[i] = new Image();
        arr[i].src = 'img/different_photo/photo' + i + '.jpg'; 
        arr[i].alt = 'not found'

        $('.all-content').append(arr[i]);      
    }
});

let index_i = 0;
$('#bar-menu').click(function(e){
    $('.bar-menu-item').eq(index_i).removeClass('active-item');
    $('.bar-menu-content-wrap>li').eq(index_i).hide();

    index_i = $(e.target).index();

    $(e.target).addClass('active-item');
    $('.bar-menu-content-wrap>li').eq(index_i).show();
})

