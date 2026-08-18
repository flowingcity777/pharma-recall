let currentCardIndex = 0;
let isCardFlipped = false;
let currentMode = "study";

let sessionAttempts = 0;
let sessionScore = 0;

let currentAttemptResult = null;
let currentAttemptScore = null;
let attemptRecorded = false;

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

function displayPracticeQuestion() {
    const drug = drugs[currentCardIndex];

    practiceDrugName.textContent = drug.genericName;

    practiceAnswer.value = "";
    practiceFeedback.textContent = "";
}

function normalizeAnswer(answer) {
    return answer
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");
}

function calculateSimilarity(first, second) {
    const longer = first.length >= second.length ? first : second;
    const shorter = first.length >= second.length ? second : first;

    if (longer.length === 0) {
        return 1;
    }

    const distance = levenshteinDistance(longer, shorter);

    return (longer.length - distance) / longer.length;
}

function levenshteinDistance(first, second) {
    const matrix = [];

    for (let i = 0; i <= second.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= first.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= second.length; i++) {
        for (let j = 1; j <= first.length; j++) {

            if (second[i - 1] === first[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + 1
                );
            }
        }
    }

    return matrix[second.length][first.length];
}

function normalizeAnswer(answer) {
    return answer
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");
}

function calculateSimilarity(first, second) {
    const longer = first.length >= second.length ? first : second;
    const shorter = first.length >= second.length ? second : first;

    if (longer.length === 0) {
        return 1;
    }

    const distance = levenshteinDistance(longer, shorter);

    return (longer.length - distance) / longer.length;
}

function levenshteinDistance(first, second) {
    const matrix = [];

    for (let i = 0; i <= second.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= first.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= second.length; i++) {
        for (let j = 1; j <= first.length; j++) {

            if (second[i - 1] === first[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + 1
                );
            }
        }
    }

    return matrix[second.length][first.length];
}

function checkPracticeAnswer() {
    const drug = drugs[currentCardIndex];

    const userAnswers = normalizeAnswer(practiceAnswer.value)
        .split(",")
        .map(answer => answer.trim())
        .filter(answer => answer !== "");

    const correctAnswers = drug.sideEffects.map(effect =>
        normalizeAnswer(effect)
    );

    let exactMatches = 0;
    let almostMatches = 0;

    userAnswers.forEach(userAnswer => {

        if (correctAnswers.includes(userAnswer)) {
            exactMatches++;
            return;
        }

        const isAlmost = correctAnswers.some(correctAnswer => {
            const similarity = calculateSimilarity(
                userAnswer,
                correctAnswer
            );

            console.log(
                userAnswer,
                correctAnswer,
                similarity
            );

            return similarity >= 0.78;
        });

        if (isAlmost) {
            almostMatches++;
        }
    });

    if (
        exactMatches === correctAnswers.length &&
        almostMatches === 0
    ) {
        practiceFeedback.textContent = "Correct!";

    } else if (
        exactMatches + almostMatches === correctAnswers.length
    ) {
        practiceFeedback.textContent =
            "Almost — check your spelling.";

    } else if (
        exactMatches > 0 || almostMatches > 0
    ) {
        practiceFeedback.textContent =
            `Partially correct — you recalled ${exactMatches + almostMatches} of ${correctAnswers.length} key points.`;

    } else {
        practiceFeedback.textContent =
            "Not quite. Try again or reveal the answer.";
    }
}

function revealPracticeAnswer() {
    const drug = drugs[currentCardIndex];

    practiceFeedback.textContent =
        `Answer: ${drug.sideEffects.join(" • ")}`;
}

function showNextCard() {
    currentCardIndex++;

    if (currentCardIndex >= drugs.length) {
        currentCardIndex = 0;
    }

    if (currentMode === "practice") {
        displayPracticeQuestion();
    } else {
        displayDrug();
    }
}

function showPreviousCard() {
    currentCardIndex--;

    if (currentCardIndex < 0) {
        currentCardIndex = drugs.length - 1;
    }

    if (currentMode === "practice") {
        displayPracticeQuestion();
    } else {
        displayDrug();
    }
}

function setStudyMode() {
    currentMode = "study";

    studyModeButton.classList.add("active");
    practiceModeButton.classList.remove("active");

    practicePanel.style.display = "none";

    displayDrug();
}

function setPracticeMode() {
    currentMode = "practice";

    practiceModeButton.classList.add("active");
    studyModeButton.classList.remove("active");

    practicePanel.style.display = "block";

    displayPracticeQuestion();
}

flipButton.addEventListener("click", flipCard);
flashcard.addEventListener("click", flipCard);
nextButton.addEventListener("click", showNextCard);
previousButton.addEventListener("click", showPreviousCard);

studyModeButton.addEventListener("click", setStudyMode);
practiceModeButton.addEventListener("click", setPracticeMode);

checkAnswerButton.addEventListener("click", checkPracticeAnswer);
revealAnswerButton.addEventListener("click", revealPracticeAnswer);

displayDrug();
