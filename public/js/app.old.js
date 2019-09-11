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

    draw_rect(x, y) {
        let h = this.dimensions.height;
        let w = this.dimensions.width;

        this.context.strokeStyle = 'black';
        this.context.strokeRect(x, y, w, h);          
        this.context.strokeRect(x, y, w, h);
    },

    clear_canvas() {
        this.context.clearRect(0,0,230,230);
    },

    draw_board() {
        this.clear_canvas();
        for (let i = 0; i < this.positions.length; i++) {
            this.draw_rect(this.positions[i][0], this.positions[i][1]);
        }
    },

    draw_play(evt) {
        if (!game.game_over) {
            let x = evt.clientX - canvas.offsetLeft;
            let y = evt.clientY - canvas.offsetTop;
            let cell = view.check_cell(x, y);

            view.write_cell(cell);
            view.context.fillText(game.options[game.turn], cell[0], cell[1]);
            
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
        game.init();
        view.clear_canvas();
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

        this.context.fillStyle = 'black';
        this.context.fillText(game.options[game.turn], x, y);
    },

    paint_cell(x, y) {
        const h = this.dimensions.height;
        const w = this.dimensions.width;

        this.context.fillStyle = 'lightgreen';
        this.context.fillRect(x, y, w, h);
    },
    
    fill_board(index) {
        game.board[index-1] = game.options[game.turn];
        console.log(game.board);
    },

    show_player() {
		let player = document.getElementById('player');
		player.innerHTML = game.options[game.turn];
	},
    
    fill_winner() {
        const index = game.winner_index;

        const a_index = game.winning_sequences[index][0];
        const b_index = game.winning_sequences[index][1];
        const c_index = game.winning_sequences[index][2];
        
        const pos_a = this.positions[a_index];
        const pos_b = this.positions[b_index];
        const pos_c = this.positions[c_index];

        this.paint_cell(pos_a[0], pos_a[1]);
        this.draw_rect(pos_a[0], pos_a[1]);
        
        
        this.paint_cell(pos_b[0], pos_b[1]);
        this.draw_rect(pos_b[0], pos_b[1]);

        this.paint_cell(pos_c[0], pos_c[1]);
        this.draw_rect(pos_c[0], pos_c[1]);

        this.write_cell(a_index + 1);
        this.write_cell(b_index + 1);
        this.write_cell(c_index + 1);
    }
}
