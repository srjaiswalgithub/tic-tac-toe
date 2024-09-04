import Card from '../Cards/Card'
import {useState} from 'react'
import './Grid.css'
import Winner from '../../Declare_winner/Winner'

function Grid({numberOfCard}){
    const [board,setBoard] = useState(Array(numberOfCard).fill(""));
    const [turn,setTurn] = useState(true) //true->O,false->X
    const [winner,setWinner] = useState(null);
    const [tie,setTie] = useState(0);
    function play(index){
        
        if(turn == true){
            board[index] = 'O';
        }
        else board[index] = 'X';
        setTie(tie+1);
        const win = Winner(board,(turn)? 'O' : 'X');
        if(win){
            setWinner(win);
            setTie(0);
        }
        setBoard([...board]);
        setTurn(!turn);

    }

    function reset(){
        
        setBoard(Array(numberOfCard).fill(""));
        setWinner(null);
        setTurn(true);
        setTie(0);
    }
    return (
        <div>

            {
                winner && (
                    <>
                        <h1 className = "text-highlight">Winner is :<span>{winner}</span></h1>
                        <button className = "reset" onClick = {()=> reset()}>Reset Game</button>
                    </>
                )
            }
            <div className = "text-highlight">
                <h1>Current Turn : {(turn)? 'O':'X'}</h1>
            </div>
            <div className = "grid">
                {board.map((el,idx)=><Card key = {idx}  gameEnd = {winner? true:false} player = {el} onPlay = {play}  index = {idx}/>)}
            </div>
            {
                !winner && tie==9 && (
                    <>
                        <button className = "playagain" onClick = {()=> reset()}>Play again!!</button>
                    </>
                )
            }
        </div>

        
    )
}
export default Grid;