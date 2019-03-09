$(document).ready(function () {
    const things = [];
    let scrollbuffer = 0;
    let animationDistance = 100;
    let screen_h = $(window).innerHeight();
    let scrollpos;
    let way = 0;
    let animationCount = 0;
    let thing;
    let element_animation, element_delay;

    function Thing(top, ani, pos, delay) {
        this.top = top;
        this.animation = ani;
        this.pos = pos;
        this.delay = delay;
    }
    
    
    $('.animation').each(function (i) {
        
        element_animation= $(this).attr('data-effect');

        if ($(this).attr('data-delay')) {
            element_delay = $(this).attr('data-delay');
            element_delay = parseInt(element_delay);
        } else {
            element_delay = 0;
        }
        thing = new Thing($(this).offset().top, element_animation, i, element_delay);
        things.push(thing);
    });
    
    console.log(things);
    let backgroundImage = new Image();
    backgroundImage.src = "presetbase-lightroom-presets-571061-unsplash.jpg";
    
    backgroundImage.onload = function(){
        scrollAction();
    }
    
    setTimeout(function(){animationChecker = 1;},2000);

    $(document).on('scroll', function () {
        if (scrollbuffer == 0) {
            scrollbuffer = 1;
            scrollAction();
            setTimeout(function () {
                scrollbuffer = 0;
            }, 60);
        }
    });
    

    function scrollAction() {
        let s = $(document).scrollTop();
        let distance = s + screen_h - animationDistance;
        while (things[way] && distance > things[way].top) {
            console.log('In while loop with way = ' + way + ' and distance = ' + distance + ' and delay ' + things[way].delay);
                animateElement($('.animation').eq(way), things[way].animation, things[way].delay);
                way++;
        }
    }

    function animateElement($element, $animation, $delay) {
            setTimeout(function () {
                console.log('Animating ' + $element);
                $element.addClass($animation);
            }, $delay);
        
    }
});
