import {GoLogoLoGUIClass, GoLogoLoGUIId, GoLogoLoText, GoLogoLoAttr,GoLogoLoSetters} from './GoLogoLoConstants.js'
import {AppsterHTML, AppsterSymbols, AppsterGUIId, AppsterGUIClass} from '../appster/AppsterConstants.js'
import AppsterView from '../appster/AppsterView.js'
//https://github.com/ThomasJarrett/CSE316_HW1
export default class GoLogoLoView extends AppsterView {
    constructor() {
        super();
    }

    fillAppWorkspace(workspace) {
        let colorPickerAttributes = [];
        colorPickerAttributes[AppsterHTML.TYPE] = AppsterHTML.COLOR;
        let rangeAttributes = [];
        rangeAttributes[AppsterHTML.TYPE] = AppsterHTML.RANGE;

        // FIRST MAKE THE TOOLBAR
        let toolbar = this.buildElement(AppsterHTML.DIV, GoLogoLoGUIId.GOLOGOLO_TOOLBAR);
        let editTextButton = this.buildElement2(AppsterHTML.BUTTON, GoLogoLoGUIId.GOLOGOLO_EDIT_TEXT_BUTTON, [], [], GoLogoLoText.GOLOGOLO_EDIT_TEXT_TEXT);
        editTextButton.innerHTML = AppsterSymbols.EDIT;
        let fontSizeSlider = this.buildElement2(AppsterHTML.INPUT, GoLogoLoGUIId.GOLOGOLO_FONT_SIZE_SLIDER, [], rangeAttributes);
        let textColorPicker = this.buildElement2(AppsterHTML.INPUT, GoLogoLoGUIId.GOLOGOLO_TEXT_COLOR_PICKER, [], colorPickerAttributes);
        let backgroundColorPicker = this.buildElement2(AppsterHTML.INPUT, GoLogoLoGUIId.GOLOGOLO_BACKGROUND_COLOR_PICKER, [], colorPickerAttributes);
        let borderColorPicker = this.buildElement2(AppsterHTML.INPUT, GoLogoLoGUIId.GOLOGOLO_BORDER_COLOR_PICKER, [], colorPickerAttributes);
        let borderRadiusSlider = this.buildElement2(AppsterHTML.INPUT, GoLogoLoGUIId.GOLOGOLO_BORDER_RADIUS_SLIDER, [], rangeAttributes);
        let borderThicknessSlider = this.buildElement2(AppsterHTML.INPUT, GoLogoLoGUIId.GOLOGOLO_BORDER_THICKNESS_SLIDER, [], rangeAttributes);
        let paddingSlider = this.buildElement2(AppsterHTML.INPUT, GoLogoLoGUIId.GOLOGOLO_PADDING_SLIDER, [], rangeAttributes);
        let marginSlider = this.buildElement2(AppsterHTML.INPUT, GoLogoLoGUIId.GOLOGOLO_MARGIN_SLIDER, [], rangeAttributes);
        let textDiv = this.buildElement(AppsterHTML.DIV, GoLogoLoGUIId.GOLOGOLO_TEXT);
        let promptClass = [GoLogoLoGUIClass.GOLOGOLO_CONTROL_PROMPT];

        
        this.buildTextButton(editTextButton);
        

        toolbar.appendChild(editTextButton);
        toolbar.appendChild(this.buildElement(AppsterHTML.BR));
        toolbar.appendChild(this.buildElement(AppsterHTML.SPAN, "", promptClass, [], GoLogoLoText.GOLOGOLO_FONT_SIZE_TEXT));
        toolbar.appendChild(fontSizeSlider);
        toolbar.appendChild(this.buildElement(AppsterHTML.BR));
        toolbar.appendChild(this.buildElement(AppsterHTML.SPAN, "", promptClass, [], GoLogoLoText.GOLOGOLO_TEXT_COLOR_TEXT));
        toolbar.appendChild(textColorPicker);
        toolbar.appendChild(this.buildElement(AppsterHTML.BR));
        toolbar.appendChild(this.buildElement(AppsterHTML.SPAN, "", promptClass, [], GoLogoLoText.GOLOGOLO_BACKGROUND_COLOR_TEXT));
        toolbar.appendChild(backgroundColorPicker);
        toolbar.appendChild(this.buildElement(AppsterHTML.BR));
        toolbar.appendChild(this.buildElement(AppsterHTML.SPAN, "", promptClass, [], GoLogoLoText.GOLOGOLO_BORDER_COLOR_TEXT));
        toolbar.appendChild(borderColorPicker);
        toolbar.appendChild(this.buildElement(AppsterHTML.BR));
        toolbar.appendChild(this.buildElement(AppsterHTML.SPAN, "", promptClass, [], GoLogoLoText.GOLOGOLO_BORDER_RADIUS_TEXT));
        toolbar.appendChild(borderRadiusSlider);
        toolbar.appendChild(this.buildElement(AppsterHTML.BR));
        toolbar.appendChild(this.buildElement(AppsterHTML.SPAN, "", promptClass, [], GoLogoLoText.GOLOGOLO_BORDER_THICKNESS_TEXT));
        toolbar.appendChild(borderThicknessSlider);
        toolbar.appendChild(this.buildElement(AppsterHTML.BR));
        toolbar.appendChild(this.buildElement(AppsterHTML.SPAN, "", promptClass, [], GoLogoLoText.GOLOGOLO_PADDING_TEXT));
        toolbar.appendChild(paddingSlider);
        toolbar.appendChild(this.buildElement(AppsterHTML.BR));
        toolbar.appendChild(this.buildElement(AppsterHTML.SPAN, "", promptClass, [], GoLogoLoText.GOLOGOLO_MARGIN_TEXT));
        toolbar.appendChild(marginSlider);

        workspace.appendChild(toolbar);
        workspace.appendChild(textDiv);

        //this.buildTrashCan();
        return workspace;
    }

