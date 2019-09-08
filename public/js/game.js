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
    game_winner: 'N',
    winner_index: -1,
    
    init() {
        this.board = ['','','','','','','','',''];
        this.game_over = false;
        this.game_winner = 'N';
    },

    fill_board(index) {
        this.board[index-1] = this.options[this.turn];
        console.log('Game Board: ');
        console.log(this.board);
    },

    change_player() {
        this.turn = (this.turn === 0 ? 1 : 0);
    },

    check_winner() {
        let symbol = this.options[this.turn];
        if (!this.board.includes('')) {
            this.game_over = true;
            this.game_winner = 'D';
        }

		for (i in this.winning_sequences) {
			if(this.board[this.winning_sequences[i][0]] == symbol &&
				this.board[this.winning_sequences[i][1]] == symbol &&
				this.board[this.winning_sequences[i][2]] == symbol) {
				
				this.game_over = true;
                this.game_winner = symbol;
                this.winner_index = i;
			}
        }
    }
}
