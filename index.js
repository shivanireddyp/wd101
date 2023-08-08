document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.getElementById("registrationForm");
    const userList = document.getElementById("userList");
  
    registrationForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const name = registrationForm.name.value;
      const email = registrationForm.email.value;
      const password = registrationForm.password.value;
      const dob = registrationForm.dob.value;
      const acceptTerms = registrationForm.acceptTerms.checked;
  
      // Validate age
      const today = new Date();
      const birthDate = new Date(dob);
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18 || age > 55) {
        alert("Age must be between 18 and 55.");
        return;
      }
  
      if (name && email && password && dob && acceptTerms) {
        const userInfo = {
          name,
          email,
          password,
          dob
        };
  
        // Save user info
        saveUser(userInfo);
  
        // Clear form fields
        registrationForm.reset();
  
        // Reload user list
        loadUsers();
      }
    });
  
    function saveUser(user) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
    }
  
    function loadUsers() {
      userList.innerHTML = "";
      const users = JSON.parse(localStorage.getItem("users")) || [];
  
      users.forEach(user => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>Name:</strong> ${user.name}, <strong>Email:</strong> ${user.email}, <strong>Date of Birth:</strong> ${user.dob}`;
        userList.appendChild(listItem);
      });
    }
  
    // Initial load of user data
    loadUsers();
  });
  
