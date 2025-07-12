let currentPage = 1;
let itemsPerPage = 10;
let filteredEmployees = [...mockEmployees];

function renderEmployees() {
  const container = document.getElementById("employee-list-container");
  container.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const employeesToShow = filteredEmployees.slice(start, end);

  if (employeesToShow.length === 0) {
    container.innerHTML = "<p>No employees found.</p>";
    return;
  }

  employeesToShow.forEach(emp => {
    const card = document.createElement("div");
    card.className = "employee-card";
    card.innerHTML = `
      <h4>${emp.firstName} ${emp.lastName}</h4>
      <p><strong>ID:</strong> ${emp.id}</p>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
    container.appendChild(card);
  });

  renderPagination();
}

function renderPagination() {
  const pagination = document.getElementById("pagination-controls");
  pagination.innerHTML = "";
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  if (totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.addEventListener("click", () => {
      currentPage = i;
      renderEmployees();
    });
    pagination.appendChild(btn);
  }
}

function deleteEmployee(id) {
  if (confirm("Are you sure you want to delete this employee?")) {
    mockEmployees = mockEmployees.filter(emp => emp.id !== id);
    filteredEmployees = filteredEmployees.filter(emp => emp.id !== id);
    renderEmployees();
  }
}

function editEmployee(id) {
  window.location.href = `form.html?id=${id}`;
}

document.getElementById("search-input").addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  filteredEmployees = mockEmployees.filter(emp =>
    `${emp.firstName} ${emp.lastName} ${emp.email}`.toLowerCase().includes(keyword)
  );
  currentPage = 1;
  renderEmployees();
});

document.getElementById("sort-select").addEventListener("change", function () {
  const key = this.value;
  if (key) {
    filteredEmployees.sort((a, b) => a[key].localeCompare(b[key]));
    currentPage = 1;
    renderEmployees();
  }
});

document.getElementById("items-per-page").addEventListener("change", function () {
  itemsPerPage = parseInt(this.value);
  currentPage = 1;
  renderEmployees();
});

document.getElementById("filter-toggle").addEventListener("click", () => {
  document.getElementById("filter-sidebar").classList.toggle("hidden");
});

document.getElementById("apply-filter").addEventListener("click", () => {
  const fname = document.getElementById("filter-firstname").value.toLowerCase();
  const dept = document.getElementById("filter-department").value.toLowerCase();
  const role = document.getElementById("filter-role").value.toLowerCase();

  filteredEmployees = mockEmployees.filter(emp =>
    (fname ? emp.firstName.toLowerCase().includes(fname) : true) &&
    (dept ? emp.department.toLowerCase().includes(dept) : true) &&
    (role ? emp.role.toLowerCase().includes(role) : true)
  );
  currentPage = 1;
  renderEmployees();
});

document.getElementById("reset-filter").addEventListener("click", () => {
  document.getElementById("filter-firstname").value = "";
  document.getElementById("filter-department").value = "";
  document.getElementById("filter-role").value = "";
  filteredEmployees = [...mockEmployees];
  currentPage = 1;
  renderEmployees();
});

window.onload = () => {
  renderEmployees();
};
