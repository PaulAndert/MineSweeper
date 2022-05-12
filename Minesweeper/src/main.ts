import * as logik from "./logik"
const readline = require('readline');
const Jetty = require("jetty");
import { fileURLToPath } from "url";

export let bombenwahrscheinlichkeit = 5; // angabe in %
export let höhe = 10; // angabe in felder anzahl // 0 < x <= 26 
export let breite = 10; // angabe in felder anzahl // 0 < x <= 99
export let messageTiefe = ((höhe+1)*2)+1;

export let benutzerBoard :number[][];
export let bombenBoard :number[][];
export let loopend = false;
export let help = false;
export let first = true;
export const jetty = new Jetty(process.stdout);
export let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export function changeLoopend(){
    if(loopend) loopend = false;
    else loopend = true;
}

export function setbenutzerBoard(board:number[][]){ benutzerBoard = board; }
export function setbombenBoard(board:number[][]){ bombenBoard = board; }

function mainGameLoop(){
    if (logik.checkWin(benutzerBoard, bombenBoard)){
        if (first) logik.printBoard(bombenBoard);
        else logik.printBoard(benutzerBoard);
        jetty.moveTo([messageTiefe,0]).text('You won the game, congratulation! Wanna play again then press: y');
        jetty.moveTo([messageTiefe+1,0]).text('');
        rl.question('', (answer: string) => {
            if(answer === 'y' || answer === 'Y') start();
            else rl.close();
        });
    }else{    
        logik.printBoard(benutzerBoard);
        if(help === true){
            jetty.moveTo([messageTiefe,0]).clearLine().text('Usage:');
            jetty.moveTo([messageTiefe+1,0]).text('a1 or A1 -- clicks the tile A1');
            jetty.moveTo([messageTiefe+2,0]).text('f a2 or f A2 -- flags / unflags the tile A2');
            jetty.moveTo([messageTiefe+3,0]).text('What tile would you like to click or flag?');
            jetty.moveTo([messageTiefe+4,0]).text('');
            help = false;
        }else{
            jetty.moveTo([messageTiefe,0]).text('What tile would you like to click or flag?');
            jetty.moveTo([messageTiefe+1,0]).text('');
        }
        rl.question('', (answer: string) => {
            if(answer === 'help' || answer === 'Help') help = true;
            else{
                const a:string = answer[0];
                const b:string = answer[1];
                const c:string = answer[2];
                const d:string = answer[3];
                const e:string = answer[4];
                if( ( a === 'f' || a === 'F' ) && b === ' '){ // flag mode 'f a1' or 'f a12' or 'F a1'
                    try { 
                        let cNew:number = c.charCodeAt(0);
                        let dNew:number = parseInt(d);
                        let eNew:number = parseInt(e);
                        if(cNew >= 65 && cNew <= 90) cNew -= 65;
                        else if(cNew >= 97 && cNew <= 122) cNew -= 97;

                        if (c !== ' ' && dNew >= 0 && dNew <= 9){
                            if(eNew >= 0 && eNew <= 9) dNew = dNew * 10 + eNew;
                        }else help = true;

                        if(benutzerBoard[cNew][dNew] === -2) benutzerBoard[cNew][dNew] = -1;
                        else benutzerBoard[cNew][dNew] = -2;
                    }
                    catch(e){
                        help = true;
                    }
                }
                else if(a !== undefined && b !== undefined){ // click mode 'a1  ' or 'a12 '
                    try { 
                        let aNew:number = a.charCodeAt(0);
                        let bNew:number = parseInt(b);
                        let cNew:number = parseInt(c);
                        if(aNew >= 65 && aNew <= 90) aNew -= 65;
                        else if(aNew >= 97 && aNew <= 122) aNew -= 97;

                        if (c !== ' ' && bNew >= 0 && bNew <= 9){
                            if(cNew >= 0 && cNew <= 9) bNew = bNew * 10 + cNew;
                        }else help = true;
                        
                        if (first){
                            if(bombenBoard[aNew][bNew] === 9) logik.firstChange(aNew, bNew);
                            else logik.clickField(aNew, bNew);
                            first = false;
                        }
                        else logik.clickField(aNew, bNew);
                    }
                    catch(e){
                        help = true;
                    }
                }else help = true;
            }
            if(loopend === false) mainGameLoop();
        });
    }
}

