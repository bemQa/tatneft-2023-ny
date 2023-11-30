let scrollTop = $(window).scrollTop();

$(window).scroll(function(evt) {
    scrollTop = $(this).scrollTop();
});

$(document).ready(function() {   
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
    $('.winners-prizes-tab-trigger').click(function(e){
        e.preventDefault();
        $('.winners-prizes-tab-trigger').removeClass('active');
        var tab = $(this).data('tab');
        $('.winners-prizes-tab').removeClass('active');
        $(this).addClass('active');
        $('.winners-prizes-tab-item').removeClass('active');
        $('.winners-prizes-tab-item[data-tab="'+ tab +'"]').addClass('active');
    });
    $('.winners-week-tab-trigger').click(function(e){
        e.preventDefault();
        $('.winners-week-tab-trigger').removeClass('active');
        var subtab = $(this).data('subtab');
        $('.winners-week-tab').removeClass('active');
        $(this).addClass('active');
        $('.winners-week-tab-item').removeClass('active');
        $('.winners-week-tab-item[data-subtab="'+ subtab +'"]').addClass('active');
    });

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