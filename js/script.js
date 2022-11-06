 
const eleSelectLevel = document.querySelector('#select-level');
const eleGrid = document.querySelector('.grid');
const eleButtonPlay = document.querySelector('.button-color');
const eleStartScreen = document.querySelector('.start-screen');
let arrMines; 
let score;
let maxScore;

eleButtonPlay.addEventListener('click',function(){
    score = 0; 
	const nCells = parseInt(eleSelectLevel.value);
	const nMines = 16;
	maxScore = nCells - nMines;
	arrMines = generateMines(nMines, 1, nCells);
	console.log(arrMines.sort((a, b) => a - b));
    
    eleGrid.innerHTML= '';
    
    if(eleButtonPlay.dataset.state == '0'){
        
        eleStartScreen.classList.add('hidden');
        eleButtonPlay.dataset.state = '1';
        const nCells = parseInt(eleSelectLevel.value);
        const sideSquare= Math.sqrt(nCells); 
        
        
        
        
        for (let i = 1; i <= nCells; i++) { 
            const eleCell = document.createElement('div');
        eleCell.innerHTML=i;
        eleCell.classList.add('cell');
        eleCell.style.width= `calc(100% / ${sideSquare})`;
        eleCell.style.height= `calc(100% / ${sideSquare})`;
        eleGrid.append(eleCell);
        eleCell.addEventListener('click', toggleCell);
  
    }   
} else if (eleButtonPlay.dataset.state == '1') {
    
    eleButtonPlay.dataset.state = '0';    
    eleStartScreen.classList.remove('hidden');
}


});


function toggleCell() {
	
	const cellNumber = parseInt(this.innerHTML);

	if (arrMines.includes(cellNumber)) { 
		this.classList.add('mine');
		disableAllCells(true);
        const eleResult = document.createElement('div');
        eleGrid.classList.add('result');
        eleGrid.append(eleResult);
        eleResult.innerHTML=('Mi dispiace, hai perso, il tuo punteggio è: ' + score);
	} else {
		this.removeEventListener('click', toggleCell); 
		score++; 
		this.classList.add('no-mine');
		if (score == maxScore) {
			disableAllCells(false);
            const eleResult = document.createElement('div');
            eleGrid.classList.add('result');
            eleGrid.append(eleResult);
            eleResult.innerHTML=('Complimenti hai vinto! Il tuo punteggio è: ' + score);
		}
	}
}

function generateMines(nMines, min, max) {
	const arrRandoms = [];
	for (let i = 0; i < nMines; i++) {
		do {
			randomNumber = getRandomInteger(min, max);
		} while (arrRandoms.includes(randomNumber))
		arrRandoms.push(randomNumber);
	}
	return arrRandoms;
}

function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function disableAllCells(showMines) {
	const listCells = eleGrid.querySelectorAll('.cell');
	// console.log(listCells);
	for (let i = 0; i < listCells.length; i++) {
		const cellNumber = parseInt(listCells[i].innerHTML);
		if (showMines && arrMines.includes(cellNumber)) {
			listCells[i].classList.add('mine');
		}
		listCells[i].removeEventListener('click', toggleCell);
	}
}