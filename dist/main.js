"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Move_1 = require("./Move");
const School_1 = require("./School");
const Philosopher_1 = require("./Philosopher");
const Player_1 = require("./Player");
let moves = [
    new Move_1.Move('Critique', new School_1.School(), 100, 100),
    new Move_1.Move('Analyze', new School_1.School(), 100, 100)
];
let wittgenstein = new Philosopher_1.Philosopher('Wittgenstein', 100, 100, 100);
wittgenstein.addMove(moves[1]);
let marx = new Philosopher_1.Philosopher('Marx', 100, 100, 100);
marx.addMove(moves[0]);
let player1 = new Player_1.Player('Player 1');
let player2 = new Player_1.Player('Player 2');
player1.addGroupMember(wittgenstein);
player2.addGroupMember(marx);
