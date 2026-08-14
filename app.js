let currentCardIndex = 0;
let isCardFlipped = false;

const drugName = document.getElementById("drug-name");
const brandName = document.getElementById("brand-name");
const sideEffects = document.getElementById("side-effects");
const clinicalPharmacology = document.getElementById("clinical-pharmacology");
const foodInteractions = document.getElementById("food-interactions");
const cardCounter = document.getElementById("card-counter");

const cardFront = document.querySelector(".card-front");
const cardBack = document.querySelector(".card-back");

const previousButton = document.getElementById("previous-btn");
const nextButton = document.getElementById("next-btn");
const flipButton = document.getElementById("flip-btn");

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
    cardFront.style.display = "block";
    cardBack.style.display = "none";

    isCardFlipped = false;
    flipButton.textContent = "Flip Card";
}

function showBack() {
    cardFront.style.display = "none";
    cardBack.style.display = "block";

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

flipButton.addEventListener("click", flipCard);
nextButton.addEventListener("click", showNextCard);
previousButton.addEventListener("click", showPreviousCard);

displayDrug();
