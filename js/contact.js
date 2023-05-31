var contForm = document.getElementById("contact-form");

// Add an event listener to the form's submit button
contForm.addEventListener("submit", function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the values of the form fields
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  // Check if any required fields are empty
  if (name === "" || email === "" || message === "") {
    alert("Please fill in all required fields.");
    valid = false;
  } else {
    valid = true;
    contForm.submit();
  }
});
