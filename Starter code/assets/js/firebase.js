import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";


// assuming the firebaseConfig will be added.
const app = initializeApp(firebaseConfig);

function showMessage(message, divId) {
  console.log("showMessage called with:", message, divId);
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;
  }, 5000);
}

document.addEventListener("DOMContentLoaded", (event) => {
  const signUp = document.getElementById("submitSignUp");
  if (signUp) {
    signUp.addEventListener("click", (event) => {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const firstName = document.getElementById("first-name").value;
      const lastName = document.getElementById("last-name").value;
      const userName = document.getElementById("user-name").value;

      const auth = getAuth();
      const db = getFirestore();

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const userData = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            userName: userName,
          };
          console.log(userData);
          showMessage("Account Created Successfully");
          const docRef = doc(db, "users", user.uid);
          setDoc(docRef, userData);

        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/email-already-in-use") {
            showMessage("user already registered ", "signUpMessage");
          } else {
            showMessage("Unable to create User", "signUpMessage");
          }
        });
    });
  }

})
