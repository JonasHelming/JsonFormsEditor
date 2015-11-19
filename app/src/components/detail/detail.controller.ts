/// <reference path="../../../../typings/angular-ui-router/angular-ui-router.d.ts" />

module app.detail {

    class DetailController {
        public data : any;
        public uiSchema : any;
        public schema : any;

        static $inject = ['$stateParams', 'TreeService'];

        constructor($stateParams : any, treeElementService : app.tree.TreeService){
            var id = $stateParams['id'];

            this.data = treeElementService.getElement(id);

            this.schema = {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "number"
                    },
                    "title": {
                        "type": "string"
                    }
                }
            };

            this.uiSchema = {
                "type": "VerticalLayout",
                "elements": [
                    {
                        "type": "Control",
                        "scope": {
                            "$ref": "#/properties/id"
                        }
                    },
                    {
                        "type": "Control",
                        "scope": {
                            "$ref": "#/properties/title"
                        }
                    }
                ]
            }
        }
    }

    angular.module('app.detail').controller('DetailController', DetailController);
}
