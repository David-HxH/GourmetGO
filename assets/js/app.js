const formulario = document.querySelector("form");
const inputBusqueda = document.querySelector('input[name="searchForm"]');
const contenedorRecetas = document.getElementById("contenedor-recetas");

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const ingrediente = inputBusqueda.value.trim().toLowerCase();

  if (!ingrediente) return;

  buscarRecetasPorIngrediente(ingrediente);
});

async function buscarRecetasPorIngrediente(ingrediente) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`
    );

    const data = await response.json();

    renderizarResultados(data.meals);
  } catch (error) {
    console.error("Error al buscar recetas:", error);
  }
}

function renderizarResultados(meals) {
  contenedorRecetas.innerHTML = "";

  if (!meals) {
    mostrarMensajeSinResultados();
    return;
  }

  meals.forEach(({ strMeal, strMealThumb }) => {
    const card = document.createElement("div");
    card.className = "col-12 col-md-4";

    card.innerHTML = `
      <div class="card mx-auto">
        <img src="${strMealThumb}" class="card-img-top img-receta" alt="${strMeal}">
        <div class="card-body">
          <h5 class="card-title">${strMeal}</h5>
          <a href="#" class="btn btn-primary">Ver receta</a>
        </div>
      </div>
    `;

    contenedorRecetas.appendChild(card);
  });
}

function mostrarMensajeSinResultados() {
  contenedorRecetas.innerHTML = `
    <div class="col-12 text-center text-secondary">
      <p>Lo sentimos, no se encontraron recetas. Intenta con otro ingrediente.</p>
    </div>
  `;
}
