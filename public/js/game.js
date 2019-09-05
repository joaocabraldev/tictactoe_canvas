const view = {
    canvas: {},
    context: {},
    dimensions: {
        height: 70,
        width: 70
    },
    positions: [
        [10, 10], [80, 10], [150, 10],
        [10, 80], [80, 80], [150, 80],
        [10, 150], [80, 150], [150, 150]
    ],
    areas: [
        [10, 80, 10, 80], [81, 150, 10, 80], [151, 220, 10, 80],
        [10, 80, 81, 150], [81, 150, 81, 150], [151, 220, 81, 150],
        [10, 80, 151, 220], [81, 150, 151, 220], [151, 220, 151, 220]
    ],
    text_positions: [
        [25, 60], [90, 60], [160, 60],
        [25, 140], [90, 140], [160, 140],
        [25, 210], [90, 210], [160, 210]
    ],
    
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
        this.canvas = document.getElementById('canvas');
        this.canvas.addEventListener('click', this.draw_play, true);
        
        this.btn_reset = document.getElementById('reset');
        //this.canvas.addEventListener('click', this.reset_board, true);
        
        this.context = this.canvas.getContext('2d');
        this.context.font = '48px serif';
        this.draw_board();
    },

    draw_board() {
        this.context.clearRect(0,0,230,230);
        let h = this.dimensions.height;
        let w = this.dimensions.width;

        this.context.strokeStyle = 'black';
        for (let i = 0; i < this.positions.length; i++) {
            const pos = this.positions[i];
            this.context.strokeRect(pos[0], pos[1], w, h);          
            this.context.strokeRect(pos[0], pos[1], w, h);
        }
    },

    draw_play(evt) {
        if (!view.game_over) {
            let x = evt.clientX - canvas.offsetLeft;
            let y = evt.clientY - canvas.offsetTop;
            let cell = view.check_cell(x, y);

            view.write_cell(cell);
            view.context.fillText(view.options[view.turn], cell[0], cell[1]);
            
            view.fill_board(cell);
            view.check_winner(view.options[view.turn]);
            view.change_player();
        }
    },
    
    check_cell(x, y) {
        for (let i = 0; i < this.areas.length; i++) {
            const p = this.areas[i];
            if (x > p[0] && x < p[1] && y > p[2] && y < p[3]) {
                return i + 1;
            }
        }
    },

    write_cell(cell) {
        let pos = cell - 1;
        let x = this.text_positions[pos][0];
        let y = this.text_positions[pos][1];
        this.context.fillText(this.options[this.turn], x, y);
    },
    
    fill_board(index) {
        this.board[index-1] = this.options[this.turn];
        console.log(this.board);
    },
    
    change_player() {
        this.turn = (this.turn === 0 ? 1 : 0);
    },
    
    check_winner(symbol) {
        if (!this.board.includes('')) {
            this.game_over = true;
            console.log('It is a draw!');
        }

		for (i in this.winning_sequences) {
			if(this.board[this.winning_sequences[i][0]] == symbol &&
				this.board[this.winning_sequences[i][1]] == symbol &&
				this.board[this.winning_sequences[i][2]] == symbol) {
				
				this.game_over = true;
                this.fill_winner(i);
				console.log(this.winning_sequences[i]);
                console.log('Player ' + symbol +  ' won!');
			
			}
		}
    },
    
    fill_winner(index) {
        let a_index = this.winning_sequences[index][0];
        let b_index = this.winning_sequences[index][1];
        let c_index = this.winning_sequences[index][2];
        
        /*
        TODO: Learn how to fill rectangles or redraw them.
        let elements = document.querySelectorAll('.cell');

        elements[a_index].classList.add('winner');
        elements[b_index].classList.add('winner');
        elements[c_index].classList.add('winner');
        */
    }
}
