import * as main from "./main";
const random = require('random')

export function createBenutzerBoard(höhe:number = 10, breite: number = 10) : number[][]{
    if (höhe > 26 || breite > 99 || höhe < 1 || breite < 1) throw 'Höhe muss zwischen 0 und 26 sein, Breite muss zwischen 0 und 99';
    let matrix:number[][] = [];

    for(let i:number = 0; i < höhe; i += 1){
        matrix.push([]);
        for(let j:number = 0; j < breite; j += 1) matrix[i][j] = -1;
    }
    return matrix;
}

export function createBombenBoard(höhe:number = 10, breite: number = 10) : number[][]{
    if (höhe > 26 || breite > 99 || höhe < 1 || breite < 1) throw 'Höhe muss zwischen 0 und 26 sein, Breite muss zwischen 0 und 99';
    let matrix:number[][] = [];

    for(let i:number = 0; i < höhe; i += 1){
        matrix.push([]);
        for(let j:number = 0; j < breite; j += 1){
            if (random.int(0, 99) < main.bombenwahrscheinlichkeit) matrix[i][j] = 9;
            else matrix[i][j] = 0;
        }
    }
    for(let i:number = 0; i < höhe; i += 1){
        for(let j:number = 0; j < breite; j += 1){
            if (matrix[i][j] == 9){
                if(i < höhe-1){
                    if(matrix[i+1][j] != 9) matrix[i+1][j] += 1;
                    if(j < breite-1 && matrix[i+1][j+1] != 9) matrix[i+1][j+1] += 1;
                    if(j > 0 && matrix[i+1][j-1] != 9) matrix[i+1][j-1] += 1;
                }
                if(i > 0){
                    if(matrix[i-1][j] != 9) matrix[i-1][j] += 1;
                    if(j > 0 && matrix[i-1][j-1] != 9) matrix[i-1][j-1] += 1;
                    if(j < breite-1 && matrix[i-1][j+1] != 9) matrix[i-1][j+1] += 1;
                }
                if(j < breite-1 && matrix[i][j+1] != 9) matrix[i][j+1] += 1;
                if(j > 0 && matrix[i][j-1] != 9) matrix[i][j-1] += 1;
            }
        }
    }
    return matrix;
}

export function printBoard(matrix: number[][]){
    main.jetty.moveTo([0,0]).clear();

    let between: string = '  -';
    let numbers: string = '   ';
    for(let i = 0; i < main.breite; i++){
        if(i < 10) numbers += ' ' + i + '  ';
        else numbers += ' ' + i + ' ';
        between += '----'
    }

    main.jetty.moveTo([0,0]).text(numbers);
    main.jetty.moveTo([1,0]).text(between);
    for(let i = 0; i < main.höhe; i += 1){
        let row: string = '' + String.fromCharCode(65+i) + ' | ';
        for(let j = 0; j < main.breite; j += 1){
            if(matrix[i][j] === 9) row += '\x1B[101m\x1b[30mB\x1B[0m';
            else if (matrix[i][j] > 0) row += matrix[i][j];
            else if(matrix[i][j] === 0) row += 'X';
            else if(matrix[i][j] === -1) row += ' ';
            else if(matrix[i][j] === -2) row += '\x1B[46m\x1B[30mF\x1B[0m';
            row += ' | ';
        }
        row += String.fromCharCode(65+i);
        main.jetty.moveTo([i*2+2,0]).text(row);
        main.jetty.moveTo([i*2+3,0]).text(between);
    }
    main.jetty.moveTo([main.messageTiefe-1,0]).text(numbers);
    /*
    main.jetty.moveTo([0,60]).text(numbers);
    main.jetty.moveTo([1,60]).text(between);
    for(let i = 0; i < main.höhe; i += 1){
        let row: string = '' + String.fromCharCode(65+i) + ' | ';
        for(let j = 0; j < main.breite; j += 1){
            if(main.bombenBoard[i][j] === 9) row += '\x1B[101m\x1b[30mB\x1B[0m';
            else if (main.bombenBoard[i][j] > 0) row += main.bombenBoard[i][j];
            else if(main.bombenBoard[i][j] === 0) row += 'X';
            else if(main.bombenBoard[i][j] === -1) row += ' ';
            else if(main.bombenBoard[i][j] === -2) row += '\x1B[46m\x1B[30mF\x1B[0m';
            row += ' | ';
        }
        row += String.fromCharCode(65+i);
        main.jetty.moveTo([i*2+2,60]).text(row);
        main.jetty.moveTo([i*2+3,60]).text(between);
    }
    main.jetty.moveTo([main.messageTiefe-1,60]).text(numbers);
    */
}

