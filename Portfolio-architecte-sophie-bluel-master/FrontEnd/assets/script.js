const fetchData = () => {
  return fetch("http://localhost:5678/api/works")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      return data;
    });
};

const createElement = (work) => {
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
    const figure = createElement(work);
    container.appendChild(figure);
  }
};

const handleClick = (filter) => {
  const container = document.getElementById("gallery");
  container.innerHTML = "";

  fetchData()
    .then(worksData => {
      let filteredWorks = worksData;

      if (filter !== "all") {
        filteredWorks = worksData.filter(work => work.category === filter);
      }

      for (const work of filteredWorks) {
        const figure = createElement(work);
        container.appendChild(figure);
      }
    });
};

const filters = document.getElementById("filters");

const button1 = document.createElement("button");
button1.textContent = "Tous";
button1.addEventListener("click", () => handleClick("all"));
filters.appendChild(button1);

const button2 = document.createElement("button");
button2.textContent = "Projet";
button2.addEventListener("click", () => handleClick("project"));
filters.appendChild(button2);

const button3 = document.createElement("button");
button3.textContent = "Appartements";
button3.addEventListener("click", () => handleClick("apartments"));
filters.appendChild(button3);

const button4 = document.createElement("button");
button4.textContent = "Hôtel & Restaurant";
button4.addEventListener("click", () => handleClick("hotel_restaurant"));
filters.appendChild(button4);

displayWorks();
