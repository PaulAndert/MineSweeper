import * as main from "./main"
import * as logik from "./logik"

//LOGIK.TS

describe('tests zur funktion createBenutzerBoard()', () => {
    test('gibt createBenutzerBoard das zurück was es soll', () => {
        const a = 10;
        const b = 10;
        let matrix:number[][] = [];
        for(let i:number = 0; i < a; i += 1){
            matrix.push([]);
            for(let j:number = 0; j < b; j += 1) matrix[i][j] = -1;
        }
        expect(logik.createBenutzerBoard(a,b)).toStrictEqual(matrix);
    })
    test('exception zu große höhe', () => {
        const a = 30;
        const b = 10;
        expect(() => logik.createBenutzerBoard(a,b)).toThrow("Höhe muss zwischen 0 und 26 sein, Breite muss zwischen 0 und 99");
    })
    test('exception zu kleine breite', () => {
        const a = 10;
        const b = 0;
        expect(() => logik.createBenutzerBoard(a,b)).toThrow("Höhe muss zwischen 0 und 26 sein, Breite muss zwischen 0 und 99");
    })
    test('keine exception wenn keine werte übermittelt werden', () => {
        const a = 10;
        const b = 10;
        let matrix:number[][] = [];
        for(let i:number = 0; i < a; i += 1){
            matrix.push([]);
            for(let j:number = 0; j < b; j += 1) matrix[i][j] = -1;
        }
        expect(logik.createBenutzerBoard(a,b)).toStrictEqual(matrix);
    })
});

describe('tests zur funktion createBombenBoard()', () => {
    test('exception zu große höhe', () => {
        const a = 30;
        const b = 10;
        expect(() => logik.createBombenBoard(a,b)).toThrow("Höhe muss zwischen 0 und 26 sein, Breite muss zwischen 0 und 99");
    })
    test('exception zu kleine breite', () => {
        const a = 10;
        const b = 0;
        expect(() => logik.createBombenBoard(a,b)).toThrow("Höhe muss zwischen 0 und 26 sein, Breite muss zwischen 0 und 99");
    })
});

describe('tests zur funktion clickField()', () => {
    // Aufstellen der Boards
    let matrix:number[][] = []; // benutzerBoard
    for(let i:number = 0; i < 10; i += 1){
        matrix.push([]);
        for(let j:number = 0; j < 10; j += 1) matrix[i][j] = -1;
    }
    main.setbenutzerBoard(matrix);

    let matrix2:number[][] = []; // bombenBoard
    for(let i:number = 0; i < 10; i += 1){
        matrix2.push([]);
        for(let j:number = 0; j < 10; j += 1) matrix2[i][j] = 8;
    }
    main.setbombenBoard(matrix2);

    test('input a1 -> benutzerBoard[0][1] sollte geklickt werden, eine 8 haben', () => {
        matrix[0][1] = 8;
        logik.clickField(0,1);
        expect(main.benutzerBoard).toStrictEqual(matrix);
    })
    test('input a2 -> bombenBoard[0][1] hat eine 9 -> loop sollte enden', () => {
        main.bombenBoard[0][2] = 9;
        logik.clickField(0,2);
        expect(main.loopend).toStrictEqual(true);
    })
});

describe('tests zur funktion checkWin()', () => {
    // Aufstellen der Boards
    let matrix3:number[][] = []; // benutzerBoard
    for(let i:number = 0; i < 10; i += 1){
        matrix3.push([]);
        for(let j:number = 0; j < 10; j += 1) matrix3[i][j] = -1;
    }
    let matrix4:number[][] = []; // bombenBoard
    for(let i:number = 0; i < 10; i += 1){
        matrix4.push([]);
        for(let j:number = 0; j < 10; j += 1) matrix4[i][j] = -1;
    }

    test('bombenBoard und benutzerBoard sind mit 1en gefüllt -> sollte ein win ergeben', () => {
        expect(logik.checkWin(matrix3, matrix4)).toStrictEqual(true);
    })
    test('bombenBoard und benutzerBoard sind nicht gleich -> sollte kein win ergeben', () => {
        matrix4[0][0] = 2;
        expect(logik.checkWin(matrix3, matrix4)).toStrictEqual(false);
    })
    test('bombenBoard ist voller bomben und benutzerBoard ist voller unmarkierter felder -> sollte ein win ergeben', () => {
        for(let i:number = 0; i < 10; i += 1) for(let j:number = 0; j < 10; j += 1) matrix4[i][j] = 9;
        expect(logik.checkWin(matrix3, matrix4)).toStrictEqual(true);
    })
    test('bombenBoard ist voller bomben und benutzerBoard ist voller flags -> sollte ein win ergeben', () => {
        for(let i:number = 0; i < 10; i += 1) for(let j:number = 0; j < 10; j += 1) matrix3[i][j] = -2;
        expect(logik.checkWin(matrix3, matrix4)).toStrictEqual(true);
    })
    test('bombenBoard ist voller bomben und benutzerBoard hat eine aufgedeckt -> sollte kein win ergeben', () => {
        matrix3[0][0] = 0;
        expect(logik.checkWin(matrix3, matrix4)).toStrictEqual(false);
    })
});