function end(){
    printBoard(main.bombenBoard);
    main.jetty.moveTo([main.messageTiefe,0]).text('Sorry, you lost the game. Wanna play again then press: y');
    main.jetty.moveTo([main.messageTiefe+1,0]).text('');
    main.rl.question('', (answer: string) => {
        if(answer === 'y' || answer === 'Y') main.start();
        else main.rl.close();
    });
}

export function clickField(i: number, j: number){
    if(main.benutzerBoard[i][j] !== -1 ){ // if tile was already clicked or flaged -> don't bother
    }else if(main.bombenBoard[i][j] === 9){ // end of game -> printe alle Bomben im benutzerboard und sage das lost ist
        main.changeLoopend()
        end();
    }else if(main.bombenBoard[i][j] === 0) { // if tile is 0 -> check surrounding if also 0 (reqursion) -> if >0 write to benutzerboard
        main.benutzerBoard[i][j] = 0;
        if(i < main.höhe-1) clickField(i+1, j);
        if(i > 0) clickField(i-1, j);
        if(j < main.breite-1) clickField(i, j+1);
        if(j > 0) clickField(i, j-1);
    }else { // if tile is a number, just add the number to the benutzerboard
        main.benutzerBoard[i][j] = main.bombenBoard[i][j];
    }
}

export function checkWin(benutzerBoard:number[][], bombenBoard:number[][]) : boolean{
    for(let i:number = 0; i < main.höhe; i += 1){
        for(let j:number = 0; j < main.breite; j += 1){
            if (
                !
                ( benutzerBoard[i][j] === bombenBoard[i][j] // if that is false -> return false
                  || 
                  (     (   
                            benutzerBoard[i][j] === -2 
                            || 
                            benutzerBoard[i][j] === -1
                        ) 
                        && 
                        bombenBoard[i][j] === 9 
                  ) 
                ) 
               ) 
                return false; // es müssen beide true sein um -> true zu returnen
        }
    }
    return true;
}

export function firstChange(i: number, j:number){
    let cnt:number = 0;
    if(i < main.höhe-1){ 
        if(main.bombenBoard[i+1][j] != 9) main.bombenBoard[i+1][j] -= 1;
        else cnt += 1;
        if(j < main.breite-1){
            if(main.bombenBoard[i+1][j+1] != 9) main.bombenBoard[i+1][j+1] -= 1;
            else cnt += 1;
        }
        if(j > 0){
            if(main.bombenBoard[i+1][j-1] != 9) main.bombenBoard[i+1][j-1] -= 1;
            else cnt += 1;
        }
    }
    if(i > 0){
        if(main.bombenBoard[i-1][j] != 9) main.bombenBoard[i-1][j] -= 1;
        else cnt += 1;
        if(j > 0){
            if(main.bombenBoard[i-1][j-1] != 9) main.bombenBoard[i-1][j-1] -= 1;
            else cnt += 1;
        }
        if(j < main.breite-1){
            if(main.bombenBoard[i-1][j+1] != 9) main.bombenBoard[i-1][j+1] -= 1;
            else cnt += 1;
        }
    }
    if(j < main.breite-1){
        if(main.bombenBoard[i][j+1] != 9) main.bombenBoard[i][j+1] -= 1;
        else cnt += 1;
    }
    if(j > 0){
        if(main.bombenBoard[i][j-1] != 9) main.bombenBoard[i][j-1] -= 1;
        else cnt += 1;
    }  
    main.bombenBoard[i][j] = cnt;
    clickField(i,j);
}
