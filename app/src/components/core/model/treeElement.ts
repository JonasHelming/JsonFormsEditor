module app.core.model {

    export class TreeElement {

        private type:string;
        public label:string;
        private scope:string;
        public elements:TreeElement[] = [];
        public metaData:any = {};

        public getType():string {
            return this.type;
        }

        public setType(newType:string):void {
            this.type = newType;
        }

        public getLabel():string {
            return this.label;
        }

        public setLabel(newLabel:string):void {
            this.label = newLabel;
        }

        public getScope():string {
            return this.scope;
        }

        public setScope(newScope:string):void {
            this.scope = newScope;
        }

        public initElements():void {
            this.elements = [];
        }

        public getElements():TreeElement[] {
            return this.elements;
        }

        public hasElements():boolean {
            return this.elements && this.elements.length > 0;
        }

        public addElement(element:TreeElement):void {
            this.elements.push(element);
        }

        public acceptsElement(type:string):boolean {
            if (!this.metaData.hasOwnProperty('acceptedElements')) {
                return false;
            }
            return this.metaData.acceptedElements.indexOf(type) >= 0;
        }

        public setAcceptedElements(acceptedElements:string[]):void {
            this.metaData['acceptedElements'] = acceptedElements;
        }

        public getAcceptedElements():string[] {
            return this.metaData['acceptedElements'];
        }

        public isDeletable():boolean {
            return true;
        }

        public hasLabel() : boolean {
            return !(this.type == 'HorizontalLayout' || this.type == 'VerticalLayout' || this.type == 'Categorization');

        }

        public clone():TreeElement{
            var result:TreeElement = new TreeElement();

            result.type = _.clone(this.type);
            result.label = _.clone(this.label);
            result.scope = _.clone(this.scope);
            result.elements = [];
            _.forEach(this.elements, (element:TreeElement) => {
                result.elements.push(element.clone());
            });
            result.metaData = _.clone(this.metaData);

            return result;
        }

        public toJSONString():string {
            var json:any = {};
            json.type = this.type;
            if (this.label && this.label.length > 0) {
                json.label = this.label;
            }
            if (this.scope && this.scope.length > 0) {
                json.scope = {};
                json.scope.$ref = "#/properties/" + this.scope;
            }
            if (this.elements && this.elements.length > 0) {
                json.elements = [];
                for (var i = 0; i < this.elements.length; i++) {
                    json.elements.push(JSON.parse(this.elements[i].toJSONString()));
                }
            }
            return JSON.stringify(json, (key, value) => {
                return value;
            }, 2);
        }
    }
}