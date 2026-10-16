// Show a message when a field is valid or needs fixing.
function checkField(form, field) {
  if (field.type === "password" && field.id === "confirm-password") {
    var password = document.getElementById("password");
    field.setCustomValidity(field.value && field.value !== password.value ? "Passwords must match." : "");
  }

  if (field.type === "radio" && !field.required) {
    return;
  }

  if (!field.required && field.type !== "radio") {
    field.classList.remove("is-valid");
    field.classList.remove("is-invalid");
    return;
  }

  var group = field.type === "radio" ? field.closest("fieldset") : field.parentElement;
  var invalidMessage = group.querySelector(".invalid-feedback");
  var validMessage = group.querySelector(".valid-feedback");

  if (field.checkValidity()) {
    field.classList.add("is-valid");
    field.classList.remove("is-invalid");
    if (validMessage) {
      validMessage.classList.add("d-block");
    }
    if (invalidMessage) {
      invalidMessage.classList.remove("d-block");
    }
  } else {
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
    if (field.validity.valueMissing) {
      invalidMessage.textContent = field.dataset.requiredMessage;
    } else {
      invalidMessage.textContent = field.dataset.invalidMessage;
    }
    invalidMessage.classList.add("d-block");
    if (validMessage) {
      validMessage.classList.remove("d-block");
    }
  }
}

var forms = document.querySelectorAll(".js-check-form");

for (var i = 0; i < forms.length; i++) {
  forms[i].addEventListener("submit", function (event) {
    event.preventDefault();
    var fields = this.querySelectorAll("input, select, textarea");

    for (var j = 0; j < fields.length; j++) {
      checkField(this, fields[j]);
    }

    if (this.checkValidity()) {
      document.getElementById(this.id + "-success").textContent = "Your form looks good!";
    } else {
      document.getElementById(this.id + "-success").textContent = "";
    }
  });

  forms[i].addEventListener("input", function (event) {
    if (event.target.matches("input, select, textarea")) {
      checkField(this, event.target);
      if (event.target.id === "password") {
        var confirmPassword = document.getElementById("confirm-password");
        if (confirmPassword && confirmPassword.value !== "") {
          checkField(this, confirmPassword);
        }
      }
    }
  });

  forms[i].addEventListener("change", function (event) {
    if (event.target.matches("input[type='radio'], select")) {
      checkField(this, event.target);
    }
  });

  forms[i].addEventListener("reset", function () {
    var fields = this.querySelectorAll("input, select, textarea");
    var messages = this.querySelectorAll(".invalid-feedback, .valid-feedback");
    var success = document.getElementById(this.id + "-success");

    for (var j = 0; j < fields.length; j++) {
      fields[j].classList.remove("is-valid");
      fields[j].classList.remove("is-invalid");
      fields[j].setCustomValidity("");
    }
    for (var k = 0; k < messages.length; k++) {
      messages[k].classList.remove("d-block");
    }
    success.textContent = "";
  });
}
