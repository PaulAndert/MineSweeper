# MineSweeper

Eine in Typescript geschriebene Minesweeper umsetzung für die Kommandozeile

### Anforderungen

* @types/jest@27.5.1
* @types/node@17.0.32
* jest@28.1.0
* jetty@0.2.1
* random@3.0.6
* ts-jest@28.0.2
* typescript@4.6.4

```terminal
npm -i 
```
zum instalieren der Anforderungen


### Wie spiele ich

ins projekt navigieren und 
```terminal
npx tsc && node dist/main.js
```
ausführen, das sollte MineSweeper automatisch starten lassen
Menü:
s - spiel starten
o - in die optionen
q - das spiel schließen

Optionen:
1 - Höhe
2 - Breite
3 - Bombenwahrscheinlichkeit
man kann die werte auf folgende weise ändern
<option die verändert werden soll (1,2,3)> <neuer wert>
z.B: 1 20 setzt die Höhe auf 20, 2 2 setzt die breite auf 2

Spiel:
a1 -> feld a1 anklicken
A9 -> feld a9 anklicken
f b1 -> setzte eine flagge auf b1
f B9 -> setzte eine flagge auf b9
F b12 -> setzte eine flagge auf b12
help -> zeigt die steuerung nochmal an


### Empfehlungen

Optimal (nicht zwingend) ist ein terminal fenster mit den folgenden dimensionen
breite : >=75
höhe : >=13
um das Loginfenster nicht zu verzerren
-> und fürs spiel ist optimal
breite : (spiel_breite + 1) * 4 + 1
höhe : (spiel_höhe + 1) * 2 + 6
