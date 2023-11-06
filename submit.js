// Information to be mailed to the tester
const language = document.querySelectorAll("[data-select-language]")[0];
const teamName = document.querySelectorAll("[data-team-name]")[0];
const code = document.querySelectorAll("[data-code]")[0];
const question = document.querySelectorAll("[data-select-question]")[0];

// Submit button
const submitBtn = document.querySelectorAll("[data-submit]")[0];


submitBtn.addEventListener("click", function() {
    // Get the data from the form
    let lang = language.value;
    let team = teamName.value;
    let codeText = code.value;
    let q = question.value;

    // Email the data in an organized way to the tester
    emailjs.send("service_pq18mee","template_2rh2ekd",{
        team_name: team,
        language: lang,
        code: codeText,
        question: q
        }).then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                // Send the user back to the questions page
                window.location.href = "index.html";
            }, function (error) {
                // Do nothing since the email failed
                console.log('FAILED...', error);
        });

    
});