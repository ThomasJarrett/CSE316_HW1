import {AppsterCallback, AppsterGUIId, AppsterHTML, AppsterGUIClass} from './AppsterConstants.js'
import AppWork from '../appster/AppWork.js'
export default class AppsterController {
    constructor() {
        this.model = null;
    }

    setModel(initModel) {
        this.model = initModel;
    }

    /**
     * This function helps the constructor setup the event handlers for all controls.
     * 
     * @param {AppsterGUIId} id Unique identifier for the HTML control on which to
     * listen for events.
     * @param {AppsterHTML} eventName The type of control for which to respond.
     * @param {AppsterCallback} callback The callback function to be executed when
     * the event occurs.
     */
    registerEventHandler(id, eventName, callback) {
        // GET THE CONTROL IN THE GUI WITH THE CORRESPONDING id
        let control = document.getElementById(id);

        // AND SETUP THE CALLBACK FOR THE SPECIFIED EVENT TYPE
        if (control)
            control.addEventListener(eventName, callback);
    }

    registerAppsterEventHandlers() {
        // FIRST THE NEW WORK BUTTON ON THE HOME SCREEN
        this.registerEventHandler(AppsterGUIId.APPSTER_HOME_NEW_WORK_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CREATE_NEW_WORK]);

        // THEN THE CONTROLS ON THE EDIT SCREEN
        this.registerEventHandler(AppsterGUIId.APPSTER_EDIT_HOME_LINK, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_GO_HOME]);
        this.registerEventHandler(AppsterGUIId.APPSTER_EDIT_TRASH, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_DELETE_WORK]);

        // AND THE MODAL BUTTONS
        this.registerEventHandler(AppsterGUIId.DIALOG_YES_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CONFIRM_DELETE_WORK]);
        this.registerEventHandler(AppsterGUIId.DIALOG_NO_BUTTON, AppsterHTML.CLICK, this[AppsterCallback.APPSTER_PROCESS_CANCEL_DELETE_WORK]);
    }

    /**
    * This method sets up a callback method for an element, registering the
    * elementCallbackName (e.g. click) function for the element control in the DOM, specifying
    * callbackFunctionName as the method to be called when that event occurs. The
    * args array is used to pass needed data to the callback.
    * 
    * @param {Element} element 
    * @param {String} elementCallbackName 
    * @param {String} callbackFunctionName 
    * @param {String[]} args 
    */
    setupCallback(element, elementCallbackName, callbackFunctionName, args) {
        let functionCallText = "this." + callbackFunctionName + "(";
        for (let i = 0; i < args.length; i++) {
            functionCallText += "'" + args[i] + "'";
            if (i < (args.length - 1)) {
                functionCallText += ", ";
            }
        }
        functionCallText += ")";
        element.setAttribute(elementCallbackName, functionCallText);
        return functionCallText;
    }

    registerRecentWorkEventHandler(element) {
        element.addEventListener(AppsterHTML.CLICK, this.processEditWork);
    }

    /**
     * This function responds to when the user clicks on the
     * todo logo to go back to the home screen.
     */
    processGoHome = () => {
        console.log("processGoHome");
        this.model.goHome();
    }

    processGoEdit(workToEdit) {
        console.log("processGoEdit");
        this.model.goEdit(workToEdit);
    }

    /**
     * This function is called when the user requests to create
     * new work.
     */
    processCreateNewWork=()=> {
        console.log("processCreateNewWork");

        // PROMPT FOR THE NAME OF THE NEW LIST
        this.buildNamePrompt();
        // MAKE A BRAND NEW LIST
        //this.model.goList();
    }

    /**
     * This function responds to when the user clicks on a link
     * for recent work on the home screen.
     * 
     * @param {String} workName The name of the work to load into
     * the controls on the edit screen.
     */
    processEditWork = (event) => {
        console.log("processEditWork");

        // GET THE WORK THAT THE USER WANTS TO LOAD
        let clickedElement = event.target;
        let workName = clickedElement.workId;
        console.log(workName + " clicked");

        // START EDITING THE SELECTED WORK
        this.model.editWork(workName);
    }

    /**
     * This function responds to when the user clicks the No
     * button in the popup dialog after having requested to delete
     * the loaded work.
     */
    processCancelDeleteWork() {
        // JUST HIDE THE DIALOG

    }

    /**
     * This function responds to when the user changes the
     * name of the list via the textfield.
     */
    processChangeName() {
        let nameTextField = document.getElementById(TodoGUIId.LIST_NAME_TEXTFIELD);
        let newName = nameTextField.value;
        let listBeingEdited = window.todo.model.listToEdit;
        window.todo.model.updateListName(listBeingEdited, newName);
    }

    /**
     * This function responds to when the user clicks the Yes
     * button in the popup dialog after having requested to delete
     * the loaded work.
     */
    processConfirmDeleteWork() {
        // DELETE THE WORK
        this.model.removeWork(this.model.getWorkToEdit());

        // GO BACK TO THE HOME SCREEN
        this.model.goHome();
    }

    /**
     * This function responds to when the user clicks the trash
     * button, i.e. the delete button, in order to delete the
     * list being edited.
     */
    processDeleteWork() {
        // VERIFY VIA A DIALOG BOX
        window.todo.model.view.showDialog();
    }

    /**
     * verifies that a name is valid
     * @param {String} str 
     */
    validName(str){
        if(str.length>0){
            for (let i = 0; i < this.model.recentWork.length; i++) {
                let testWork = this.model.recentWork[i];
                if (testWork.getName() === str)
                    return false
            }
            return true;
        }
        return false;
    }

    /**
     * calls the text input modal to get a string
     */
    buildNamePrompt(elem){
        //elem.innerHTML="Edit Text";
        let it=this;
        this.changeTextInputModalWords();
        let temp=document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL);
        it.displayElement(temp);
        let textInput=document.getElementById("appster_text_input_modal_textfield");
        textInput.value="";
        
        let enterButton=document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_ENTER_BUTTON);
        this.resetElement(enterButton);
        enterButton=document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_ENTER_BUTTON);
        
        enterButton.remove
        enterButton.addEventListener("click",()=>{
            let name=textInput.value;
            if(this.validName(name)){
                console.log("valid");
                it.removeErrorMessage();
                it.hideElement(temp);
                it.createNewWork(name);
            }
            else{
                it.addErrorMessage();
                
            }
            
        });
        this.resetElement(document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_CANCEL_BUTTON));
        let cancleButton=document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_CANCEL_BUTTON);

        cancleButton.addEventListener("click",()=>{
                it.removeErrorMessage();
                it.hideElement(temp);
                
        })
        
    }

    displayElement(element) {
        element.classList.add(AppsterGUIClass.IS_VISIBLE);  
    }
    hideElement(element){
        
        element.classList.remove(AppsterGUIClass.IS_VISIBLE);
    }
    //define in child class
    changeTextInputModalWords(){
        
    }
    //define in child class
    addErrorMessage(){
        //error message id is error_message
    }
    removeErrorMessage(){
        let temp=document.getElementById("error_message");
        //console.log(temp);
        if(temp){
            temp.parentNode.removeChild(temp);
            //this.removeErrorMessage();
            //console.log(temp);
        }
        temp=document.getElementById("error_message");
        console.log(temp);

    }
    /*
    * creates new work with name workName
    */
   createNewWork(workName){
       let tempWork=new AppWork(workName);
       this.model.appendWork(tempWork);
   }
   resetElement(element){
    if(element){
        var newElem=element.cloneNode(true);
        element.parentNode.replaceChild(newElem, element);
    }
   }
}