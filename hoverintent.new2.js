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

                console.log(arguments);

                if ( this !== event.target ) { return; }

                var $self = $(this),
                    data = $self.data('hoverIntent'),
                    delay = event.data;

                if (event.type === 'mouseover') {

                    data.timer_id = clearTimeout(data.timer_id);

                    if (data.state !== 1) {

                        data.timer_id = (function(obj, handler, args) { return setTimeout(
                            function(){
                                data.state = 1;
                                old_handler.apply(obj, args);
                            },
                            delay
                        );})(this, old_handler, arguments);

                    }

                } else {

                    data.timer_id = clearTimeout(data.timer_id);

                    if (data.state === 1) {

                        data.timer_id = (function(obj, handler, args) { return setTimeout(
                            function(){
                                data.state = 0;
                                handler.apply(obj, args);
                            },
                            delay
                        );})(this, old_handler, arguments);

                    }
                }
            }
        }
    }

})(jQuery);