import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";

// Firebase configuration (same as your firebase-init.js)
const firebaseConfig = {
  apiKey: "AIzaSyCGrX6ry8Phh1ZfRmekJ_1rpjEyF2CbGnc",
  authDomain: "ozairinzaman.firebaseapp.com",
  databaseURL: "https://ozairinzaman-default-rtdb.firebaseio.com",
  projectId: "ozairinzaman",
  storageBucket: "ozairinzaman.appspot.com",
  messagingSenderId: "993199283045",
  appId: "1:993199283045:web:90805518bf35b73a65df8c",
  measurementId: "G-JDYMN1XFYR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Get the form element
const signupForm = document.getElementById('signup-form');
const errorMessage = document.getElementById('error-message');

signupForm.addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  // Get input values
  const name = document.getElementById('customer-name').value.trim();
  const email = document.getElementById('customer-email').value.trim();

  // Validate input
  if (!name || !email) {
    errorMessage.style.display = 'block';
    errorMessage.textContent = 'Both name and email are required.';
    return;
  }

  // Reference to Firebase database
  const usersRef = ref(database, 'registrations');

  try {
    // Push data to Firebase Realtime Database
    await push(usersRef, {
      name: name,
      email: email,
      timestamp: new Date().toISOString()
    });

    // Redirect to a success page
    window.location.href = "registration-success.html";
  } catch (error) {
    console.error("Error submitting registration:", error);
    errorMessage.style.display = 'block';
    errorMessage.textContent = 'Something went wrong. Please try again later.';
  }
});