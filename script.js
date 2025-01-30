document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let message = document.getElementById("message");

    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    fetch("login.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          message.style.color = "green";
          message.textContent = "Login successful!";
        } else {
          message.style.color = "red";
          message.textContent = data.message;
        }
      })
      .catch((error) => {
        message.style.color = "red";
        message.textContent = "Server error. Please try again.";
      });
  });

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let message = document.getElementById("message");

    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    fetch("login.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          document.getElementById("loginSection").style.display = "none";
          document.getElementById("userListSection").style.display = "block";
          fetchUsers(); // Load users after login
        } else {
          message.style.color = "red";
          message.textContent = data.message;
        }
      })
      .catch((error) => {
        message.style.color = "red";
        message.textContent = "Server error. Please try again.";
      });
  });

// Fetch and display users
function fetchUsers() {
  fetch("fetch_users.php")
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        let tableBody = document.getElementById("userTableBody");
        tableBody.innerHTML = ""; // Clear table

        data.users.forEach((user) => {
          let row = `<tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.state}</td>
            <td>${user.country}</td>
            <td>${user.status}</td>
            <td>
                <button onclick="deleteUser('${
                  user.email
                }')" class="delete-btn">Delete</button>
            </td>
          </tr>`;

          tableBody.innerHTML += row;
        });
      }
    });
}

// Delete user
function deleteUser(userEmail) {
  if (!confirm("Are you sure you want to delete this user?")) return;

  let formData = new FormData();
  formData.append("email", userEmail); // Send email as identifier

  fetch("delete_user.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        fetchUsers(); // Refresh user list
      }
    });
}

// Show the "Create User" Form when the button is clicked
document.getElementById("createUserBtn").addEventListener("click", function () {
  document.getElementById("createUserFormWrapper").style.display = "block";
  document.getElementById("userListSection").style.display = "none";
});

// Cancel the "Create User" form and go back to the User List
document
  .getElementById("cancelCreateUserBtn")
  .addEventListener("click", function () {
    document.getElementById("createUserFormWrapper").style.display = "none";
    document.getElementById("userListSection").style.display = "block";
  });

// Handle form submission to create a new user
document
  .getElementById("createUserForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let newUser = {
      name: document.getElementById("newName").value,
      email: document.getElementById("newEmail").value,
      password: document.getElementById("newPassword").value,
      phone: document.getElementById("newPhone").value,
      state: document.getElementById("newState").value,
      country: document.getElementById("newCountry").value,
    };

    let formData = new FormData();
    formData.append("name", newUser.name);
    formData.append("email", newUser.email);
    formData.append("password", newUser.password);
    formData.append("phone", newUser.phone);
    formData.append("state", newUser.state);
    formData.append("country", newUser.country);

    fetch("create_user.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("User created successfully!");
          fetchUsers(); // Refresh user list
          document.getElementById("createUserFormWrapper").style.display =
            "none";
          document.getElementById("userListSection").style.display = "block";
        } else {
          alert("Error creating user: " + data.message);
        }
      })
      .catch((error) => {
        alert("Server error. Please try again.");
      });
  });

// New User Email Validation
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
}

// New User Password Validation
function validatePassword(password) {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
}

// New User Phone Number Validation
function validatePhone(phone) {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
}

// New User Form submission handler
document
  .getElementById("createUserForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Get input values
    const email = document.getElementById("newEmail").value;
    const password = document.getElementById("newPassword").value;
    const phone = document.getElementById("newPhone").value;

    // Validate each field
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      alert(
        "Password must be at least 8 characters long and contain at least one letter and one number."
      );
      return;
    }

    if (!validatePhone(phone)) {
      alert("Please enter a valid phone number (10 digits).");
      return;
    }

    // If all fields are valid, proceed with form submission
    alert("User created successfully!");
  });

function showError(field, message) {
  const errorMessage = document.getElementById(field + "Error");
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

function hideError(field) {
  const errorMessage = document.getElementById(field + "Error");
  errorMessage.style.display = "none";
}

document
  .getElementById("createUserForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset error messages
    hideError("email");
    hideError("password");
    hideError("phone");

    const email = document.getElementById("newEmail").value;
    const password = document.getElementById("newPassword").value;
    const phone = document.getElementById("newPhone").value;

    if (!validateEmail(email)) {
      showError("email", "Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      showError(
        "password",
        "Password must be at least 8 characters long and contain at least one letter and one number."
      );
      return;
    }

    if (!validatePhone(phone)) {
      showError("phone", "Please enter a valid phone number (10 digits).");
      return;
    }

    alert("User created successfully!");
  });
