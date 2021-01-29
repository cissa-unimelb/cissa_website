// Typewriter Effect
(function($) {
    function type(target, str, i, delay, next, html) {
        var tab = new RegExp("\\t", "g");
        var newline = new RegExp("\n", "g");

        var format = str.replace(tab, "&nbsp;&nbsp;&nbsp;&nbsp;").replace("    ", "&nbsp;&nbsp;&nbsp;&nbsp;").replace(newline, "<br/>");
        var e = format.slice(0, i);

        if(html) target.html(e);
        else target.text(e);

        var tag = false;
        var special = false;
        var char = e.slice(-1);
        if(char === '<' || char === '/') tag = true;
        if(char === '>') tag = false;
        if(tag) return type(target, format, i+1, delay, next, html);

        if(char === '&') special = true;
        if(char === ';') special = false;
        if(special) return type(target, format, i+4, delay, next, html);

        if(i < str.length) {
            setTimeout(function() {
                type(target, format, i+1, delay, next, html);
            }, delay);
        }
        else {
            if(next != null) {
                next();
            }
        }
    }

    function erase(target, i, delay, next, html) {
        if(html) str = target.html();
        else str = target.text();

        var e = str.slice(0, i);

        if(html) target.html(e);
        else target.text(e);

        var tag = false;
        var char = e.slice(-1);
        if(char === '<' || char === '/' || char === '&') tag = true;
        if(char === '>' || char === ';') tag = true;
        if(tag) return erase(target, i-1, delay, next, html);

        if(i > 0) {
            setTimeout(function() {
                erase(target, i-1, delay, next, html);
            }, delay);
        }
        else {
            if(next != null) {
                next();
            }
        }
    }

    $.fn.typewriter = function(settings) {
        opts = $.extend({
            text : [""],
            type_delay : 50,
            erase_delay : 50,
            wait : 1000,
            breakline : false,
            loop : true,
            html : true,
            eraselast : false,
            onEnd : null,
        }, settings);

        return this.each(function () {
            if(opts.breakline) {
                var link = '';
                for(i = 0; i < opts.text.length; i++) {
                    link += opts.text[i]+"<br/>";
                }
                type($(this), link, 0, opts.type_delay, opts.onEnd, opts.html);
            }
            else {
                function loop(target, i) {
                    if(i > opts.text.length-1 && opts.loop) i = 0;
                    if(i == opts.text.length-1 && !opts.loop && opts.onEnd != null) opts.onEnd();

                    type(target, opts.text[i], 0, opts.type_delay, function () {
                        if(!opts.eraselast && i == opts.text.length-1) return;
                        setTimeout(function() {
                            erase(target, opts.text[i].length, opts.erase_delay, 
                                function () {
                                    loop(target, i+1);
                                }, opts.html);
                            }, opts.wait);
                    }, opts.html);
                }
                loop($(this), 0);
            }
        });
    }
}(jQuery));