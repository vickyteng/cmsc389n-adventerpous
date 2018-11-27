
/* Notice that we are setting the function to call when submit is selected */
window.onsubmit=validateForm;

/* This function must return true or false */
/* If true the data will be sent to the server */
/* If false the data will not be sent to the server */
function validateForm() {
	/* Retrieving the values */

    var name = document.getElementById("event").value;
    var clubName = document.getElementById("club").value;
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
    var location = document.getElementById("location").value;
    
	/* Validating numeric values */    
	var invalidMessages = "";
    if (name == "") {
        invalidMessages += "Name cannot be blank\n";
    }
    if (date == "") {
        invalidMessages += "Date cannot be blank\n";
    }
    if (time == "") {
        invalidMessages += "Time cannot be blank\n";
    }
    if (location == "") {
        invalidMessages += "Location cannot be blank\n";
    }

    
    if (invalidMessages !== "") {
        alert(invalidMessages);
        return false;
    } else {
        var valuesProvided = "Do you want to submit the following event?\n";
        valuesProvided += "Name: " + name + "\n";
        valuesProvided += "Date: " + date + "\n";
        valuesProvided += "Time: " + time + "\n";
         valuesProvided += "Location: " + location+ "\n";
        /* We could write the following as return window.confirm(valuesProvided) */
        if (window.confirm(valuesProvided))
            return true;
        else    
            return false;
    }
}


function isAlphaNumeric(str) {
  var code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
};