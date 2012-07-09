(function ($) {

    var default_configuration = {
        sensitivity: 7,
        inTimeout: 150,
        outTimeout: 150
    };

    $.event.special.mouseover = $.event.special.mouseout = {

        setup: function () {
            $(this)
                .data('hoverIntent', {
                    cX : null,
                    cY : null,
                    pX : null,
                    pY : null,
                    timer_id : 0
                });

            return false;
        },

        teardown: function () {
            $(this)
                .removeData('hoverIntent');
        },

        add: function ( handleObj ) {

            var old_handler = handleObj.handler;

            handleObj.handler = function ( event ) {

                if ( this !== event.target ) { return; }

                var $self = $(this),
                    data = $self.data('hoverIntent'),
                    delay = event.data;


                clear.apply(this);

                if (event.type === 'mouseover') {

                    $(this).on('mousemove.hoverIntent', track);

                    data.timer_id = clearTimeout(data.timer_id);

                    if (data.state !== 1) {

                        data.timer_id = (function(obj) { return setTimeout(
                            function(){over.apply(obj, [ event, old_handler ])},
                            delay
                        );})(this);

                    }

                } else {

                    $(this).off('mousemove.hoverIntent', track);

                    data.timer_id = clearTimeout(data.timer_id);

                    if (data.state === 1) {

                        data.timer_id = (function(obj) { return setTimeout(
                            function(){out.apply(obj, [ event, old_handler ])},
                            delay
                        );})(this);

                    }
                }
            }
        }
    }

    var track = function (event) {
            var $self = $(this),
                data = $self.data('hoverIntent');

            data.pX = data.cX;
            data.pY = data.cY;
            data.cX = event.pageX;
            data.cY = event.pageY;
        },

        clear = function () {
            var $self = $(this),
                data = $self.data('hoverIntent');

            data.pX = data.cX = data.pY = data.cY = null;
        }

        over = function(event, old_handler) {
            var $self = $(this),
                data = $self.data('hoverIntent');

            if ( ( Math.abs(data.pX-data.cX) + Math.abs(data.pY-data.cY) ) < default_configuration.sensitivity ) {

                data.state = 1;

                old_handler.apply(this,[event]);

            } else {

                data.timer_id = (function(obj) { return setTimeout(
                    function(){over.apply(obj, [ event, old_handler ])},
                    default_configuration.inTimeout
                );})(this);
            }
        },

        out = function(event, old_handler) {

            var $self = $(this),
                data = $self.data('hoverIntent');

            data.state = 0;

            old_handler.apply(this,[event]);
        };



})(jQuery);