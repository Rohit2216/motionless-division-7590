function myFunction() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
const form = document.querySelector("#register-form");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      name: form.elements.username.value,
      mobile: form.elements.mobile.value,
      email: form.elements.email.value,
      password: form.elements.password.value,
    };
    
    try {
      const response = await fetch("https://sephora-ul8o.onrender.com/users/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log(data);
      alert(data.msg);

      if (response.ok) {
        // Store user data in localStorage
        localStorage.setItem("userData", JSON.stringify(payload));

        window.location.href = "login.html";
      }
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please try again later.");
    }
  });
}
