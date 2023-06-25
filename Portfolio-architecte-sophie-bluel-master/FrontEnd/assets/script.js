fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    // Faites quelque chose avec les données récupérées
    console.log(data);
  })
  .catch(error => {
    // Gérez les erreurs éventuelles
    console.error('Une erreur s\'est produite:', error);
  });
  
