angular.module('GooglePickerExampleApp', ['summernote'])
    
    .controller('OptCtrl', function($scope) {
        
        $scope.options = {
            toolbar: [
                ['insert', ['googleImgPicker', 'googleFilePicker']]
            ],
            googleFilePicker :{
                features : [],
                views : ['DocsView().setIncludeFolders(true).setParent("root")']
            },
            googleImgPicker:{
                features : [],
                views : ['DocsView(google.picker.ViewId.DOCS_IMAGES_AND_VIDEOS).setIncludeFolders(true).setParent("root")']
            },
            googlePicker:{
                apiKey : "xxxx",
                clientId : "xxxx.com",
                scopes   : ['https://www.googleapis.com/auth/drive'],
                locale   : 'en'
            }
        };
    });