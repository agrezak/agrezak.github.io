var VALIDATION = VALIDATION || {};

VALIDATION = {

    init: function() {
      this._findElements();
      this._bindEvents();
    },

    _o : {
      required : 'input[data-validation="required"]',
      currentValue : '',
      currentRule : '',
      currentInput : [],
      submit : '#submit-form',
      filledCorrectly : null
    },

    _validationBooleans : {
      name : null,
      phone : null,
      email : null
    },

    _findElements: function() {

    let required = document.querySelectorAll(this._o.required),
        submit = document.querySelector(this._o.submit);

     this._o.required = required;
     this._o.submit = submit;

    },

    _bindEvents: function() {

        this._o.required.forEach((el, i) => {
            this._o.required[i].addEventListener('change', this.inputChange)
        });

    //   this._o.required.addEventListener('change', (event) => {
      //
    //     this._o.currentInput = event.target;
    //     this._o.currentValue = event.target.value;
    //     this._o.currentRule = $(this).data('validation-rule');
      //
    //     this._isEmpty();
    //     this._checkValidationRule();
    //     this._checkIfFilled();
      //
    //     if(this._o.filledCorrectly === true) {
    //       this._o.submit.attr('disabled', false);
    //     } else {
    //       this._o.submit.attr('disabled', true);
    //     }
      //
    //   });

    },

    inputChange: (event) => {

        console.log(event.target);
        console.log(event.target.value);

        // this._o.currentInput = event.target;
        // this._o.currentValue = event.target.value;

    },

    _isEmpty: function() {

      var value = this._o.currentValue.replace(/ /g,'');

      value.length === 0 ? $(this._o.currentInput).siblings('span').text('This field is required') : $(this._o.currentInput).siblings('span').text('')

    },

    _checkValidationRule: function() {

      var value = this._o.currentRule;

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

      _name: function() {

        var reg = /^[A-Za-z][a-zżźćńółęąś\]\s\-]+$/;

        if(!reg.test(this._o.currentValue)) {
          this._applyErrors();
          this._validationBooleans.name = false;
        } else {
          this._removeErrors();
          this._validationBooleans.name = true;
        }

      },

      _phone: function() {

        var reg = /^[0-9]+$/;
        if(!reg.test(this._o.currentValue)) {
          this._applyErrors();
          this._validationBooleans.phone = false;
        } else {
          this._removeErrors();
          this._validationBooleans.phone = true;
        }

      },

      _email: function() {

        var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!reg.test(this._o.currentValue)) {
          this._applyErrors();
          this._validationBooleans.email = false;
        } else {
          this._removeErrors();
          this._validationBooleans.email = true;
        }

      },

      _removeErrors: function() {
        $(this._o.currentInput).addClass('validation-ok');
        $(this._o.currentInput).removeClass('validation-error');
      },

      _applyErrors: function() {
        $(this._o.currentInput).addClass('validation-error');
        $(this._o.currentInput).removeClass('validation-ok ')
      },

      // Check if inputs are filled correctly
      _checkIfFilled: function() {

        var keys = Object.keys(this._validationBooleans);

        for (var i = 0; i < keys.length; i++) {
          var val = this._validationBooleans[keys[i]];
          if(val != true) {
            this._o.filledCorrectly = false;
            break;
          } else {
            this._o.filledCorrectly = true;
          }
        };
      }


}


$(document).ready(function() {
  VALIDATION.init();
});
