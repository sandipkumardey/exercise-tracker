document.addEventListener('DOMContentLoaded', function () {
    let countdown = 5;
    const countdownElement = document.getElementById('countdown');
  
    const countdownInterval = setInterval(function () {
      if (countdown > 0) {
        countdownElement.innerHTML = `Start your exercise in... ${countdown}`;
        countdown--;
      } else {
        countdownElement.innerHTML = 'Go!!';
        clearInterval(countdownInterval);
  
        // After "Go!!", hide the countdown after 2 seconds
        setTimeout(() => {
          countdownElement.style.display = 'none';
        }, 2000);
      }
    }, 1000);
  });
  