module app.dialogs {

    import IDialogService = angular.material.IDialogService;

    export abstract class AbstractWizard extends AbstractDialog {

        private steps:AbstractWizardStep[] = [];
        private stepNumber:number = 0;

        constructor($mdDialog:IDialogService) {
            super($mdDialog);
        }

        addSteps(steps:AbstractWizardStep[]):void {
            _.forEach(steps, (step:AbstractWizardStep) => {
                this.steps.push(step);
            });
        }

        getSteps():AbstractWizardStep[] {
            return this.steps;
        }

        currentStep():AbstractWizardStep {
            return this.steps[this.stepNumber];
        }

        goTo(step:AbstractWizardStep):void {
            this.stepNumber = this.steps.indexOf(step);

            if(this.shallReset() && !this.hasPrevious()){
                this.steps = [_.head(this.steps)];
            }
        }

        isLastStep():boolean {
            return this.stepNumber === this.steps.length - 1;
        }

        submit():void {
            this.currentStep().submit().then(() => {
                this.hideDialog();
            });
        }

        hasNext():boolean {
            return this.stepNumber < this.steps.length - 1;
        }

        next():void {
            if (this.hasNext()) {
                this.stepNumber++;
            }
        }

        hasPrevious():boolean {
            return this.stepNumber > 0;
        }

        previous():void {
            if (this.hasPrevious()) {
                this.stepNumber--;

                // if we are on the first step, and resetting is configured, remove all steps except the first
                if(this.shallReset() && !this.hasPrevious()){
                    this.steps = [_.head(this.steps)];
                }
            }
        }

        abstract shallReset():boolean;
    }
}