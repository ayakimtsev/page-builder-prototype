!function() {
    var Mediator = window.Mediator = {},
        channels = [];

    Mediator.subscribe = function(channel, func) {
        if (!channels[channel]) {
            channels[channel] = [];
        }
        channels[channel].push({ context: this, callback: func });

        console.log('Subscribed for - ' + channel);
    };

    Mediator.publish = function(channel) {
        if(!channels[channel]) {
            console.warn('No channels published for - ' + channel);
            return false;
        }
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i=0,l=channels[channel].length; i<l; i=i+1) {
            console.log('Mediator handle - ' + channel);

            var subscription = channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }

        console.log('Published for - ' + channel);
    };

    Mediator.getChannels = function() {
        return channels;
    };


    Mediator.installTo = function(obj) {
        obj.subscribe = this.subscribe;
        obj.publish = this.publish;
    }
}();