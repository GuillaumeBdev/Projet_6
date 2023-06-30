const fetchData = () => {
  return fetch("http://localhost:5678/api/works")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      return data;
    });
};

const createFigure = (work) => {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");

  img.src = work.imageUrl;
  img.alt = work.title;
  figcaption.textContent = work.title;

  figure.appendChild(img);
  figure.appendChild(figcaption);

  return figure;
};

const displayWorks = async () => {
  const container = document.getElementById("gallery");
  const worksData = await fetchData();

  for (const work of worksData) {
    const figure = createFigure(work);
    container.appendChild(figure);
  }
};

displayWorks();


const filters = document.getElementById("filters");


const buttonTxt = ["Tous", "Objets", "Appartements", "Hôtel & restaurants"];

for (let i = 0; i < buttonTxt.length; i++) {
  const button = document.createElement("button");
  button.innerHTML = buttonTxt[i];
  filters.appendChild(button);
  button.addEventListener("click", function(){
    console.log("clicked")
  });
}
