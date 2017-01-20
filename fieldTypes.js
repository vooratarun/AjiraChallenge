
/*
*   This file is to define Different form elements. Need to be changed in future.
* */

var textBox  = {
    "fieldType" : "textBox",
    "displayName" : "",
    "description" : "",
    "maxLength" : "",
    "dataType" : "",
    "cssStyle": "",
    "readonly" : "",
    "required" : "",
    "hintText" : ""

};

var RadioGroup = {
    "fieldType" : "radioGroup",
    "displayName" : "",
    "description" : "",
    "valueList" : "",
    "defaultValue" : "",
    "required" : "",
    "cssStyle" : ""
};

var checkGroup = {
    "fieldType" : "checkGroup",
    "displayName" : "",
    "description" : "",
    "valueList" : "",
    "cssStyle" : "",
    "defaultValue" : "",
    "maxSelect" : "",
    "readonly" : "",
    "required" : ""
};

module.exports = {
    textBox:textBox,
    RadioGroup:RadioGroup,
    checkGroup:checkGroup
};