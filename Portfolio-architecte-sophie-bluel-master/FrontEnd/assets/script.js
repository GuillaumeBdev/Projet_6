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

const createButton = () => {
  const filters = document.getElementById("filters");

  const button1 = document.createElement("button");
  button1.textContent = "Tous";
  filters.appendChild(button1);

  const button2 = document.createElement("button");
  button2.textContent = "Projet";
  filters.appendChild(button2);

  const button3 = document.createElement("button");
  button3.textContent = "Appartements";
  filters.appendChild(button3);

  const button4 = document.createElement("button");
  button4.textContent = "Hôtel & Restaurant";
  filters.appendChild(button4);

  return [button1, button2, button3, button4];
};

const displayButton = (button1, button2, button3, button4) => {
  const filters = document.getElementById("filters");
  filters.appendChild(button1);
  filters.appendChild(button2);
  filters.appendChild(button3);
  filters.appendChild(button4);
};

const [button1, button2, button3, button4] = createButton();
displayButton(button1, button2, button3, button4);
