// Submit button
const submitBtn = document.querySelectorAll("[data-submit]")[0];


submitBtn.addEventListener("click", function() {

    // Email the data in an organized way to the tester
    emailjs.sendForm("service_pq18mee","template_2rh2ekd", submitBtn.parentElement).then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                // Send the user back to the questions page
                window.location.href = "index.html";
            }, function (error) {
                // Do nothing since the email failed
                console.log('FAILED...', error);
        });
});