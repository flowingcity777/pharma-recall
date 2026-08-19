// ========================================
// PharmaRecall
// Main Application Logic
// ========================================


// ========================================
// 1. Application State
// ========================================

let currentCardIndex = 0;
let isCardFlipped = false;
let currentMode = "study";

let sessionAttempts = 0;
let sessionScore = 0;

let currentAttemptResult = null;
let currentAttemptScore = null;
let attemptRecorded = false;


// ========================================
// 2. DOM Elements
// ========================================

// Flashcard content
const drugName = document.getElementById("drug-name");
const brandName = document.getElementById("brand-name");
const sideEffects = document.getElementById("side-effects");
const clinicalPharmacology =
    document.getElementById("clinical-pharmacology");
const foodInteractions =
    document.getElementById("food-interactions");

const cardCounter =
    document.getElementById("card-counter");

const flashcard =
    document.getElementById("flashcard");


// Practice mode
const practicePanel =
    document.getElementById("practice-panel");

const practiceDrugName =
    document.getElementById("practice-drug-name");

const practiceAnswer =
    document.getElementById("practice-answer");

const practiceFeedback =
    document.getElementById("practice-feedback");

const checkAnswerButton =
    document.getElementById("check-answer-btn");

const revealAnswerButton =
    document.getElementById("reveal-answer-btn");


// Flashcard navigation
const previousButton =
    document.getElementById("previous-btn");

const nextButton =
    document.getElementById("next-btn");

const flipButton =
    document.getElementById("flip-btn");

const cardControls =
    document.getElementById("card-controls");


// Mode controls
const studyModeButton =
    document.getElementById("study-mode-btn");

const practiceModeButton =
    document.getElementById("practice-mode-btn");


// Score display
const sessionAttemptsDisplay =
    document.getElementById("session-attempts");

const sessionScoreDisplay =
    document.getElementById("session-score");


// Practice navigation
const practiceNavigation =
    document.getElementById("practice-navigation");

const tryAgainButton =
    document.getElementById("try-again-btn");

const nextQuestionButton =
    document.getElementById("next-question-btn");


// ========================================
// 3. Study Mode Display
// ========================================

function displayDrug() {
    const drug = drugs[currentCardIndex];

    drugName.textContent = drug.genericName;
    brandName.textContent = drug.brandNames.join(" / ");

    sideEffects.textContent =
        drug.sideEffects.join(" • ");

    clinicalPharmacology.textContent =
        drug.clinicalPharmacology;

    foodInteractions.textContent =
        drug.foodInteractions;

    cardCounter.textContent =
        `Drug ${currentCardIndex + 1} of ${drugs.length}`;

    showFront();
}


// ========================================
// 4. Flashcard Functions
// ========================================

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


// ========================================
// 5. Practice Mode Display
// ========================================

function displayPracticeQuestion() {
    const drug = drugs[currentCardIndex];

    practiceDrugName.textContent =
        drug.genericName;

    cardCounter.textContent =
        `Drug ${currentCardIndex + 1} of ${drugs.length}`;

    practiceAnswer.value = "";
    practiceFeedback.textContent = "";

    currentAttemptResult = null;
    currentAttemptScore = null;
    attemptRecorded = false;

    practiceNavigation.style.display = "none";
}


// ========================================
// 6. Answer Normalization
// ========================================

function normalizeAnswer(answer) {
    return answer
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");
}


// ========================================
// 7. String Similarity
// ========================================

function calculateSimilarity(first, second) {
    const longer =
        first.length >= second.length
            ? first
            : second;

    const shorter =
        first.length >= second.length
            ? second
            : first;

    if (longer.length === 0) {
        return 1;
    }

    const distance =
        levenshteinDistance(longer, shorter);

    return (
        longer.length - distance
    ) / longer.length;
}


