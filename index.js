document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    const userTableBody = document.querySelector('#userTable tbody');

    // Load existing entries from localStorage on page load
    loadEntriesFromLocalStorage();

    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const acceptTerms = document.getElementById('acceptTerms').checked;

        if (!acceptTerms) {
            alert('Please accept the terms.');
            return;
        }

        const currentDate = new Date();
        const dobDate = new Date(dob);
        const age = currentDate.getFullYear() - dobDate.getFullYear();

        if (age < 18 || age > 55) {
            alert('Date of birth must be between ages 18 and 55.');
            return;
        }

        const newUser = { name, email, password, dob, acceptTerms };
        addUserToTable(newUser);
        saveUserEntry(newUser);

        registrationForm.reset();
    });

    function loadEntriesFromLocalStorage() {
        const savedEntries = JSON.parse(localStorage.getItem('userEntries')) || [];
        savedEntries.forEach(entry => addUserToTable(entry));
    }

    function addUserToTable(user) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.dob}</td>
            <td>${user.acceptTerms ? 'Yes' : 'No'}</td>
        `;
        userTableBody.appendChild(newRow);
    }

    function saveUserEntry(user) {
        const savedEntries = JSON.parse(localStorage.getItem('userEntries')) || [];
        savedEntries.push(user);
        localStorage.setItem('userEntries', JSON.stringify(savedEntries));
    }
});
