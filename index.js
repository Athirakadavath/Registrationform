const form = document.getElementById("registration-form");
const tableBody = document.querySelector("#entriesTable tbody");

function getEntriesFromStorage() {
  let entries = localStorage.getItem("user-entries");
  return entries ? JSON.parse(entries) : [];
}

function saveEntry(entry) {
  const entries = getEntriesFromStorage();
  entries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(entries));
}

function displayEntries() {
  tableBody.innerHTML = ""; // Clear existing rows
  const entries = getEntriesFromStorage();

  entries.forEach((entry) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.password}</td>
      <td>${entry.dob}</td>
      <td>${entry.acceptedTerms}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Age validation between 18 and 55
function isAgeValid(dobString) {
  const dob = new Date(dobString);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age >= 18 && age <= 55;
}

// Initial load
displayEntries();

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTerms = document.getElementById("acceptTerms").checked;

  if (!isAgeValid(dob)) {
    alert("Age must be between 18 and 55.");
    return;
  }

  const entry = { name, email, password, dob, acceptedTerms };
  saveEntry(entry);
  displayEntries();
  form.reset();
});
