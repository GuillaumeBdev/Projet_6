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

  const categories = await fetchCategories(); // Nouvelle ligne : Récupération des catégories

  const allCategory = { id: 0, name: "Tous" };
  categories.unshift(allCategory);

  const filters = document.getElementById("filters");

  for (const category of categories) {
    const button = document.createElement("button");
    button.innerHTML = category.name;
    filters.appendChild(button);
    button.setAttribute("categoryId", category.id);
    button.addEventListener("click", function(){
      console.log("clicked")
      const categoryId = parseInt(this.getAttribute("categoryId"), 10);
      filterWorks(categoryId);
    });
  }
};

const fetchCategories = () => {
  return fetch("http://localhost:5678/api/categories")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      return data;
    });
};

const filterWorks = (categoryId) => {
  const figures = document.querySelectorAll("figure");

  for (const figure of figures) {
    if (categoryId === 0 || figure.classList.contains(categoryId.toString())) {
      figure.style.display = "block";
    } else {
      figure.style.display = "none"; 
    }
  }
  
  const buttons = document.querySelectorAll("button");

  for (const button of buttons) {
    button.classList.remove("active-button");
  }

  const activeButton = document.querySelector(`button[categoryId="${categoryId}"]`);
  activeButton.classList.add("active-button");
};

displayWorks();
