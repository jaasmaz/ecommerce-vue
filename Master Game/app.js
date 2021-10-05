function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        }
    },
    computed: {
        getMonsterHealthBar() {
            if (this.monsterHealth < 0) {
                return { width: '0%' };
            }
            return { width: this.monsterHealth + '%' };
        },
        getPlayerHealthBar() {
            if (this.playerHealth < 0) {
                return { width: '0%' };
            }
            return { width: this.playerHealth + '%' };
        },
        useSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                //Draw
                this.winner = 'draw';

            } else if (value <= 0) {
                //Player Lost
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                //Draw
                this.winner = 'draw';
            } else if (value <= 0) {
                //Monster Lost
                this.winner = 'player';
            }
        }
    },
    methods: {
        newGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMessages = [];
        },
        attackMonster() {
            this.currentRound++;
            const attackValu = getRandom(5, 12);
            this.monsterHealth -= attackValu;
            this.AddLogMessage('player', 'attack', attackValu);
            this.attackPlayer();

        },
        attackPlayer() {
            const attackValu = getRandom(8, 15);
            this.playerHealth -= attackValu;
            this.AddLogMessage('monster', 'attack', attackValu);
        },
        specialAttackMonster() {
            this.currentRound++;
            const attackValu = getRandom(1, 25);
            this.monsterHealth -= attackValu;
            this.AddLogMessage('player', 'attack', attackValu);
            this.attackPlayer();
        },
        healPlayer() {
            const healValue = getRandom(8, 20);
            const newHealthValu = healValue + this.playerHealth;
            if (newHealthValu > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth = newHealthValu;
            }

            this.AddLogMessage('player', 'heal', healValue);

            this.attackPlayer();
            ;
        },
        surrender() {
            this.winner = 'monster';
        },
        AddLogMessage(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    }
});

app.mount("#game");