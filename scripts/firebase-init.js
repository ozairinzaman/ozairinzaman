import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

// Your Firebase configuration
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

/**
 * Handle contact form submission to Firebase
 * @param {HTMLFormElement} form - The contact form element
 */
export async function handleContactFormSubmission(form) {
  const name = form.querySelector('#contact-name').value.trim();
  const email = form.querySelector('#contact-email').value.trim();
  const message = form.querySelector('#contact-message').value.trim();

  if (!name || !email || !message) {
    alert("All fields are required.");
    return;
  }

  const messagesRef = ref(database, "contactMessages");

  try {
    await push(messagesRef, {
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    });

    window.location.href = "contact-success.html"; 
    form.reset();
  } catch (error) {
    console.error("Firebase submission error:", error);
    alert("Oops! Something went wrong. Please try again later.");
  }
}

/**
 * Handle signup form submission to Firebase
 * @param {HTMLFormElement} form - The signup form element
 */
export async function handleSignupFormSubmission(form) {
  const name = form.querySelector('#signup-name').value.trim();
  const email = form.querySelector('#signup-email').value.trim();


  if (!name || !email) {
    alert("All fields are required.");
    return;
  }

  const messagesRef = ref(database, "signupMessages");

  try {
    await push(messagesRef, {
      name,
      email,
      timestamp: new Date().toISOString()
    });

    window.location.href = "signup-success.html";

    form.reset();
  } catch (error) {
    console.error("Firebase submission error:", error);
    alert("Oops! Something went wrong. Please try again later.");
  }
}