const $tabs = $('.tabs-title');
const $tabsContent = $('.content-item');
const $decorationTriangular = $('<div></div>').addClass("arrow-down"); //create arrow

$('.content-item:not(:first-child)').hide(); //hide all element instead first
$('.tabs-title').eq(0).append($decorationTriangular)

let index = 0;
$tabs.click(function (e) {
    $tabs.eq(index).removeClass('active');
    $tabsContent.eq(index).hide();

    index = $(e.target).index();
    $(e.target).addClass('active');
    $tabsContent.eq(index).show();

    $(e.target).append($decorationTriangular)
})

$('.bar-menu-content-wrap>li:not(:first-child)').hide(); //hide all img of content instead first

$(document).ready(function () {
    const arr = [];

    for (let i = 1; i <= 12; i++) {
        arr[i] = new Image();
        $(arr[i]).attr('src', 'img/different_photo/photo' + i + '.jpg');
        $(arr[i]).attr('alt', 'not found');

        $('.all-content .img-item').eq(i).append(arr[i]);
    }
});

let index_i = 0;
$('.bar-menu-item').click(function (e) {
    $('.bar-menu-item').eq(index_i).removeClass('active-item');
    $('.bar-menu-content-wrap>li').eq(index_i).hide();

    index_i = $(e.target).index();

    $(e.target).addClass('active-item');
    $('.bar-menu-content-wrap>li').eq(index_i).show();
});

let currentIMG = '';

$('.white-bc-block').hide();
$('.bar-menu-content-wrap > li > div').mouseenter(function (e) {
    if (e.target.tagName === 'IMG') {
        currentIMG = e.target;
        $(e.target).replaceWith('<div class="white-bc-block">' +
            '<div class="manipulate-btns">' +
            '<i class="fas fa-link"></i>' +
            '<i class="fas fa-search"></i>' +
            '</div>' +
            '<h5 class="title-white-block">Creative design</h5>' +
            `<p class="type-of-white-block">${e.target.dataset.type}</p>` +
            '</div>')
    }
});

$('.bar-menu-content-wrap > li > div').mouseleave(function () {
    $('.white-bc-block').replaceWith(currentIMG);
})

$('.client-carusel').slick({
    infinite: false,
    slidesToShow: 4,
    speed: 300
})


const clientFeedback = ['Extraordinary professional! It has been an honor to work with some-one of her calibre. She is deliberate with her marketing tactics and implements with great attention to every detail. For me, one of her most important skill sets is her ability to self manage and keep our projects  moving forward no matter my availability or the lack thereof. No worries once you have agreed on a gameplan and a course of action',
    'Diana puts her heart and soul into her work. She gives you everything she’s got when she gets into a project. I am humbled to have worked with some-one of such high integrity and so committed to our mutual success. A truly great business partner.',
    'Integer dignissim, augue tempus ultricies luctus, quam dui laoreet sem, non dictum odio nisi quis massa.Morbi pulvinar odio eget aliquam facilisis.Tempus ultricies luctus, quam dui laoreet sem, non dictum odio nisi quis massa.Morbi pulvinar odio eget aliquam facilisis.',
    'Roman is a great client to work with. She is very helpful and approachable and is always available to answer any questions. I would highly recommend working with her!',
    'This project evolved in a lot more than just Email Auto Responders as per original job post. It was a real pleasure working with this business the last couple of years. The business concept and the products are great! Although at times slow on communication due to heavy workload and busy schedule, [name] is one of the best clients I have worked with – flexible, knowledgeable, open to suggestions, always ready to explore new ideas. Highly recommended client!'
];

let client_index = 2;
$('.img-client').click(function (e) {
    // debugger;
    $('.img-client').eq(client_index).removeClass('img-client-active');
    $(e.target).addClass('img-client-active');

    client_index = $(e.target).closest('div.slick-slide').attr('data-slick-index');
    $('.client-feedback-msg').text(clientFeedback[client_index]);
    $('.client-name').text(e.target.dataset.name)
    $('.client-position').text(e.target.dataset.pos)
    $('.client-photo > img').attr('src', $(e.target).attr('src'));
})