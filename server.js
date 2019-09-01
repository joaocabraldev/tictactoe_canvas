let express = require('express');
let app = express();

app.use(express.static('public'));

app.listen(3000, function () {
    console.log('Jogo da Velha rodando na porta 3000!');
});

