(function ($) {

    $.hoverDelayOptions = {
        mouseover : 150,
        mouseout : 150
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
        },

        add: function ( handleObj ) {

            var old_handler = handleObj.handler;

            handleObj.handler = function ( event ) {

                console.log(arguments);

                if ( this !== event.target ) { return; }

                var $self = $(this),
                    data = $self.data('hoverDelay'),
                    nextState = (event.type === 'mouseover') ? 1 : 0;
                    delay = (typeof event.data === 'number') ? event.data : $.hoverDelayOptions[event.type],

                data.timer_id = clearTimeout(data.timer_id);

                if (data.state !== nextState) {

                    data.timer_id = (function(obj, args) { return setTimeout(
                        function(){
                            data.state = nextState;
                            old_handler.apply(obj, args);
                        },
                        delay
                    );})(this, arguments);

                }
            }
        }
    }

})(jQuery);