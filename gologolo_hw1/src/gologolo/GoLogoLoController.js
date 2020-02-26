import AppsterController from '../appster/AppsterController.js'
import GoLogoLoLogo from '../gologolo/GoLogoLoLogo.js'
export default class GoLogoLoController
 extends AppsterController {
    constructor() {
        super();
    }

    processEditText() {
        this.model.updateText();
    }
    changeTextInputModalWords(){
        let modalHeader=document.getElementById("appster_text_input_modal_section");
        modalHeader.firstChild.firstChild.innerHTML="Enter the name for your Logo";
        let modalFrame=document.getElementById("appster_text_input_modal_frame");
        modalFrame.lastChild.innerHTML="Creating new Logo";
    }
    addErrorMessage(){
        let modalFrame=document.getElementById("appster_text_input_modal_frame");
        if(document.getElementById("error_message")){
            let errorMessage=document.getElementById("error_message");
            //errorMessage.style.color="blue";
            if (errorMessage.style.color=="red"){
                errorMessage.style.color="blue";
            }
            else{
                errorMessage.style.color="red";
            }
        }
        else{
            let errorMessage=document.createElement("p");
            errorMessage.setAttribute("id","error_message");
            errorMessage.innerHTML="invalid name";
            modalFrame.appendChild(errorMessage);
        }
    }
    createNewWork(workName){
        let tempWork=new GoLogoLoLogo(workName);
        this.model.appendWork(tempWork);
    }
}