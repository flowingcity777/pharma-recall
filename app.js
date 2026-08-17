let currentCardIndex = 0;
let isCardFlipped = false;
let currentMode = "study";

const drugName = document.getElementById("drug-name");
const brandName = document.getElementById("brand-name");
const sideEffects = document.getElementById("side-effects");
const clinicalPharmacology = document.getElementById("clinical-pharmacology");
const foodInteractions = document.getElementById("food-interactions");
const cardCounter = document.getElementById("card-counter");

const flashcard = document.getElementById("flashcard");

const practicePanel = document.getElementById("practice-panel");
const practiceDrugName = document.getElementById("practice-drug-name");
const practiceAnswer = document.getElementById("practice-answer");
const checkAnswerButton = document.getElementById("check-answer-btn");
const revealAnswerButton = document.getElementById("reveal-answer-btn");
const practiceFeedback = document.getElementById("practice-feedback");

const previousButton = document.getElementById("previous-btn");
const nextButton = document.getElementById("next-btn");
const flipButton = document.getElementById("flip-btn");

const studyModeButton = document.getElementById("study-mode-btn");
const practiceModeButton = document.getElementById("practice-mode-btn");

function displayDrug() {
    const drug = drugs[currentCardIndex];

    drugName.textContent = drug.genericName;
    brandName.textContent = drug.brandNames.join(" / ");

    sideEffects.textContent = drug.sideEffects.join(" • ");
    clinicalPharmacology.textContent = drug.clinicalPharmacology;
    foodInteractions.textContent = drug.foodInteractions;

    cardCounter.textContent =
        `Drug ${currentCardIndex + 1} of ${drugs.length}`;

    showFront();
}

function showFront() {
    flashcard.classList.remove("is-flipped");

    isCardFlipped = false;
    flipButton.textContent = "Flip Card";
}

function showBack() {
    flashcard.classList.add("is-flipped");

    isCardFlipped = true;
    flipButton.textContent = "Show Drug";
}

function flipCard() {
    if (isCardFlipped) {
        showFront();
    } else {
        showBack();
    }
}

function setStudyMode() {
    currentMode = "study";

    studyModeButton.classList.add("active");
    practiceModeButton.classList.remove("active");

    displayDrug();
}

function setPracticeMode() {
    currentMode = "practice";

    practiceModeButton.classList.add("active");
    studyModeButton.classList.remove("active");

    displayDrug();
}

function showNextCard() {
    currentCardIndex++;

    if (currentCardIndex >= drugs.length) {
        currentCardIndex = 0;
    }

    displayDrug();
}

function showPreviousCard() {
    currentCardIndex--;

    if (currentCardIndex < 0) {
        currentCardIndex = drugs.length - 1;
    }

    displayDrug();
}

function displayPracticeQuestion() {
    const drug = drugs[currentCardIndex];

    practiceDrugName.textContent = drug.genericName;

    practiceAnswer.value = "";
    practiceFeedback.textContent = "";
}

flipButton.addEventListener("click", flipCard);
flashcard.addEventListener("click", flipCard);
nextButton.addEventListener("click", showNextCard);
previousButton.addEventListener("click", showPreviousCard);

studyModeButton.addEventListener("click", setStudyMode);
practiceModeButton.addEventListener("click", setPracticeMode);

displayDrug();
