document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);

function showForm(hideButton, displayForm, hidebutton2, hidebutton3) {
  //Hides Button.  Changes the Form.Style to remove "none" and display form
  const Button = document.getElementById(hideButton);
  const Form = document.getElementById(displayForm);
  Button.style = "display:none";
  Form.style = "";
}

