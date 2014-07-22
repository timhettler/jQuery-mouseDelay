(function ($) {
    "use strict";

    $.event.special.mouseover = $.event.special.mouseout = {

        setup: function () {
            $(this)
                .data('mouseDelay', {
                    state : 0,
                    timer_id : 0
                });

            return false;
        },

        teardown: function () {
            $(this)
                .removeData( 'mouseDelay' );

            return false;
        },

        add: function ( handleObj ) {

            var old_handler = handleObj.handler;

            handleObj.handler = function ( event ) {

                var $self = $(this),
                    data = $self.data( 'mouseDelay' ),
                    direction = ( event.type === 'mouseover' || event.type === 'mouseenter' ) ? 'over' : 'out',
                    delay = ( typeof event.data === 'number' ) ? event.data : $.fn.hover.defaultSettings[direction];

                data.timer_id = clearTimeout( data.timer_id );

                if ( data.state !== direction ) {

                    data.timer_id = ( function (obj, args) {
                        return setTimeout(
                            function () {
                                data.state = direction;
                                old_handler.apply(obj, args);
                            },
                            delay
                        );
                    } ( this, arguments ) );

                }
            };
        }
    };

    $.fn.hover = function ( fnOver, fnOut, delay ) {

        var settings = {};

        if ( typeof fnOut !== "function" ) {
            delay = fnOut;
            fnOut = fnOver;
        }

        if ( typeof delay === "number") {
            settings.over = settings.out = delay;
        } else {
            settings = $.extend( {}, $.fn.hover.defaultSettings, delay );
        }

        return this.mouseenter( settings.over, fnOver ).mouseleave( settings.out, fnOut );
    };

    $.fn.hover.defaultSettings = {
        over : 150,
        out  : 150
    };

} ( jQuery ) );