import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

function Square(props) {
    return (
        <button className={'square ' + props.border}
                onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        switch (i) {
            case 0:
                return <Square
                        value={this.props.squares[i]}
                        onClick={() => this.props.onClick(i)}
                        border="no-border-top no-border-left"/>;
            case 1:
                return <Square
                        value={this.props.squares[i]}
                        onClick={() => this.props.onClick(i)}
                        border="no-border-top"/>;
            case 2:
                return <Square
                        value={this.props.squares[i]}
                        onClick={() => this.props.onClick(i)}
                        border="no-border-top no-border-right"/>;
            case 3:
                return <Square
                        value={this.props.squares[i]}
                        onClick={() => this.props.onClick(i)}
                        border="no-border-left"/>;
            case 5:
                return <Square
                        value={this.props.squares[i]}
                        onClick={() => this.props.onClick(i)}
                        border="no-border-right"/>;
            case 6:
                return <Square
                        value={this.props.squares[i]}
                        onClick={() => this.props.onClick(i)}
                        border="no-border-bottom no-border-left"/>;
            case 7:
                return <Square
                        value={this.props.squares[i]}
                        onClick={() => this.props.onClick(i)}
                        border="no-border-bottom"/>;
            case 8:
                return <Square
                        value={this.props.squares[i]}
                        onClick={() => this.props.onClick(i)}
                        border="no-border-right no-border-bottom"/>;
            default:
                return <Square
                        value={this.props.squares[i]}
                        onClick={() => this.props.onClick(i)}/>
        }
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';

            return (
                <li key={move}>
                    <button className="history-button" onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        });

        let status;

        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares}
                           onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div className="game-status">{status}</div>
                    <span>History</span>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// =====================================

ReactDOM.render(<Game />, document.getElementById('root'));

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}