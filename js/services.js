(function initEmailJS() {
  emailjs.init({
    publicKey: "6jFqEDkCXjuouU7oT",
  });
})();

function submitForm(event) {
  event.preventDefault();
  try {
    // console.log("Submitting form using EmailJS...");

    const templateParams = {
      from_name: document.getElementById("name").value,
      from_email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    emailjs.send("service_u38rh2q", "template_hr3bq1t", templateParams).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
        alert("Email Sent!");
      },
      function (error) {
        console.log("FAILED...", error);
        alert("Failed to send email.");
      },
    );
  } catch (error) {
    console.error("Error initializing EmailJS:", error);
  }
}

document.getElementById("contact-form").addEventListener("submit", submitForm);
