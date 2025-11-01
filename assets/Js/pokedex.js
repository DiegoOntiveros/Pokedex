let usuario = JSON.parse(localStorage.getItem("usuario"));
if (!usuario) {
  window.location.href = "../index.html";
}


if (!usuario.equipo) usuario.equipo = [];


const input = document.getElementById("buscar");
const btn = document.getElementById("btnBuscar");
const resultado = document.getElementById("resultado");
const equipoDiv = document.getElementById("equipo");
const tituloEquipo = document.querySelector("h2");


actualizarEquipo();


btn.addEventListener("click", () => {
  const valor = input.value.toLowerCase().trim();
  if (!valor) {
    resultado.innerHTML = "<p>Escribe un nombre o número.</p>";
    return;
  }

  fetch(`https://pokeapi.co/api/v2/pokemon/${valor}`)
    .then(res => {
      if (!res.ok) throw new Error("Pokémon no encontrado");
      return res.json();
    })
    .then(data => mostrarPokemon(data))
    .catch(err => {
      resultado.innerHTML = `<p style="color:red;">${err.message}</p>`;
    });
});

function mostrarPokemon(pokemon) {
  resultado.innerHTML = `
    <div class="poke-card">
      <h3>${pokemon.name.toUpperCase()} (#${pokemon.id})</h3>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <p><strong>Tipo:</strong> ${pokemon.types.map(t => t.type.name).join(', ')}</p>
      <p><strong>Altura:</strong> ${pokemon.height / 10}m</p>
      <p><strong>Altura:</strong> ${pokemon.weight / 10}kg</p>
      <p><strong>Ataque:</strong> ${pokemon.stats[1].base_stat}</p>
      <p><strong>Defensa:</strong> ${pokemon.stats[2].base_stat}</p>
      <p><strong>Velocidad:</strong> ${pokemon.stats[5].base_stat}</p>

      <p><strong>Habilidades:</strong> ${pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
      <button id="btnAgregar">Agregar al equipo</button>
    </div>
  `;

  document.getElementById("btnAgregar").addEventListener("click", () => {
    agregarAlEquipo({
      id: pokemon.id,
      nombre: pokemon.name,
      sprite: pokemon.sprites.front_default,
      favorito: false
    });
  });
}

function agregarAlEquipo(poke) {
  if (usuario.equipo.length >= 5) {
    alert("Tu equipo ya tiene 5 Pokémon");
    return;
  }
  if (usuario.equipo.find(p => p.id === poke.id)) {
    alert("Este Pokémon ya está en tu equipo");
    return;
  }

  usuario.equipo.push(poke);
  guardarUsuario();
  actualizarEquipo();
}

function quitarDelEquipo(id) {
  usuario.equipo = usuario.equipo.filter(p => p.id !== id);
  guardarUsuario();
  actualizarEquipo();
}

function guardarUsuario() {
  localStorage.setItem("usuario", JSON.stringify(usuario));
}

function actualizarEquipo() {
  equipoDiv.innerHTML = "";
  usuario.equipo.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("poke-card");
    card.innerHTML = `
      <img src="${p.sprite}" alt="${p.nombre}">
      <h4>${p.nombre}</h4>
      

      <button onclick="quitarDelEquipo(${p.id})">Quitar</button>
    `;
    equipoDiv.appendChild(card);
  });
  tituloEquipo.textContent = `Mi Equipo (${usuario.equipo.length} / 5)`;
}

window.quitarDelEquipo = quitarDelEquipo;
