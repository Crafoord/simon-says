function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

enum Colors {
  RED = 'red',
  YELLOW = 'yellow',
  BLUE = 'blue',
  GREEN = 'green'
}
const colors = [Colors.RED, Colors.YELLOW, Colors.BLUE, Colors.GREEN];

class Simon {
  private roundMoves: Colors[];
  private playerMoves: Colors[];
  private currentPlayerMove: number;
  private playerTurn: boolean;

  constructor() {
    this.roundMoves = [];
    this.playerMoves = [];
    this.currentPlayerMove = 0;
    this.playerTurn = true;

    document.body.addEventListener('click', (event: MouseEvent) => {
      if (
        event.target instanceof Element &&
        colors.some(color => color === (event.target as Element).id)
      ) {
        this.playerMove(event.target.id as Colors);
      }
    });
  }

  public playerMove(color: Colors) {
    if (!this.playerTurn) {
      return;
    }
    if (color !== this.roundMoves[this.currentPlayerMove]) {
      this.reset();
    } else {
      this.playerMoves.push(color);
      this.currentPlayerMove++;
      if (this.playerMoves.length === this.roundMoves.length) {
        setTimeout(() => {
          this.playNextRound();
        }, 1000);
      }
    }
  }

  private reset() {
    this.roundMoves = [];
    this.playerMoves = [];

    colors.forEach(color => {
      this.flash(color);
    });

    setTimeout(() => {
      this.playNextRound();
    }, 1000);
  }

  private playNextRound() {
    this.playerTurn = false;
    this.generateRound();
    let delay = 1000;
    this.roundMoves.forEach(x => {
      setTimeout(() => {
        this.flash(x);
      }, delay);
      delay += 1000;
    });
    setTimeout(() => {
      this.playerTurn = true;
    }, delay);
  }

  private generateRound() {
    this.playerMoves = [];
    this.currentPlayerMove = 0;
    this.roundMoves.push(colors[getRandomInt(0, colors.length)]);
  }

  private flash(color: Colors) {
    const elem = document.getElementById(color) as HTMLElement;

    elem.classList.add('animate');
    function handleAnimationEnd() {
      elem.classList.remove('animate');
      elem.removeEventListener('animationend', handleAnimationEnd);
    }
    elem.addEventListener('animationend', handleAnimationEnd);
  }
}
