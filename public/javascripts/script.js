document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);

function showForm(hideButton, displayForm, hidebutton2, hidebutton3) {
  const Button = document.getElementById(hideButton);
  const Form = document.getElementById(displayForm);
  // const button2 = document.getElementById(hidebutton2);
  // const button3 = document.getElementById(hidebutton3);
  Button.style = "display:none";
  Form.style = "";
  // button2.style = "display:none";
  // button3.style = "";
}
