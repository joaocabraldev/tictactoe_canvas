const game = {
	options: ['X', 'O'],
	turn: 0,
	board: ['','','','','','','','',''],
	winning_sequences: [
		[0,1,2], [3,4,5], [6,7,8],
		[0,3,6], [1,4,7], [2,5,8],
		[0,4,8], [2,4,6]
	],
	game_over: false,

	init() {
        this.cleanBoard();

		let elements = document.querySelectorAll('.cell');
		for(let i = 0; i < elements.length; i++) {
            elements[i].onclick = function() { game.playOnClick(elements[i]); };
        }
        
        let btn_reset = document.getElementById('btn_reset');
        btn_reset.onclick = function() { game.init(); };
		
		this.showPlayer();
	},

	playOnClick(element) {
		if (!this.game_over) {
			element.innerHTML = '';
		
			let spanCell = document.createElement('span');
			spanCell.innerHTML = this.options[this.turn];
			
			element.appendChild(spanCell);
			
			this.fillBoard(element);
			this.checkWinner(this.options[this.turn]);
			this.changePlayer();
		}
	},
	
	showPlayer() {
		let player = document.getElementById('player');
		player.innerHTML = this.options[this.turn];
	},
	
	changePlayer() {
		this.turn = (this.turn === 0 ? 1 : 0);
		this.showPlayer();
	},
	
	fillBoard(element) {
		let id = element.getAttribute("id");
		this.board[id] = this.options[this.turn];
	},
	
	cleanBoard() {
		let elements = document.querySelectorAll('.cell');
		for(let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = '';
            elements[i].classList.remove('winner');
        }
        this.game_over = false;
		this.board = ['','','','','','','','',''];
	},
	
	checkWinner(symbol) {
        if (!this.board.includes('')) {
            this.game_over = true;
            console.log('It is a draw!');
        }

		for (i in this.winning_sequences) {
			if(this.board[this.winning_sequences[i][0]] == symbol &&
				this.board[this.winning_sequences[i][1]] == symbol &&
				this.board[this.winning_sequences[i][2]] == symbol) {
				
				this.game_over = true;
                this.fillWinner(i);
				console.log(this.winning_sequences[i]);
                console.log('Player ' + symbol +  ' won!');
			
			}
		}
    },
    
    fillWinner(index) {
        let a_index = this.winning_sequences[index][0];
        let b_index = this.winning_sequences[index][1];
        let c_index = this.winning_sequences[index][2];
        
        let elements = document.querySelectorAll('.cell');

        elements[a_index].classList.add('winner');
        elements[b_index].classList.add('winner');
        elements[c_index].classList.add('winner');
    }

}

game.init();
