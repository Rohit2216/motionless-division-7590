let counter = 1;
    setInterval(function () {
        document.getElementById("radio" + counter).checked = true;
        counter++;
        if (counter > 6) {
            counter = 1;
        }
    }, 2500);

    const subscribeBtn = document.querySelector('#subs button');

    subscribeBtn.addEventListener('click', function () {
        alert('Thank you for subscribing! GET THE LATEST NEWS & OFFERS IN BEAUTY & FASHION');
    });



    // Get all the links
const navLinks = document.querySelectorAll('nav ul li a');

// Loop through the links and add the click event listener
navLinks.forEach(link => {
  link.addEventListener('click', function() {
    // Remove the active class from all the links
    navLinks.forEach(link => link.classList.remove('active'));
    // Add the active class to the clicked link
    link.classList.add('active');
  });
});

// Get the back to top button
const backToTopButton = document.getElementById('back');

// Add the click event listener to the back to top button
backToTopButton.addEventListener('click', function() {
  // Scroll to the top of the page
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