function levenshteinDistance(first, second) {
    const matrix = [];

    for (
        let i = 0;
        i <= second.length;
        i++
    ) {
        matrix[i] = [i];
    }

    for (
        let j = 0;
        j <= first.length;
        j++
    ) {
        matrix[0][j] = j;
    }

    for (
        let i = 1;
        i <= second.length;
        i++
    ) {
        for (
            let j = 1;
            j <= first.length;
            j++
        ) {
            if (
                second[i - 1] ===
                first[j - 1]
            ) {
                matrix[i][j] =
                    matrix[i - 1][j - 1];
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


// ========================================
// 8. Practice Feedback / Scoring
// ========================================

function setAttemptResult(
    result,
    score,
    message
) {
    currentAttemptResult = result;
    currentAttemptScore = score;

    practiceFeedback.textContent = message;

    practiceNavigation.style.display = "flex";
}


// ========================================
// 9. Check Practice Answer
// ========================================

function checkPracticeAnswer() {
    const drug = drugs[currentCardIndex];

    const userAnswers =
        practiceAnswer.value
            .split(",")
            .map(answer =>
                normalizeAnswer(answer)
            )
            .filter(answer =>
                answer !== ""
            );

    const correctAnswers =
        drug.sideEffects.map(effect =>
            normalizeAnswer(effect)
        );

    const matchedCorrectAnswers =
        new Set();

    let exactMatches = 0;
    let almostMatches = 0;


    userAnswers.forEach(userAnswer => {

        // -------------------------------
        // First: look for an exact match
        // -------------------------------

        const exactIndex =
            correctAnswers.findIndex(
                (
                    correctAnswer,
                    index
                ) =>
                    correctAnswer ===
                        userAnswer &&
                    !matchedCorrectAnswers.has(
                        index
                    )
            );

        if (exactIndex !== -1) {
            exactMatches++;

            matchedCorrectAnswers.add(
                exactIndex
            );

            return;
        }


        // -------------------------------
        // Otherwise find closest match
        // -------------------------------

        let bestSimilarity = 0;
        let bestMatchIndex = -1;

        correctAnswers.forEach(
            (
                correctAnswer,
                index
            ) => {

                if (
                    matchedCorrectAnswers.has(
                        index
                    )
                ) {
                    return;
                }

                const similarity =
                    calculateSimilarity(
                        userAnswer,
                        correctAnswer
                    );

                if (
                    similarity >
                    bestSimilarity
                ) {
                    bestSimilarity =
                        similarity;

                    bestMatchIndex =
                        index;
                }
            }
        );


        // Conservative typo tolerance
        if (
            bestSimilarity >= 0.78 &&
            bestMatchIndex !== -1
        ) {
            almostMatches++;

            matchedCorrectAnswers.add(
                bestMatchIndex
            );
        }
    });


    const totalMatches =
        exactMatches + almostMatches;


    // -------------------------------
    // Determine result
    // -------------------------------

    if (
        exactMatches ===
            correctAnswers.length &&
        almostMatches === 0
    ) {
        setAttemptResult(
            "correct",
            1,
            "Correct!"
        );

    } else if (
        totalMatches ===
            correctAnswers.length &&
        almostMatches > 0
    ) {
        setAttemptResult(
            "almost",
            0.75,
            "Almost — check your spelling."
        );

    } else if (
        totalMatches > 0
    ) {
        setAttemptResult(
            "partial",
            0.5,
            `Partially correct — you recalled ${totalMatches} of ${correctAnswers.length} key points.`
        );

    } else {
        setAttemptResult(
            "incorrect",
            0,
            "Not quite. Try again or reveal the answer."
        );
    }
}


// ========================================
// 10. Reveal Answer
// ========================================

function revealPracticeAnswer() {
    const drug = drugs[currentCardIndex];

    setAttemptResult(
        "revealed",
        0,
        `Answer: ${drug.sideEffects.join(" • ")}`
    );
}


// ========================================
// 11. Try Again
// ========================================

function tryPracticeAgain() {
    practiceAnswer.value = "";
    practiceFeedback.textContent = "";

    currentAttemptResult = null;
    currentAttemptScore = null;

    practiceNavigation.style.display =
        "none";

    practiceAnswer.focus();
}


// ========================================
// 12. Score Recording
// ========================================

function recordCurrentAttempt() {
    if (
        attemptRecorded ||
        currentAttemptScore === null
    ) {
        return;
    }

    sessionAttempts++;
    sessionScore +=
        currentAttemptScore;

    attemptRecorded = true;

    updateScoreDisplay();
}


function updateScoreDisplay() {
    sessionAttemptsDisplay.textContent =
        sessionAttempts;

    sessionScoreDisplay.textContent =
        sessionScore
            .toFixed(2)
            .replace(/\.00$/, "");
}


// ========================================
// 13. Next Practice Question
// ========================================

function nextPracticeQuestion() {

    // If user moves on without checking,
    // count it as a skipped question.
    if (
        currentAttemptScore === null
    ) {
        currentAttemptResult =
            "skipped";

        currentAttemptScore = 0;
    }

    recordCurrentAttempt();

    currentCardIndex++;

    if (
        currentCardIndex >=
        drugs.length
    ) {
        currentCardIndex = 0;
    }

    displayPracticeQuestion();
}


// ========================================
// 14. General Navigation
// ========================================

function showNextCard() {
    currentCardIndex++;

    if (
        currentCardIndex >=
        drugs.length
    ) {
        currentCardIndex = 0;
    }

    if (
        currentMode === "practice"
    ) {
        displayPracticeQuestion();
    } else {
        displayDrug();
    }
}


function showPreviousCard() {
    currentCardIndex--;

    if (
        currentCardIndex < 0
    ) {
        currentCardIndex =
            drugs.length - 1;
    }

    if (
        currentMode === "practice"
    ) {
        displayPracticeQuestion();
    } else {
        displayDrug();
    }
}


// ========================================
// 15. Study / Practice Modes
// ========================================

function setStudyMode() {
    currentMode = "study";

    studyModeButton.classList.add(
        "active"
    );

    practiceModeButton.classList.remove(
        "active"
    );

    practicePanel.style.display = "none";

    flashcard.style.display = "";
    cardControls.style.display = "flex";

    displayDrug();
}


function setPracticeMode() {
    currentMode = "practice";

    practiceModeButton.classList.add(
        "active"
    );

    studyModeButton.classList.remove(
        "active"
    );

    flashcard.style.display = "none";
    cardControls.style.display = "none";

    practicePanel.style.display = "block";

    displayPracticeQuestion();
}


// ========================================
// 16. Event Listeners
// ========================================

// Flashcard
flipButton.addEventListener(
    "click",
    flipCard
);

flashcard.addEventListener(
    "click",
    flipCard
);


// Navigation
nextButton.addEventListener(
    "click",
    showNextCard
);

previousButton.addEventListener(
    "click",
    showPreviousCard
);


// Modes
studyModeButton.addEventListener(
    "click",
    setStudyMode
);

practiceModeButton.addEventListener(
    "click",
    setPracticeMode
);


// Practice
checkAnswerButton.addEventListener(
    "click",
    checkPracticeAnswer
);

revealAnswerButton.addEventListener(
    "click",
    revealPracticeAnswer
);

tryAgainButton.addEventListener(
    "click",
    tryPracticeAgain
);

nextQuestionButton.addEventListener(
    "click",
    nextPracticeQuestion
);


// ========================================
// 17. Start Application
// ========================================

displayDrug();
