const form = document.getElementById("employee-form");
const idField = document.getElementById("employee-id");
const firstNameField = document.getElementById("firstName");
const lastNameField = document.getElementById("lastName");
const emailField = document.getElementById("email");
const departmentField = document.getElementById("department");
const roleField = document.getElementById("role");
const title = document.getElementById("form-title");
const submitBtn = document.getElementById("submitBtn");

// Get edit ID from URL if exists
const urlParams = new URLSearchParams(window.location.search);
const editId = parseInt(urlParams.get("id"));

if (editId) {
  const emp = mockEmployees.find(e => e.id === editId);
  if (emp) {
    idField.value = emp.id;
    firstNameField.value = emp.firstName;
    lastNameField.value = emp.lastName;
    emailField.value = emp.email;
    departmentField.value = emp.department;
    roleField.value = emp.role;
    title.innerText = "Edit Employee";
    submitBtn.innerText = "Update";
  }
}

function clearErrors() {
  document.querySelectorAll(".error-text").forEach(el => el.remove());
  document.querySelectorAll(".error").forEach(el => el.classList.remove("error"));
}

function showError(field, message) {
  field.classList.add("error");
  const error = document.createElement("span");
  error.className = "error-text";
  error.innerText = message;
  const existing = field.parentElement.querySelector(".error-text");
  if (existing) existing.remove();
  field.parentElement.appendChild(error);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  clearErrors();

  const firstName = firstNameField.value.trim();
  const lastName = lastNameField.value.trim();
  const email = emailField.value.trim();
  const department = departmentField.value;
  const role = roleField.value;

  let isValid = true;

  if (!firstName) {
    showError(firstNameField, "First name is required.");
    isValid = false;
  }

  if (!lastName) {
    showError(lastNameField, "Last name is required.");
    isValid = false;
  }

  if (!email) {
    showError(emailField, "Email is required.");
    isValid = false;
  } else {
    const emailPattern = /^[^@]+@[^@]+\.[a-z]{2,}$/i;
    if (!emailPattern.test(email)) {
      showError(emailField, "Invalid email format.");
      isValid = false;
    }
  }

  if (!department) {
    showError(departmentField, "Please select a department.");
    isValid = false;
  }

  if (!role) {
    showError(roleField, "Please select a role.");
    isValid = false;
  }

  if (!isValid) return;

  if (editId) {
    const index = mockEmployees.findIndex(e => e.id === editId);
    if (index !== -1) {
      mockEmployees[index] = {
        id: editId,
        firstName,
        lastName,
        email,
        department,
        role
      };
    }
  } else {
    const newEmployee = {
      id: Date.now(),
      firstName,
      lastName,
      email,
      department,
      role
    };
    mockEmployees.push(newEmployee);
  }

  alert("Employee saved successfully!");
  window.location.href = "index.html";
});
