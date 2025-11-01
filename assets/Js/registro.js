const form = document.getElementById("formRegistro");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", (e) => {
  e.preventDefault(); 

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const clave = document.getElementById("clave").value.trim();

  if (nombre === "" || correo === "" || clave === "") {
    mensaje.textContent = "Todos los campos son obligatorios";
    return;
  }

  
  localStorage.setItem("usuario", JSON.stringify({ nombre, correo, clave }));

  mensaje.textContent = " Registro exitoso, redirigiendo...";
  setTimeout(() => {
  window.location.href = "views/pokedex.html";
}, 1500);
});
