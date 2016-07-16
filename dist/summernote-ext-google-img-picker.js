(function (factory) {
    /* global define */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(window.jQuery);
    }
}(function ($) {
    
    // Extends plugins for adding hello.
    //  - plugin is external module for customizing.
    $.extend($.summernote.plugins, {
        /**
         * @param {Object} context - context object has status of editor.
         */
        'googleImgPicker': function (context) {
            var self = this;
            var options = $.extend({}, context.options.googlePicker, context.options.googleImgPicker);
            var $googlePicker = $.googlePicker(options);
            // ui has renders to build ui elements.
            //  - you can create a button with `ui.button`
            var ui = $.summernote.ui;
           
            // add hello button
            context.memo('button.googleImgPicker', function () {
                // create button
                var button = ui.button({
                    contents: '<i class="fa fa-child glyphicon glyphicon-picture"/>',
                    tooltip: 'Google Image Picker',
                    click: function () {
                        $googlePicker.load({
                            onLoaded : function(){
                                console.log("Google Picker Loaded");
                                context.invoke('editor.pasteHTML', '<style>' +
                                    '.google-img-picker{width: 300px;}' +
                                    '</style>');
                            },
                            onPicked : function(docs){
                                console.log(docs);
                                if(!docs.docs)
                                    return;
                                docs.docs.forEach(function(doc){
                                    context.invoke('editor.pasteHTML', '<img class="google-img-picker" src="http://drive.google.com/uc?export=view&id='+doc.id+'">');
                                });
                            }
                        });
                    }
                });
                // create jQuery object from button instance.
                return button.render();
            });


            // This method will be called when editor is initialized by $('..').summernote();
            // You can create elements for plugin
            this.initialize = function () {};

            // This methods will be called when editor is destroyed by $('..').summernote('destroy');
            // You should remove elements on `initialize`.
            this.destroy = function () {};
        }
    });
}));