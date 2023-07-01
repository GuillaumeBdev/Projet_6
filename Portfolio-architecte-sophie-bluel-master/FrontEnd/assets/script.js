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

  figure.classList.add(work.categoryId);

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
  button.setAttribute("categoryId", i);
  button.addEventListener("click", function(){
    console.log("clicked")
    const categoryId = parseInt(this.getAttribute("categoryId"), 10);
    filterWorks(categoryId);
  });
}

const filterWorks = (categoryId) => {
  const figures = document.querySelectorAll("figure");

  for (const figure of figures) {
    if (categoryId === 0 || figure.classList.contains(categoryId.toString())) {
      figure.style.display = "block";
    } else {
      figure.style.display = "none"; 
    }
  }
};