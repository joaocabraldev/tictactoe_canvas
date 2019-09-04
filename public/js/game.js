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
    textPositions: [
        [25, 60], [90, 60], [160, 60],
        [25, 140], [90, 140], [160, 140],
        [25, 210], [90, 210], [160, 210]
    ],

    init() {
        this.canvas = document.getElementById('canvas');
        this.canvas.addEventListener('click', this.draw_play, true);
        this.context = this.canvas.getContext('2d');
        this.context.font = '48px serif';
        this.draw_board();
    },

    draw_board() {
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
        let x = evt.clientX - canvas.offsetLeft;
        let y = evt.clientY - canvas.offsetTop;

        console.clear();
        console.log("Posição do clique: x:", x + ", y: " + y);
        let cell = view.check_cell(x, y);
        console.log("Clicou na célula " + cell + "!");
        view.write_cell(cell);
        view.context.fillText('X', cell[0], cell[1]);
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
        view.context.fillText('X', cell[0], cell[1]);
        console.log('Wrote cell');
    }
}


/*
function draw() {
    let canvas = document.getElementById('tutorial');
    canvas.addEventListener('click', clicked, true);

    if (canvas.getContext){
        let ctx = canvas.getContext('2d');
        
        //ctx.strokeRect(10, 10, 80, 80);

        /*
        ctx.strokeStyle = '#000000';
        ctx.strokeRect(10, 10, 70, 70);
        ctx.strokeRect(10, 10, 70, 70);

        ctx.font = '48px serif';
        ctx.fillText('X', 25, 60);

        ctx.strokeRect(80, 10, 70, 70);
        ctx.strokeRect(80, 10, 70, 70);

        ctx.strokeRect(150, 10, 70, 70);
        ctx.strokeRect(150, 10, 70, 70);


        ctx.strokeRect(10, 80, 70, 70);
        ctx.strokeRect(10, 80, 70, 70);

        ctx.strokeRect(80, 80, 70, 70);
        ctx.strokeRect(80, 80, 70, 70);
        
        ctx.strokeRect(150, 80, 70, 70);
        ctx.strokeRect(150, 80, 70, 70);


        ctx.strokeRect(10, 150, 70, 70);
        ctx.strokeRect(10, 150, 70, 70);

        ctx.strokeRect(80, 150, 70, 70);
        ctx.strokeRect(80, 150, 70, 70);
        
        ctx.strokeRect(150, 150, 70, 70);
        ctx.strokeRect(150, 150, 70, 70);
        
    }
}

function clicked(evt) {

    let canvas = document.getElementById("tutorial");

    // posição dos cliques descontando a distância da borda da janela
    let x = evt.clientX - canvas.offsetLeft;
    let y = evt.clientY - canvas.offsetTop;

    console.clear();
    console.log("Posição do clique: x:", x + ", y:" + y);

    for (let i = 0; i < view.positions.length; i++) {
        const p = view.positions[i];
        if (x > p[0] && x < p[1] && y > p[2] && y < p[3]) {
            let cell = i + 1;
            console.log("Clicou na célula " + (i+1) + "!");
        }
    }

}
*/
