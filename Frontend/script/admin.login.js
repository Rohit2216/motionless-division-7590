//     const adminRegisterForm = document.querySelector("#admin-register-form");
    // if (adminRegisterForm) {
    //   adminRegisterForm.addEventListener("submit", async (event) => {
    //     event.preventDefault();

    //     const email = adminRegisterForm.elements.email.value;
    //     const name = adminRegisterForm.elements.name.value;
    //     const mobile = adminRegisterForm.elements.mobile.value;
    //     const password = adminRegisterForm.elements.password.value;

    //     const payload = { email, name, mobile, password };

    //     try {
    //       const response = await fetch("http://localhost:8800/admin/register", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(payload),
    //       });

    //       if (response.ok) {
    //         const data = await response.json();
    //         console.log(data);
    //         alert(data.msg);
    //       } else {
    //         console.error("Registration failed");
    //       }
    //     } catch (error) {
    //       console.error(error);
    //       alert("Registration failed. Please try again later.");
    //     }
    //   });
    // }

    const adminLoginForm = document.querySelector("#admin-login-form");
    if (adminLoginForm) {
        adminLoginForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const email = adminLoginForm.elements["login-email"].value;
            const password = adminLoginForm.elements["login-password"].value;

            try {
                const response = await fetch("https://sephora-ul8o.onrender.com/admin/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem("adminToken", data.token);
                    alert(data.msg);
                    window.location.href = "admin.html"
                    // Redirect or perform admin actions
                } else {
                    console.error("Login failed");
                }
            } catch (error) {
                console.error(error);
                alert("Login failed. Please try again later.");
            }
        });
    }
