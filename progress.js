document.addEventListener('DOMContentLoaded', () => {
    const repCounts = document.querySelectorAll('.rep-count');
    const progressBars = document.querySelectorAll('.progress-bar');
    const completionMessage = document.getElementById('completionMessage');
    const exercises = document.querySelectorAll('ul li');
    const timerElement = document.querySelector('.countdown-text'); // Timer element
    let currentExerciseIndex = 0; // Track the current exercise
    let timerStarted = false; // To track if timer has started

    function updateProgress(index) {
        const repCountElem = repCounts[index];
        const progressBarElem = progressBars[index];
        const exercise = exercises[index];
        const totalReps = 10 * (parseInt(exercise.dataset.sets) || 1); // Total reps based on sets
        const currentReps = parseInt(repCountElem.dataset.reps) || 0;

        // Calculate progress based on reps
        const progressWidth = (currentReps / totalReps) * 100;
        progressBarElem.style.width = `${progressWidth}%`;
        repCountElem.textContent = `${currentReps} Reps`;

        // Check if exercise is completed
        if (currentReps >= totalReps) {
            if (currentExerciseIndex < exercises.length - 1) {
                currentExerciseIndex++;
                showNextExercise();
            } else {
                completionMessage.style.display = 'block'; // Show completion message
                clearInterval(autoUpdateInterval); // Stop auto-update
            }
        }
    }

    function showNextExercise() {
        exercises.forEach((exercise, index) => {
            exercise.style.display = index === currentExerciseIndex ? 'flex' : 'none';
        });

        // Reset rep count and progress bar for new exercise
        const repCountElem = repCounts[currentExerciseIndex];
        const progressBarElem = progressBars[currentExerciseIndex];
        repCountElem.dataset.reps = '0';
        repCountElem.textContent = '0 Reps';
        progressBarElem.style.width = '0%';
    }

    function startAutoUpdate() {
        // Update progress every second
        autoUpdateInterval = setInterval(() => {
            const repCountElem = repCounts[currentExerciseIndex];
            const currentReps = parseInt(repCountElem.dataset.reps) || 0;

            // Increment rep count
            repCountElem.dataset.reps = currentReps + 1;
            updateProgress(currentExerciseIndex);
        }, 2000); // 2 second intervals
    }

    function startTimer() {
        let countdown = 5; // Countdown timer duration
        timerElement.textContent = `Starting in ${countdown} seconds...`;
        
        const countdownInterval = setInterval(() => {
            countdown--;
            timerElement.textContent = `Starting in ${countdown} seconds...`;
            
            if (countdown <= 0) {
                clearInterval(countdownInterval);
                timerElement.style.display = 'none'; // Hide timer text after countdown
                startAutoUpdate(); // Start auto-update after timer
            }
        }, 1000);
    }

    // Initially show the first exercise and start the timer
    showNextExercise();
    startTimer();
});
