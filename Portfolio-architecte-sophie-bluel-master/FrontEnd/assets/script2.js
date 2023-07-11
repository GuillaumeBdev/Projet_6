const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('login-email');
const passwordInput = document.getElementById('login-password');

loginForm.addEventListener('submit', event => {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  const data = {
    email: email,
    password: password
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  fetch('http://localhost:5678/api/users/login', options)
    .then(response => response.json())
    .then(result => {
      if (result.token) {
        sessionStorage.setItem('token', result.token);
        console.log('Token stocké avec succès !');
        window.location.href = 'index.html';
        setStatus(true); 
      } else {
        console.log('Identifiants incorrects.');
        setStatus(false); 
      }
    })
    .catch(error => {
      console.error('Une erreur s\'est produite :', error);
      setStatus(false); 
    });
});

function setStatus(isLoggedIn) {
  if (isLoggedIn) {
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('isLoggedOut', 'false');
  } else {
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.setItem('isLoggedOut', 'true');
  }
}
;





