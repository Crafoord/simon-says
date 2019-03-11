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

  constructor() {
    this.roundMoves = [];
    this.playerMoves = [];

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
    // wrong answer = flash all and restart
    // finished = create new harder round and start it
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
