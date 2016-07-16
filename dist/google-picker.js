/**
 * Created by Simone on 16/07/2016.
 */
(function ( $ ) {

    $.googlePicker = function(options) {

        // This is the easiest way to have default options.
        var settings = $.extend({
            origin: window.location.protocol + '//' + window.location.host,
            accessToken : null,
            expirationTime : null
        }, options );

        var actions ={
            onLoaded : function(){},
            onCancel : function(){},
            onPicked : function(){}
        };

        var accessTokenManager = (function(){
            var opts = {
                clientId : null,
                scopes : null,
                accessToken : null,
                expirationTime : null
            };
            var onDone = function () {};
            /**
             * Google API OAuth response
             */
            var handleAuthResult = function(result) {
                if (result && !result.error) {
                    //access token
                    opts.accessToken = result.access_token;
                    //storing new access token in local session
                    onDone(opts.accessToken);
                }
            };
            var onApiAuthLoad = function() {
                var authToken = gapi.auth.getToken();

                if (authToken) {
                    handleAuthResult(authToken);
                } else {
                    gapi.auth.authorize({
                        'client_id' : opts.clientId,
                        'scope'     : opts.scopes,
                        'immediate' : false
                    }, handleAuthResult);
                }
            };

            return{
                get : function(options, done){
                    if(done)
                        onDone = done;
                    opts = $.extend(opts, options);
                    gapi.load('auth', { 'callback': onApiAuthLoad });
                }
            }
        })();

        /**
         * Callback invoked when interacting with the Picker
         * data: Object returned by the API
         */
        var pickerResponse = function(data) {
            gapi.client.load('drive', 'v2', function () {
                if (data.action == google.picker.Action.LOADED && actions.onLoaded) {
                    actions.onLoaded();
                }
                if (data.action == google.picker.Action.CANCEL && actions.onCancel) {
                    actions.onCancel();
                }
                if (data.action == google.picker.Action.PICKED && actions.onPicked) {
                    actions.onPicked({docs: data.docs});
                }
            });
        };

        /**
         * Load required modules
         */
        var loadPicker = function(a) {
            actions = $.extend(actions, a);
            accessTokenManager.get(settings, function(accessToken){
                var picker = new google.picker.PickerBuilder()
                    .setLocale(settings.locale)
                    .setOAuthToken(accessToken)
                    .setCallback(pickerResponse)
                    .setOrigin(settings.origin);

                if (settings.features.length > 0) {
                    settings.features.forEach(function (feature) {
                        picker.enableFeature(google.picker.Feature[feature]);
                    });
                }

                if (settings.views.length > 0) {
                    settings.views.forEach(function (view) {
                        view = eval('new google.picker.' + view);
                        picker.addView(view);
                    });
                }

                picker.build().setVisible(true);

                gapi.load('auth');
                gapi.load('picker');
            });
            gapi.load('picker');
        };

        return{
            load : function(actions){
                loadPicker(actions)
            }
        }
    };
}( jQuery ));