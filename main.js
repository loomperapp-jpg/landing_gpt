'use strict';

(function () {

  function getUserId() {
    let id = localStorage.getItem('loomper_user_id');
    if (!id) {
      id = 'LMP-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      localStorage.setItem('loomper_user_id', id);
    }
    return id;
  }

  const userId = getUserId();

  const userInput = document.getElementById('user_id');
  if (userInput) userInput.value = userId;

  console.log('User ID:', userId);

})();
