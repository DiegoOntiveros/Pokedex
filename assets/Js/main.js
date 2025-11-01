function onlyLetters(event){

	const pressedkey = event.key;
	const letters = [
  "A","B","C","D","E","F","G","H","I","J","K","L","M",
  "N","O","P","Q","R","S","T","U","V","W","X","Y","Z",

  "a","b","c","d","e","f","g","h","i","j","k","l","m",
  "n","o","p","q","r","s","t","u","v","w","x","y","z",

  "á","é","í","ó","ú","ü",
  "Á","É","Í","Ó","Ú","Ü",

  "ñ","Ñ"
];


	if (!letters.includes(pressedkey)) {
		return false
	}

}


function validarEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function Telefono(event){

	const pressedkey = event.key;
	const letters = ["0","1","2","3","4","5","6","7","8","9",];


	if (!letters.includes(pressedkey)) {
		return false
	}

}

