import AppsterController from '../appster/AppsterController.js'

export default class GoLogoLoController
 extends AppsterController {
    constructor() {
        super();
    }

    processEditText() {
        this.model.updateText();
    }
    /**
     * colorSrc is of border, or background, or text, ...
     * ignoring for now
     * right now changes the background color to red
     */
    changeColor(colorSrc,workArray, name){
        // finding the correct object
        name="My First Logo";
        //we need to get work array
        //jsonData.resentWork
        //appWork->jsonData
        //var appData = JSON.parse(jsonText);
        //
        fs = require('fs');
        var appData = JSON.parse(fs.readFileSync('GoLogoLoData.json').toString());
        workArray=appData.resentWork;
        for (let i = 0; i < workArray.length; i++) {
            let jsonWork = workArray[i];
            if (jsonWork.name === name) {
                jsonWork.background_color="#FF0000";
            }
        }
    }
}