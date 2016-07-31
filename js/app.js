simpleFormValidation = {

  init: function() {
    that = this;
    this._findElements();
    this._bindEvents();
  },

  // Object holding all required elements, value of current input and current validation rule (is there is any) of current input
  _elementsToValidate : {
    required : [],
    currentValue : '',
    currentRule : '',
    currentInput : [],
    submit : [],
    filledCorrectly : null
  },

  // Validation booleans
  _validationBooleans : {
    name : null,
    phone : null,
    email : null
  },

  // Search for objects with desired data attribute
  _findElements: function() {

    var required = $('*[data-validation="required"]'),
    submit = $('button');

    this._elementsToValidate.required = required;
    this._elementsToValidate.submit = submit;

  },

  // Add event listeners
  _bindEvents: function() {

    this._elementsToValidate.required.on('change', function(value) {

      that._elementsToValidate.currentInput = this;
      that._elementsToValidate.currentValue = this.value;
      that._elementsToValidate.currentRule = $(this).data('validation-rule');

      that._isEmpty();
      that._checkValidationRule();
      that._checkIfFilled();

      if(that._elementsToValidate.filledCorrectly === true) {
        that._elementsToValidate.submit.attr('disabled', false);
      } else {
        that._elementsToValidate.submit.attr('disabled', true);
      }

    });

  },

  // Check if input is empty
  _isEmpty: function() {

    var value = this._elementsToValidate.currentValue.replace(/ /g,'');

    value.length === 0 ? $(this._elementsToValidate.currentInput).siblings('span').text('This field is required') : $(this._elementsToValidate.currentInput).siblings('span').text('')

  },

  // Simple function that checks validation rule of current input
  _checkValidationRule: function() {

    var value = this._elementsToValidate.currentRule;

    switch(value) {
      case 'name':
      that._name();
      break;
      case 'phone':
      that._phone();
      break;
      case 'email':
      that._email();
      default:
      break
    }

  },

  // Name validation function
  _name: function() {

    var reg = /^[A-Za-z][a-zżźćńółęąś\]\s\-]+$/;

    if(!reg.test(this._elementsToValidate.currentValue)) {
      this._applyErrors();
      this._validationBooleans.name = false;
    } else {
      this._removeErrors();
      this._validationBooleans.name = true;
    }

  },

  // Phone validation function
  _phone: function() {

    var reg = /^[0-9]+$/;
    if(!reg.test(this._elementsToValidate.currentValue)) {
      this._applyErrors();
      this._validationBooleans.phone = false;
    } else {
      this._removeErrors();
      this._validationBooleans.phone = true;
    }

  },

  // Email validation function
  _email: function() {

    var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!reg.test(this._elementsToValidate.currentValue)) {
      this._applyErrors();
      this._validationBooleans.email = false;
    } else {
      this._removeErrors();
      this._validationBooleans.email = true;
    }

  },

  // Remove errors
  _removeErrors: function() {
    $(this._elementsToValidate.currentInput).addClass('validation-ok');
    $(this._elementsToValidate.currentInput).removeClass('validation-error');
  },

  // Apply errors
  _applyErrors: function() {
    $(this._elementsToValidate.currentInput).addClass('validation-error');
    $(this._elementsToValidate.currentInput).removeClass('validation-ok ')
  },

  // Check if inputs are filled correctly
  _checkIfFilled: function() {

    var keys = Object.keys(this._validationBooleans);

    for (var i = 0; i < keys.length; i++) {
      var val = this._validationBooleans[keys[i]];
      if(val != true) {
        this._elementsToValidate.filledCorrectly = false;
        break;
      } else {
        this._elementsToValidate.filledCorrectly = true;
      }
    };
  }

}

// Run the validation

$(document).ready(function() {
  simpleFormValidation.init();
});
