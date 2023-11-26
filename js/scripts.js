let scrollTop = $(window).scrollTop();

$(window).scroll(function(evt) {
    scrollTop = $(this).scrollTop();
});

$(document).ready(function() {
    // анимация меню
    $('.menu').click(function(e){
        e.preventDefault();
        (this.classList.contains('active') === true) ? this.classList.remove('active') : this.classList.add('active');

        $('.header').toggleClass('active');
        $('body').on('click', function (e) {
            let div = $('.menu-links-wrapper, .menu');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                $('.header, .menu').removeClass('active');
            }
        });
    });
    
    // якоря для ссылок
    $('.anchor[href^="#"]').click(function () {
        $('.header').removeClass('active'); 
        $('.menu').removeClass('active');

        elementClick = $(this).attr("href");
        destination = $(elementClick).offset().top-80;
        $('html, body').animate( { scrollTop: destination }, 500, 'swing' );
        return false;
    });

    // валидация
    function checkValidate() {
        var form = $('form');

        $.each(form, function () {
            $(this).validate({
                ignore: [],
                errorClass: 'error',
                validClass: 'success',
                rules: {
                    name: {
                        required: true 
                    },
                    email: {
                        required: true,
                        email: true 
                    },
                    phone: {
                        required: true,
                        phone: true 
                    },
                    theme: {
                        required: true 
                    },
                    message: {
                        required: true 
                    },
                    password: {
                        required: true,
                        normalizer: function normalizer(value) {
                            return $.trim(value);
                        }
                    }
                },
                errorElement : 'span',
                errorPlacement: function(error, element) {
                    var placement = $(element).data('error');
                    if (placement) {
                        $(placement).append(error);
                    } else {
                        error.insertAfter(element);
                    }
                },
                messages: {
                    phone: {
                        required: 'Поле обязательно для заполнения',
                        phone: 'Некорректный номер'
                    },
                    email: {
                        required: 'Поле обязательно для заполнения',
                        email: 'Некорректный e-mail'
                    },
                    name: {
                        required: 'Поле обязательно для заполнения'
                    },
                    theme: {
                        required: 'Поле обязательно для заполнения'
                    },
                    text: {
                        required: 'Поле обязательно для заполнения'
                    }
                }
            });
        });
        jQuery.validator.addMethod('email', function (value, element) {
            return this.optional(element) || /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/.test(value);
        });
        jQuery.validator.addMethod('phone', function (value, element) {
            return this.optional(element) || /\+7\(\d+\)\d{3}-\d{2}-\d{2}/.test(value);
        });

        $('body').on('change', 'select', function() {
            $(this).valid();
        });
    }
    checkValidate();

    // маски
    if ($('.phone-mask').length) {
        $(".phone-mask").inputmask({
            mask:"+7(999)999-99-99",
            "clearIncomplete": true
        });
    }

    // аккордеон
    function openAccordion() {
        var wrap = $('.accordion-wrap');
        var accordion = wrap.find('.accordion-title');

        accordion.on('click', function() {
            var $this = $(this);
            var $parent = $(this).parent();
            var content = $this.next();

            if (content.is(':visible')) {
                $this.removeClass('active');
                $parent.removeClass('active');
                content.slideUp('fast');
            } else {
                accordion.removeClass('active');
                accordion.parent().removeClass('active');
                accordion.next().slideUp('fast');

                $this.addClass('active');
                $parent.addClass('active');
                content.slideDown('fast');
            }

        });
    }
    openAccordion();

    // таймер завершения акции
    let end_date = $('.end-event-date').val();
    $('.countdown__widget').countdown(end_date)
    .on('update.countdown', function (event) {
        $(this).html(event.strftime(
            `<div class="countdown__widget-part days">
                <div class="countdown__widget-number">%D</div>
                <span class="countdown__widget-text">дней</span>
            </div>
            <div class="countdown__widget-part hours">
                <div class="countdown__widget-number">%H</div>
                <span class="countdown__widget-text">часов</span>
            </div>
            <div class="countdown__widget-part minutes">
                <div class="countdown__widget-number">%M</div>
                <span class="countdown__widget-text">минут</span>
            </div>`
        ));
    })
    .on('finish.countdown', function(event) {
        $(this).parent().find('.end-event-countdown-text').text('Срок регистрации чеков завершен');
    });

    // модалки
    $('body').on('click','.open-modal', function(e){
        e.preventDefault();
        let modal_id = $(this).attr('href');
        $.fancybox.open({
            src: modal_id,
            type: 'inline',
            touch: false
        });
    });

    // табы
    $('.winners-week-tab-trigger').click(function(e){
        e.preventDefault();
        $('.winners-week-tab-trigger').removeClass('active');
        var tab = $(this).data('tab');
        $('.winners-week-tab').removeClass('active');
        $(this).addClass('active');
        $('.winners-week-tab-item').removeClass('active');
        $('.winners-week-tab-item[data-tab="'+ tab +'"]').addClass('active');
    });
    $('.winners-prizes-tab-trigger').click(function(e){
        e.preventDefault();
        $('.winners-prizes-tab-trigger').removeClass('active');
        var tab = $(this).data('tab');
        $('.winners-prizes-tab').removeClass('active');
        $(this).addClass('active');
        $('.winners-prizes-tab-item').removeClass('active');
        $('.winners-prizes-tab-item[data-tab="'+ tab +'"]').addClass('active');

        $('.winners-week-tabs').removeClass('active');
        $('.winners-week-tabs[data-tab="'+ tab +'"]').addClass('active');
    });

    // слайдер табы победителей 
    let slider_winners_tabs = $('.winners-week-tabs');
    if (slider_winners_tabs.length) {
        slider_winners_tabs.owlCarousel({
            center: false,
            items: 4,
            autoWidth: true,
            loop: false,
            nav: true,
            dots: false,
            margin: 0,
            mouseDrag: false,
            touchDrag: true,
            navSpeed: 1300,
            responsive: {
                0: {
                    items: 3
                },
                480: {
                    items: 5
                },
                768: {
                    items: 4
                }
            }
        });
    }

    // select2
    if($('.select').length > 1) {
        $('select').each(function() {
            let $this = $(this).not('.select-search');
            let parent = $(this).not('.select-search').parents('.select');
            $this.select2({
                minimumResultsForSearch: Infinity,
                dropdownParent: parent
            });
        });
        $('.select-search').each(function() {
            let $this = $(this);
            let parent = $(this).parents('.select');
            $this.select2({
                dropdownParent: parent
            });
        });
    } else {
        $('select').select2({
            minimumResultsForSearch: Infinity,
            dropdownParent: $('.select')
        });
    }
});