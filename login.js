"use strict";
var a, b, c, d;
a = document.getElementById("one");
b = document.getElementById("two");
c = document.getElementById("three");
d = document.getElementById("four");
var r = document.getElementById("b1");
var s = document.getElementById("b2");

r.onclick = function () {
  d.classList.add("mover");
  a.classList.add("hide");
  a.classList.remove("show");
  c.classList.add("movel2");
  b.classList.add("hide");
  b.classList.remove("show");
  c.classList.remove("hide");
  c.classList.add("show");
  d.classList.remove("hide");
  d.classList.add("show");
};
s.onclick = function () {
  b.classList.add("mover2");
  c.classList.add("hide");
  c.classList.remove("show");
  a.classList.add("movel");
  d.classList.add("hide");
  d.classList.remove("show");
  b.classList.remove("hide");
  b.classList.add("show");
  a.classList.remove("hide");
  a.classList.add("show");
};
let registeredUsers = [
  ["admin@gmail.com", "admin"],
  ["tada@gmail.com", "tada"],
];
$(document).ready(() => {
  $("#loginForm").submit(function (event) {
    event.preventDefault();
    let username = $("#email").val();
    let password = $("#password").val();
    let isValidUser = false;

    for (let i = 0; i < registeredUsers.length; i++) {
      if (
        registeredUsers[i][0] === username &&
        registeredUsers[i][1] === password
      ) {
        isValidUser = true;
        break;
      }
    }
    if (isValidUser) {
      alert("You are valid user");
    } else {
      alert("You are not a valid user");
    }
  });
  $("#registerForm").submit(function (event) {
    event.preventDefault();
    var username = $("#username").val();
    var email = $("#newEmail").val();
    var newPassword = $("#newPassword").val();
    var emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;

    // Check if the email is already registered
    for (var i = 0; i < registeredUsers.length; i++) {
      if (registeredUsers[i][0] === email) {
        alert("Email already exists. Please use a different email.");
        return false;
      }
    }

    // Check if the password is the same as the username
    if (newPassword.toLowerCase() === username.toLowerCase()) {
      alert(
        "Password cannot be the same as username. Please choose a different password."
      );
      return false;
    }

    // Check if the password contains a mixture of characters
    var hasLowerCase = /[a-z]/.test(newPassword);
    var hasUpperCase = /[A-Z]/.test(newPassword);
    var hasNumbers = /\d/.test(newPassword);
    var hasSymbols = /[^a-zA-Z0-9]/.test(newPassword);

    if (!(hasLowerCase && hasUpperCase && hasNumbers && hasSymbols)) {
      alert(
        "Password must contain a mixture of lowercase letters, uppercase letters, numbers, and symbols."
      );
      return false;
    }

    // Register the new user
    registeredUsers.push([email, newPassword]);
    alert(
      "Registration successful! You can now login with your email and password."
    );
    $("#username").val("");
    $("#newEmail").val("");
    $("#newPassword").val("");
    return false;
  });
});
