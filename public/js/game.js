const view = {
    positions: [
        [10, 80, 10, 80], [81, 150, 10, 80], [151, 220, 10, 80],
        [10, 80, 81, 150], [81, 150, 81, 150], [151, 220, 81, 150],
        [10, 80, 151, 220], [81, 150, 151, 220], [151, 220, 151, 220]
    ],
    textPositions: [
        [25, 60], [], [],
        [], [], [],
        [], [], []
    ]
}

function draw() {
    let canvas = document.getElementById('tutorial');
    canvas.addEventListener('click', clicked, true);

    if (canvas.getContext){
        let ctx = canvas.getContext('2d');
        
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
    console.log("Posição do clique: x: ", x + ", y: " + y);

    for (let i = 0; i < view.positions.length; i++) {
        const p = view.positions[i];
        if (x > p[0] && x < p[1] && y > p[2] && y < p[3]) {
            let cell = i + 1;
            console.log("Clicou na célula " + cell + "!");
        }
    }

}
