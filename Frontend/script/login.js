function myFunction() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}


const form = document.querySelector("#login-form");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      email: form.elements.email.value,
      password: form.elements.password.value
    };

    try {
      const response = await fetch("https://gold-elated-turtle.cyclic.app/users/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Wrong Credentials");
      }

      const res = await response.json();
      localStorage.setItem("token", res.token);
      console.log(res);
      alert(res.msg);
      window.location.href = "steal_deals.html";
    } catch (err) {
      console.log(err);
      alert(err.message);
      window.location.href = "login.html";
    }
  });
}
