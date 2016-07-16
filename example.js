angular.module('GooglePickerExampleApp', ['summernote'])
    
    .controller('OptCtrl', function($scope) {
        
        $scope.options = {
            toolbar: [
                ['insert', ['googleImgPicker', 'googleFilePicker']]
            ],
            googleFilePicker :{
                features : ["MULTISELECT_ENABLED"],
                views : ['DocsView().setIncludeFolders(true).setParent("root")']
            },
            googleImgPicker:{
                features : ["MULTISELECT_ENABLED"],
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