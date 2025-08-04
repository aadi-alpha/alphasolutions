
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Google Form action URL
    const googleFormURL =
      "https://docs.google.com/forms/d/e/1FAIpQLSd-4M5TkUjsemjktqpD9dFLqYva_IxF7Oz2uQPliRHAPTuFXA/formResponse";

    // Matching HTML inputs with Google Form entry IDs
    const formData = new FormData();
    formData.append("entry.1853749175", document.getElementById("name").value); // Name
    formData.append("entry.157379272", document.getElementById("email").value); // Email
    formData.append("entry.107316564", document.getElementById("phone").value); // Phone
    formData.append("entry.1569146119", document.getElementById("city-select-form").value); // City
    formData.append("entry.83441904", document.getElementById("select-service").value); // Service
    formData.append("entry.1863569847", document.getElementById("message").value); // Message

    // Send POST request to Google Form
    fetch(googleFormURL, {
      method: "POST",
      mode: "no-cors", // Important for avoiding CORS issues
      body: formData,
    })
      .then(() => {
        alert("Your response has been submitted!");
        form.reset();
      })
      .catch((error) => {
        alert("There was an error submitting the form.");
        console.error("Error!", error.message);
      });
  });
