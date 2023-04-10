var image = [

    "https://logan.nnnow.com/content/dam/nnnow-project/04-nov-2022/SC_Offerpagedesktop.jpg",
    "https://logan.nnnow.com/content/dam/nnnow-project/26-march-/ABH_Browfreeze_Homepagebanner_Desktop.jpg",
    "https://logan.nnnow.com/content/dam/nnnow-project/29-march-2023/JB_Offerpagebanner_Desktop.jpg"
    

]

var i = 0;
function slideshow() {
    document.getElementById("image").src = image[i];
    if (i < image.length - 1) {
        i++;
    } else {
        i = 0;
    }
    setTimeout("slideshow()", 4000);
}
window.onload = slideshow;




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
    