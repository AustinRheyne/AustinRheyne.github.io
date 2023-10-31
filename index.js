//  <li class="page-item active"><a class="page-link" href="#">1</a></li>
import data from './assets/json/questions_2023.json' assert {type : 'json'};

const questions = data["questions"];
const questionNumber = document.querySelectorAll("[data-question-number]")[0];
const title = document.querySelectorAll("[data-title]")[0];
const content = document.querySelectorAll("[data-content]")[0];
const input = document.querySelectorAll("[data-input-type]")[0];
const output = document.querySelectorAll("[data-output-type]")[0];
const testCases = document.querySelectorAll("[data-test-cases]")[0];

const nav = document.getElementById("nav-list");
let currentPage = 1;

let nextBtn = document.querySelectorAll("[data-next]")[0];
let prevBtn = document.querySelectorAll("[data-prev]")[0];

// Create the page bar, based on the number of questions
for (let i = 0; i < questions.length; i++) {
    let li = document.createElement("li")
    li.className = "page-item"
    nav.insertBefore(li, nav.children[nav.children.length-1]);
    let a = document.createElement("a");
    a.className = "page-link";
    a.innerHTML = i+1;
    li.appendChild(a);
    li.addEventListener("click", function() {
        changePage(i+1);
    })
}



// Update the page with the current question
changePage(1);

// Update all information when the user jumps to a different page
nextBtn.addEventListener("click", function() { 
    if(nextBtn.classList.contains("disabled")) {
        return;
    }
    changePage(currentPage+1); 
});
prevBtn.addEventListener("click", function() { 
    if(prevBtn.classList.contains("disabled")) {
        return;
    }
    changePage(currentPage-1); 
});

function changePage(num) {
    currentPage = num;
    console.log("Switched to page: " + currentPage)
    // Check if we need to limit the bounds
    checkPageBounds();
    // Set the page numbers disabled
    resetPageNums();
    nav.children[currentPage].className = "page-item active"
    let currentQuestion = questions[currentPage-1]
    questionNumber.innerHTML = "Question " + currentPage;
    title.innerHTML = currentQuestion["title"];
    content.innerHTML = currentQuestion["content"];
    input.innerHTML = currentQuestion["input-type"];
    output.innerHTML = currentQuestion["output-type"];

    // Setup the code for the test cases
    applyTestCases(currentQuestion); 

}

function resetPageNums() {
    for (let i = 0; i < questions.length; i++) {
        nav.children[i+1].className = "page-item";
    }
}

function applyTestCases(currentQuestion) {
    let tcTemplate = `<div id="1" class="container-fluid row">
                        <div class="col-6">
                            <h5>Sample Input</h5>
                            <p class="border border-dark ps-2" data-input>1200350</p>
                        </div>
                        <div class="col-6">
                            <h5>Sample Ouput</h5>
                            <p class="border border-dark ps-2" data-output>3</p>
                        </div>
                      </div>`
                            
    // reset the test cases section so we can add some in
    testCases.innerHTML = ""
    for (let i = 0; i < currentQuestion["test-cases"].length; i++) {
        testCases.innerHTML += tcTemplate;

        //update some info in the template
        let currentChild = testCases.children[i];
        currentChild.id = i+1;
        currentChild.querySelector("[data-input]").innerHTML = currentQuestion["test-cases"][i][0];
        currentChild.querySelector("[data-output]").innerHTML = currentQuestion["test-cases"][i][1];
    }
}

function checkPageBounds() {
    if(currentPage == questions.length) {
        nav.children[nav.children.length-1].className = "page-item disabled";
    } else {
        nav.children[nav.children.length-1].className = "page-item";
    }

    if(currentPage == 1) {
        nav.children[0].className = "page-item disabled"
    }  else {
        nav.children[0].className = "page-item"
    }
}