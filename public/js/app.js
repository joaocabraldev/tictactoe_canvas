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
        
        this.btn_reset = document.getElementById('btn_reset');
        this.btn_reset.addEventListener('click', this.reset_board, true);
        
        this.context = this.canvas.getContext('2d');
        this.context.font = '48px serif';
        this.draw_board();
        game.init();
        this.show_player();
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
            
            game.fill_board(cell);
            game.check_winner();

            if (game.game_winner == 'N') {
                game.change_player();
                view.show_player();
            } else {
                view.fill_winner();
            }
        }
    },

    reset_board() {
        console.log('Reset Canvas');
        game.init();
        view.context.clearRect(0,0, 230, 230);
        view.draw_board();
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
        this.context.fillText(game.options[game.turn], x, y);
    },
    
    fill_board(index) {
        game.board[index-1] = game.options[game.turn];
        console.log(game.board);
    },
    
    change_player() {
        this.turn = (this.turn === 0 ? 1 : 0);
        this.show_player();
    },

    show_player() {
		let player = document.getElementById('player');
		player.innerHTML = game.options[game.turn];
	},
    
    fill_winner() {
        let index = game.winner_index;
        let a_index = game.winning_sequences[index][0];
        let b_index = game.winning_sequences[index][1];
        let c_index = game.winning_sequences[index][2];
        
        let h = this.dimensions.height;
        let w = this.dimensions.width;

        this.context.fillStyle = 'lightgreen';
        this.context.rectStyle = 'black';
        const pos_a = this.positions[a_index];
        this.context.fillRect(pos_a[0], pos_a[1], w, h);
        this.context.strokeRect(pos_a[0], pos_a[1], w, h);
        this.context.strokeRect(pos_a[0], pos_a[1], w, h);
        
        const pos_b = this.positions[b_index];
        this.context.fillRect(pos_b[0], pos_b[1], w, h);
        this.context.strokeRect(pos_b[0], pos_b[1], w, h);
        this.context.strokeRect(pos_b[0], pos_b[1], w, h);

        const pos_c = this.positions[c_index];
        this.context.fillRect(pos_c[0], pos_c[1], w, h);
        this.context.strokeRect(pos_c[0], pos_c[1], w, h);
        this.context.strokeRect(pos_c[0], pos_c[1], w, h);

        this.context.fillStyle = 'black';
        this.write_cell(a_index + 1);
        this.write_cell(b_index + 1);
        this.write_cell(c_index + 1);
    }
}
