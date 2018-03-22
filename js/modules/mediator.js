!function() {
    var Mediator = window.Mediator = {},
        channels = [],
        debug = true;

    Mediator.subscribe = function(channel, func) {
        if (!channels[channel]) {
            channels[channel] = [];
        }
        channels[channel].push({ context: this, callback: func });

        if(debug) console.log('Subscribed for - ' + channel);
    };

    Mediator.publish = function(channel) {
        if(!channels[channel]) {
            if(debug) console.warn('No channels published for - ' + channel);
            return false;
        }
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i=0,l=channels[channel].length; i<l; i=i+1) {
            var subscription = channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }

        if(debug) console.log('Published for - ' + channel);
    };

    if(debug) {
        Mediator.getChannels = function() {
            return channels;
        };
    }


    Mediator.installTo = function(obj) {
        obj.subscribe = this.subscribe;
        obj.publish = this.publish;
    }
}();