    loadWork(work) {
        this.currentWork=work;
        
        let textDiv = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        textDiv.innerHTML = work.getText();
        let fontSizeSlider = document.getElementById(GoLogoLoGUIId.GOLOGOLO_FONT_SIZE_SLIDER);
        fontSizeSlider.value = work.getFontSize();
        let textColorPicker = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT_COLOR_PICKER);
        textColorPicker.value = work.getTextColor();
        let backgroundColorPicker = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BACKGROUND_COLOR_PICKER);
        backgroundColorPicker.value = work.getBackgroundColor();
        let borderColorPicker = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_COLOR_PICKER);
        borderColorPicker.value = work.getBorderColor();
        let borderRadiusSlider = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_RADIUS_SLIDER);
        borderRadiusSlider.value = work.getBorderRadius();
        let borderThicknessSlider = document.getElementById(GoLogoLoGUIId.GOLOGOLO_BORDER_THICKNESS_SLIDER);
        borderThicknessSlider.value = work.getBorderThickness();
        let paddingSlider = document.getElementById(GoLogoLoGUIId.GOLOGOLO_PADDING_SLIDER);
        paddingSlider.value = work.getPadding();
        let marginSlider = document.getElementById(GoLogoLoGUIId.GOLOGOLO_MARGIN_SLIDER);
        marginSlider.value = work.getMargin();
        this.loadWorkStyle(work);
    }

    loadWorkStyle(work) {
        let textDiv = document.getElementById(GoLogoLoGUIId.GOLOGOLO_TEXT);
        textDiv.style.color = work.getTextColor();
        textDiv.style.backgroundColor = work.getBackgroundColor();
        textDiv.style.borderColor = work.getBorderColor();
        textDiv.style.borderRadius = work.getBorderRadius()+"px";
        textDiv.style.borderWidth = work.getBorderThickness()+"px";
        textDiv.style.padding=work.getPadding()+"px";
        textDiv.style.margin=work.getMargin()+"px";
        textDiv.style.fontSize=work.getFontSize()+"px";
        
        textDiv.style.borderStyle="solid";
    }

    addListItem(initText) {
        let textList = document.getElementById(RTA_GUIId.RTA_TEXT_LIST);
        let listItemCount = textList.childNodes.length;
        let newListItem = this.buildElement(AppsterHTML.LI, RTA_GUIId.RTA_TEXT_LIST_ITEM 
            + listItemCount);
        newListItem.innerHTML = initText;
        textList.appendChild(newListItem);
    }

    appendLetter(listItemId, letterToAppend) {
        let textList = document.getElementById(listItemId);
        textList.innerHTML += textList.innerHTML + letterToAppend;
    }

    buildElement2(elementType, idValue, classValues, attributesMap, textId, dataAnimation){
        let elem=super.buildElement(elementType, idValue, classValues, attributesMap, textId, dataAnimation);
        var it=this;
        if (elementType==AppsterHTML.INPUT){
            elem.addEventListener(elementType, ()=>{
                let logo=document.getElementById("gologolo_text");
                let ob=document.getElementById(idValue);
                let value=ob.value;
                if(idValue.includes("slider")){
                    value=value+"px";
                    if(idValue==GoLogoLoGUIId.GOLOGOLO_FONT_SIZE_SLIDER && value=="0px"){
                        value="1px";
                    }
                }
                logo.style[GoLogoLoAttr[idValue]]=value;
                
                it.currentWork[GoLogoLoSetters[idValue]]=ob.value;
            });
        }
        return elem;
    }



    buildTextButton(elem){
        elem.innerHTML="Edit Text";
        let it=this;
        this.resetButtonsForTextInputModal();
        elem.addEventListener("click",()=>{
            it.resetButtonsForTextInputModal();
            let temp=document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL);
            it.displayElement(temp);
            let textInput=document.getElementById("appster_text_input_modal_textfield");
            textInput.value=it.currentWork.getText();
            it.changeTextInputModalWords();
            let enterButton=document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_ENTER_BUTTON);
            enterButton.addEventListener("click",()=>{
                let logo=document.getElementById("gologolo_text");
                let value=textInput.value;
                logo.innerHTML=value;
                it.currentWork[GoLogoLoSetters[GoLogoLoGUIId.GOLOGOLO_EDIT_TEXT_BAR]]=value;
                it.hideElement(temp);
            });
            let cancleButton=document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_CANCEL_BUTTON);
            cancleButton.addEventListener("click",()=>{
                it.hideElement(temp);
            })
        });
    }

    resetButtonsForTextInputModal(){
        this.resetElement(document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_CANCEL_BUTTON));
        this.resetElement(document.getElementById(AppsterGUIId.APPSTER_TEXT_INPUT_MODAL_ENTER_BUTTON));
    }
    changeTextInputModalWords(){
        let modalHeader=document.getElementById("appster_text_input_modal_section");
        modalHeader.firstChild.firstChild.innerHTML="Enter the text for your Logo";
        let modalFrame=document.getElementById("appster_text_input_modal_frame");
        modalFrame.lastChild.innerHTML="Changing the Text";
    }
    resetElement(element){
        if(element){
            var newElem=element.cloneNode(true);
            element.parentNode.replaceChild(newElem, element);
        }
    }

    buildTrashCan(){
        let trash=document.getElementById(AppsterGUIId.APPSTER_EDIT_TRASH);
        let it=this;
        if(trash){
            trash.addEventListener("click",()=>{
                let temp=document.getElementById(AppsterGUIId.APPSTER_YES_NO_MODAL);
                it.displayElement(temp);
            })
        }
    }

    

         
    


}