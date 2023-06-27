const getWorks = () => {
  const container = document.getElementById("gallery");
  fetch("http://localhost:5678/api/works")
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      console.log(data);
      for (const works of data) {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaptation = document.createElement("figcaption");

        img.src = works.imageUrl;
        img.alt = works.title;
        figcaptation.textContent = works.title;

        figure.appendChild(img);
        figure.appendChild(figcaptation);
        container.appendChild(figure);
      }
    });
};

getWorks();
