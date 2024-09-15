function redirectTo(exerciseDay) {
    switch(exerciseDay) {
      case 'chest':
        window.location.href = 'chest.html';
        break;
      case 'leg':
        window.location.href = 'leg.html';
        break;
      case 'cardio':
        window.location.href = 'cardio.html';
        break;
      default:
        alert('Invalid selection');
    }
  }
  