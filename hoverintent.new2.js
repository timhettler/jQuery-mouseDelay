 (function ($) {
    "use strict";

    $.fn.hover.defaultSettings = {
        in : 150,
        out : 150,
    };

    $.event.special.mouseover = $.event.special.mouseout = {

        setup: function () {
            $(this)
                .data('hoverDelay', {
                    state : 0,
                    timer_id : 0
                });

            return false;
        },

        teardown: function () {
            $(this)
                .removeData('hoverDelay');

            return false;
        },

        add: function ( handleObj ) {

            var old_handler = handleObj.handler;

            handleObj.handler = function ( event ) {

                var $self = $(this),
                    data = $self.data('hoverDelay'),
                    direction = (event.type === 'mouseover' || event.type === 'mouseenter') ? 'in' : 'out',
                    delay = (typeof event.data === 'number') ? event.data : $.fn.hover.defaultSettings[direction];

                data.timer_id = clearTimeout(data.timer_id);

                if (data.state !== direction) {

                    data.timer_id = (function(obj, args) { return setTimeout(
                        function(){
                            data.state = direction;
                            old_handler.apply(obj, args);
                        },
                        delay
                    );})(this, arguments);

                }
            };
        }
    };

})(jQuery);