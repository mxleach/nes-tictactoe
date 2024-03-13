import  { useState } from 'react';
import PropTypes from 'prop-types';
import 'nes.css/css/nes.min.css';
import './App.css'

// square component
function Square({ value, onSquareClick }) {
  return (
    <button className={`square nes-btn ${value ? 'is-primary' : ''}`} onClick={onSquareClick}>
       {value}
    </button>
    );
}

// gameboard
function Board({ squares, onPlay }) {
  const renderSquare = (i) => (
    <Square value={squares[i]} onSquareClick={() => onPlay(i)} />
  );
  return (
    <div className="board">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="square">
          {renderSquare(i)}
        </div>
      ))}
    </div>
  );
}


// load menu overlay retro
function Menu({ onStartGame, onChooseSymbol }) {
  return (
    <div id="menu-overlay">
    <h1 className="game-title nes-text is-centered is-primary">Tic Tac Toe</h1>
    <div id="menu-div" className="nes-container is-rounded is-dark">
        <p className="nes-text title">Choose A Side</p>
        <div className="choices">
          <label>
            <input type="radio" className="nes-radio" name="choice" onClick={() => onChooseSymbol('X')} />
            <span>Play as X</span>
          </label>
          <label>
            <input type="radio" className="nes-radio" name="choice" onClick={() => onChooseSymbol('O')} />
            <span>Play as O</span>
          </label>
        </div>
        <div className="menu-buttons">
          <button className="nes-btn is-primary" onClick={() => onStartGame('bot')}>Play vs Bot</button> 
          <button className="nes-btn is-primary" onClick={() => onStartGame('local')}>Play Local</button>
        </div>
      </div>
    </div>
  );
}



//bot logic after line 50 




  export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]); // game history
    const [currentMove, setCurrentMove] = useState(0); // use state for current move status
    const [xIsNext, setXIsNext] = useState(true); // use state for player turn 
    const [screen, setScreen] = useState('menu'); // menu screen component
    const [playerSymbol, setPlayerSymbol] = useState(null); // x or o, select player symbol



    
    const currentSquares = history[currentMove];
    const winner = calculateWinner(currentSquares);
    const noMovesLeft = currentSquares.every(square => square !== null);
  
    function handlePlay(i) {
// handle the player turn, switch role, update board state
      if (currentSquares[i] || winner) 
        return; 
        const newSquares = currentSquares.slice();
      newSquares[i] = xIsNext ? 'X' : 'O'; 
      setHistory([...history.slice(0, currentMove + 1), newSquares]);
    setCurrentMove(currentMove + 1);
    setXIsNext(!xIsNext);

    console.log('Updated history: ', history); // keep track of history
  }

// updates move for history and correct player turn 
    function jumpTo(nextMove) {
      setCurrentMove(nextMove);
      setXIsNext(nextMove % 2 === 0);
  
    }

// initialize game state according to user-player selection 
    function startGame() {
      setScreen('game');
      // Set xIsNext based on whether the player chose 'X'
      setXIsNext(playerSymbol === 'X');
    }
    
    // set symbol
    function chooseSymbol(symbol) {
      setPlayerSymbol(symbol);
    }
    

   

    
// history map
    const moves = history.map((squares, move) => {
      let description = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button className="nes-btn" onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });
//menu logic
  if (screen === 'menu') {
    return <Menu onStartGame={startGame} onChooseSymbol={chooseSymbol} />;
  }

    
    return (
      
      <div className="game-container">
      <h1 className="game-title nes-text is-primary">Tic Tac Toe</h1>
      
      <div className='game-layout'>
      <div id="move-history" className="move-history nes-container with-title is-centered is-dark is-primary">
      <p className="title">Move History</p>
      <ol className="nes-list">{moves}</ol>
            </div>
      
      
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
     <div className='container'>
      <div className="game-status nes-container is-dark"> 
      <div className="nes-text">
                {winner ? `Winner: ${winner}` : noMovesLeft ? "No moves left" : `Next player: ${xIsNext ? "X" : "O"}`}
              </div>
      </div>
      <div className='scoreboard nes-container is-dark'>
            
            
      {/* <div className="status-box nes-container is-dark"> */}
            
              scoreboard
             
            
      </div>
      </div>
       </div>
       </div>
  
    );
  
    }
    

 
 // winner function

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

Square.propTypes = {
  value: PropTypes.string,
  onSquareClick: PropTypes.func.isRequired,
};

Board.propTypes = {
  xIsNext: PropTypes.bool.isRequired,
  squares: PropTypes.arrayOf(PropTypes.string).isRequired,
  //onPlay: PropTypes.func.isRequired,
};

Menu.propTypes = {
  onStartGame: PropTypes.func.isRequired,
  onChooseSymbol: PropTypes.func.isRequired,
};