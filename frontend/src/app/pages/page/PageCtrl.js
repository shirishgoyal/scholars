(function () {
    'use strict';

    angular.module('BlurAdmin.pages.page')
        .controller('PageCtrl', PageCtrl);

    /** @ngInject */
    function PageCtrl($scope, $state, $log, Auth) {
        var vm = this;

        vm.account = {};
        vm.submitted = false;
        vm.errors = {};

        vm.has_error = has_error;

        vm.papers = [{
            name:'Mastering the Game of Go with Deep Neural Networks and Tree Search',
            description:'David Silver, at. al. 2016. Mastering the Game of Go with Deep Neural Networks and Tree Search. Nature 529, 484–489 (28 January 2016) doi:10.1038/nature16961',
            published_on:'December 05, 2016',

            pdf:'http://airesearch.com/wp-content/uploads/2016/01/deepmind-mastering-go.pdf',
            image: 'http://curiousmindbox.com/wp-content/uploads/2016/05/alphago1.png',
            video: 'https://youtu.be/F2uBxrnfgVA',

            pdf_links:[{
                name:'Nature',
                url:'http://www.nature.com/nature/journal/v529/n7587/full/nature16961.html'
            },{
                name:'Public link',
                url:'http://airesearch.com/wp-content/uploads/2016/01/deepmind-mastering-go.pdf'
            }],

            dri:['Anshu Aviral', 'Venkata Karthik Gullapalli'],
            scripting:['Anshu Aviral', 'Venkata Karthik Gullapalli', 'Gagana B', 'Tejas Sarma', 'Niresh Jain', 'Lenny Khazan', 'Rashida Taskin', 'Tzu Kit Chan'],
            audio:['Niresh Jain', 'Venkata Karthik Gullapalli'],

            video_links:[
                {
                    name:'Hindi',
                    url:'https://youtu.be/MXVyITzDzu0'
                },
                {
                    name:'Catalan',
                    url:'https://youtu.be/q4hcXtUxUxA'
                },
                {
                    name:'Spanish',
                    url:'https://youtu.be/s6S55XSRVFM'
                }
            ]

        }];

        function has_error(field_name) {
            var field = $scope.form[field_name];
            return (field.$touched || vm.submitted) && field.$invalid;
        }


    }

})();
