describe('game', function() {
    const game = require('../public/js/game.js');
    
    beforeEach(function() {
        
    });
    
    it('deve inicializar', function() {
        game.init();
        expect(game.board).toEqual(['','','','','','','','','']);
        expect(game.game_over).toBe(false);
        expect(game.game_winner).toBe('N');
    });
    
    it('deve trocar o jogador', function() {
        game.change_player();
        expect(game.turn).toBe(1);
    });
});
