import { Table } from "./controllers/medalTable.js";
import { Countries } from "./models/olympics.js";

Countries.getCountries();
Table.template();

const form = document.querySelector("form");
form.addEventListener("submit", Table.capturingResearch);

const buttonRanking = document.getElementById("button-one");
buttonRanking.addEventListener("click", Table.capturingRanking);

const buttonGold = document.getElementById("button-two");
buttonGold.addEventListener("click", Table.capturingGold);

const buttonSilver = document.getElementById("button-three");
buttonSilver.addEventListener("click", Table.capturingSilver);

const buttonBronze = document.getElementById("button-four");
buttonBronze.addEventListener("click", Table.capturingBronze);

