function getTask() {
	let tasks = JSON.parse(window.localStorage.getItem("tasks"));
	if (tasks === null || !Array.isArray(tasks)) tasks = [];

	tasks.push({
		name: document.getElementById("task_name").value,
		done: false
	});

	window.localStorage.setItem("tasks", JSON.stringify(tasks));
	updateTodoList();

	
	return false;
}

function updateTodoList() {
	let tasks = JSON.parse(window.localStorage.getItem("tasks"));
	let lista = "<ol>";

	if (tasks && tasks.length > 0) {
		tasks.forEach((task, i) => {
			const checked = task.done ? "checked" : "";
			const textStyle = task.done ? "text-decoration: line-through;" : "";

			lista += `
				<li style="display: flex; align-items: center; gap: 10px;">
					<input type="checkbox" ${checked} onchange="toggleTask(${i})">
					<span style="${textStyle}">${task.name}</span>
					<button onclick="editItem(${i})">Editar</button>
					<button onclick="removeItem(${i})">Eliminar</button>
				</li>`;
		});
	} 
	lista += "</ol>";
	document.getElementById("todo_list").innerHTML = lista;
}

updateTodoList();

function toggleTask(index) {
	let tasks = JSON.parse(window.localStorage.getItem("tasks"));
	tasks[index].done = !tasks[index].done;
	window.localStorage.setItem("tasks", JSON.stringify(tasks));
	updateTodoList();
}

function removeItem(target) {
	let tasks = JSON.parse(window.localStorage.getItem("tasks"));
	tasks.splice(target, 1);
	window.localStorage.setItem("tasks", JSON.stringify(tasks));
	updateTodoList();
}

function editItem(index) {
	let tasks = JSON.parse(window.localStorage.getItem("tasks"));
	const nuevoTexto = prompt("Edita tu tarea:", tasks[index].name);
	if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
		tasks[index].name = nuevoTexto.trim();
		window.localStorage.setItem("tasks", JSON.stringify(tasks));
		updateTodoList();
	}
}

function borrar() {
	window.localStorage.removeItem("tasks");
	updateTodoList();
}

document.getElementById("borrar").addEventListener("click", borrar);
updateTodoList();
