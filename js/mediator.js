!function() {
    var Mediator = window.Mediator = {},
        channels = [];

    Mediator.subscribe = function(channel, func) {
        if (!channels[channel]) {
            channels[channel] = [];
        }
        channels[channel].push({ context: this, callback: func });
    };

    Mediator.publish = function(channel) {
        if(!channels[channel]) {
            console.warn('No channels published for - ' + channel);
            return false;
        }
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i=0,l=channels[channel].length; i<l; i=i+1) {
            var subscription = channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }
    };

    Mediator.getChannels = function() {
        return channels;
    };


    Mediator.installTo = function(obj) {
        obj.subscribe = this.subscribe;
        obj.publish = this.publish;
    }
}();