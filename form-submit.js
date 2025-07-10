const popup = document.getElementById('popup');
const formCard = document.getElementById('formCard');
const loader = document.getElementById('loader');

let selectedService = "Service"; // default value

function openForm(serviceName) {
  selectedService = serviceName; // For JS submission
  document.getElementById('service-field').value = serviceName; // Update hidden input

  popup.classList.add('show');
  formCard.classList.remove('zoom-out');
  formCard.classList.add('zoom-in');
}

function closeForm() {
  formCard.classList.remove('zoom-in');
  formCard.classList.add('zoom-out');
  setTimeout(() => {
    popup.classList.remove('show');
  }, 400);
}

function submitForm() {
  loader.style.display = 'flex';

  const name = document.querySelector('input[placeholder="Your Name"]').value;
  const phone = document.querySelector('input[placeholder="Phone Number"]').value;
  const pin = document.querySelector('input[placeholder="Pin Code"]').value;
  const city = document.getElementById('city-select-form').value;

  // Validate empty fields
  if (!name || !phone || !pin || city === "select-area") {
    alert("Please fill all fields properly.");
    loader.style.display = 'none';
    return;
  }

  // Phone validation: 10 digits starting with 6–9
  const isValidPhone = /^[6-9]\d{9}$/.test(phone);
  if (!isValidPhone) {
    alert("Please enter a valid 10-digit Indian phone number starting with 6-9.");
    loader.style.display = 'none';
    return;
  }

  // PIN validation: 6 digits, not starting with 0
  const isValidPin = /^[1-9]\d{5}$/.test(pin);
  if (!isValidPin) {
    alert("Please enter a valid 6-digit Indian PIN code (cannot start with 0).");
    loader.style.display = 'none';
    return;
  }

  const googleFormURL = `https://docs.google.com/forms/d/e/1FAIpQLSd4sau6nscT68QAWvW-P7a0D0YDaY0f_u7bSW5nABqNDnzi8g/formResponse?entry.1014385148=${encodeURIComponent(selectedService)}&entry.441857144=${encodeURIComponent(name)}&entry.1210569180=${encodeURIComponent(phone)}&entry.1353204918=${encodeURIComponent(pin)}&entry.1273483821=${encodeURIComponent(city)}`;

  fetch(googleFormURL, {
    method: "POST",
    mode: "no-cors"
  }).then(() => {
    setTimeout(() => {
      loader.style.display = 'none';
      alert("Form submitted successfully! Our team will contact you soon");
      closeForm();
    }, 1000);
  }).catch(() => {
    alert("There was an error. Please try again.");
    loader.style.display = 'none';
  });
}
