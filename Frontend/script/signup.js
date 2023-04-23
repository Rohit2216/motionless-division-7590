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
      // console.log(payload);

      try {
        const response = await fetch("https://gold-elated-turtle.cyclic.app/users/register", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        console.log(data);
        alert(data.msg);
        window.location.href = "login.html";
      } catch (error) {
        console.error(error);
        alert("Registration failed. Please try again later.");
      }
    });
  }