function option(){
    jetty.moveTo([0,0]).moveTo([0,0]).clear().text('-----------------------------------------------------------------');
    if (höhe > 9) jetty.moveTo([1,0]).text(`| 1: height: ${höhe} [Min: 1, Max: 26]                               |`);
    else jetty.moveTo([1,0]).text(`| 1: height: ${höhe} [Min: 1, Max: 26]                                |`);
    jetty.moveTo([2,0]).text('|                                                               |');
    if (breite > 9) jetty.moveTo([3,0]).text(`| 2: width: ${breite} [Min: 1, Max: 99]                                |`);
    else jetty.moveTo([3,0]).text(`| 2: width: ${breite} [Min: 1, Max: 99]                                 |`);
    jetty.moveTo([4,0]).text('|                                                               |');
    if (bombenwahrscheinlichkeit > 9) jetty.moveTo([5,0]).text(`| 3: bomb probability: ${bombenwahrscheinlichkeit} % [Min: 1, Max: 99]                   |`);
    else jetty.moveTo([5,0]).text(`| 3: bomb probability: ${bombenwahrscheinlichkeit} %  [Min: 1, Max: 99]                   |`);
    jetty.moveTo([6,0]).text('|                                                               |');
    jetty.moveTo([7,0]).text('| edit like that:                                               |');
    jetty.moveTo([8,0]).text('| number newValue, 1 20 -> new height is 20                     |');
    jetty.moveTo([9,0]).text('|                                                               |');
    jetty.moveTo([10,0]).text('| b: back to start screen                                       |');
    jetty.moveTo([11,0]).text('-----------------------------------------------------------------');
    jetty.moveTo([12,0]).text('');

    rl.question('', (answer: string) => {
        if(answer === 'b' || answer === 'B') start();
        else{
            const a:number = parseInt(answer[0]); // variable
            let b:number = parseInt(answer[2]); // number
            const c:number = parseInt(answer[3]); // number
            if (b >= 0 && b <= 9 && c >= 0 && c <= 9) b = b * 10 + c;
            
            if(a === 1 && (1 <= b && b <= 26)){
                höhe = b;
                messageTiefe = ((höhe+1)*2)+1;
                option();
            }else if(a === 2 && (1 <= b && b <= 99)){
                breite = b;
                option();
            }else if(a === 3 && (1 <= b && b <= 99)){
                bombenwahrscheinlichkeit = b;
                option();
            }else option();
        }
    });
}

export function start(){
    jetty.moveTo([0,0]).moveTo([0,0]).clear().text('-----------------------------------------------------------------');
    jetty.moveTo([1,0]).text(String.raw`|  __  __  _             ___                                    |`);
    jetty.moveTo([2,0]).text(String.raw`| |  \/  |(_) _ _   ___ / __|__ __ __ ___  ___  _ __  ___  _ _  |`);
    jetty.moveTo([3,0]).text(String.raw`| | |\/| || || ' \ / -_)\__ \\ V  V // -_)/ -_)| '_ \/ -_)| '_| |`);
    jetty.moveTo([4,0]).text(String.raw`| |_|  |_||_||_||_|\___||___/ \_/\_/ \___|\___|| .__/\___||_|   |`);
    jetty.moveTo([5,0]).text(String.raw`|                                              |_|              |`);
    jetty.moveTo([6,0]).text('|                                                               |');
    jetty.moveTo([7,0]).text('|  s: Start                                                     |');
    jetty.moveTo([8,0]).text('|  o: Options                                                   |');
    jetty.moveTo([9,0]).text('|  q: Quit                                                      |');
    jetty.moveTo([10,0]).text('|                                                               |');
    jetty.moveTo([11,0]).text('-----------------------------------------------------------------');
    jetty.moveTo([12,0]).text('');

    rl.question('', (answer: string) => {
        if(answer === 's' || answer === 'S'){
            benutzerBoard = logik.createBenutzerBoard(höhe, breite);
            bombenBoard = logik.createBombenBoard(höhe, breite);
            loopend = false;
            first = true;
            mainGameLoop();
        }else if(answer === 'o' || answer === 'O') option();
        else if(answer === 'q' || answer === 'Q') rl.close();
        else start();
    });
}

if (require.main === module) { start(); }