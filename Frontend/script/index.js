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