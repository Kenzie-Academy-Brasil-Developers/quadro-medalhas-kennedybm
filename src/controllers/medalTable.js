import { Countries } from "../models/olympics.js";

export class Table {

    static main = document.querySelector("main");
    static divSearchByCountries = document.createElement("div");

    static template() {

        const header = document.querySelector("header");
        const headerDiv = document.createElement("div");
        headerDiv.className = "header-img";
        headerDiv.innerHTML = `<img class="olympics-img" src="./src/img/olympics.png" alt="olympics">`;
        header.appendChild(headerDiv);

        const divSearch = document.createElement("div");
        divSearch.className = "div-search";
        divSearch.innerHTML = `
        <form name="search" action="" class="div-search-form">
            <span class="search-span">Pesquisa</span>
            <input type="text" name="search" placeholder=" &#128269; Pesquisar por país">
            <span class="div-search-span">Ex: Brasil</span>
            <button class="button-search">Pesquisar</button>
        </form> 
        
        `
        this.main.appendChild(divSearch)

        const divButtons = document.createElement("div");
        divButtons.className = "div-select-options";
        
        divButtons.innerHTML = `
            <table class="buttons-template">
                <tr class="table-buttons">
                    <td class="table-buttons-ranking">
                        <button id="button-one" class="button-ranking"><span>Posição</span><span>&#8964</span> </button>
                    </td>
                    <td class="td-pais"> <span>País</span> </td>
                    <td class="table-buttons-ouro">
                        <button id="button-two" class="button-ouro"><span>Ouro</span><span>&#8964</span> </button>
                    </td>
                    <td class="table-buttons-prata">
                        <button id="button-three" class="button-prata"><span>Prata</span><span>&#8963</span> </button>
                    </td>
                    <td class="table-buttons-bronze">
                        <button id="button-four" class="button-bronze"><span>Bronze</span><span>&#8964</span> </button>
                    </td>
                    <td class="td-total"> <span>Total</span></td>
                </tr>
            </table>
        `
        this.divSearchByCountries.className = "table-search-countries";
        this.main.appendChild(divButtons);
        // this.main.appendChild(this.divSearchByCountries)
    }
    
    static capturingResearch(event) {

        event.preventDefault();
        
        const inputs = event.target;
        const typedSearch = {};
        
        for(let i = 0; i < inputs.length; i++){
            const {name, value} = inputs[i]
            inputs[i].value = "";
            
            if(name){
                typedSearch[name] = value.toLowerCase().trim();
            }
        }
        
        Table.tableSearch(typedSearch)
    }

    static async tableSearch(search) {
        
        const typed = search.search;
        const data = await Countries.getCountries();
        let arrTotal = [];
        let arrSearch = [];

        data.forEach(countries => {
            countries.totalMedals = countries.medal_bronze + countries.medal_gold + countries.medal_silver
            arrTotal.push(countries)
        });
        
        arrTotal.forEach(countries => {
        
            let verify = countries.country.toLowerCase();
            if(typed === verify){
                arrSearch.push(countries)
            }
        });
       
        arrSearch.forEach(countries => {

            // this.divSearchByCountries.style.display = "flex"
            this.divSearchByCountries.innerHTML = "";
            this.divSearchByCountries.innerHTML = `
            <div class="div-table-search">
                <table class="table-search">
                    <tr class="tr-search">
                        <td class="td-search-ranking"> - </td>
                        <td class="td-search-flag"> <img src="${countries.flag_url}"><span>${countries.country}</span> </td>
                        <td class="td-search-ouro">${countries.medal_gold}</td>
                        <td class="td-search-prata">${countries.medal_silver}</td>
                        <td class="td-search-bronze">${countries.medal_bronze}</td>
                        <td class="td-search-total">${countries.totalMedals}</td>
                    </tr>
                </table>
            </div>
            `;
            this.main.appendChild(this.divSearchByCountries) 
        });
    }

    static capturingRanking(event) {
        if(event.target.tagName === "BUTTON"){
            Table.ranking()
        }
    }

    static async ranking() {

        this.divSearchByCountries.innerHTML = "";
        const data = await Countries.getCountries();
        let count = 1;
        
        let arrTotal = []; 
        data.forEach(countries => {
            countries.totalMedals = countries.medal_bronze + countries.medal_gold + countries.medal_silver
            arrTotal.push(countries)
        });
        
        const medals = arrTotal.sort((a, b) => b.totalMedals - a.totalMedals || b.medal_gold - a.medal_gold)

        medals.forEach(medal => {
            
            const ranking = document.createElement("div");
            ranking.className = "div-table-ranking"
            ranking.innerHTML = `
                <table class="table-ranking">
                    <tr class="tr-search">
                        <td class="td-search-ranking"> ${count}º </td>
                        <td class="td-search-flag"> <img src="${medal.flag_url}"><span>${medal.country}</span> </td>
                        <td class="td-search-ouro">${medal.medal_gold}</td>
                        <td class="td-search-prata">${medal.medal_silver}</td>
                        <td class="td-search-bronze">${medal.medal_bronze}</td>
                        <td class="td-search-total">${medal.totalMedals}</td>
                    </tr>
                </table>  
            `;
            count++
            this.divSearchByCountries.appendChild(ranking);
            this.main.appendChild(this.divSearchByCountries)
        }) 
    }

    static capturingGold(event) {

        if(event.target.tagName === "BUTTON"){
            Table.rankingGold()
        }
    }

    static async rankingGold() {

        this.divSearchByCountries.innerHTML = "";
        const data = await Countries.getCountries();
        let arrTotal = [];
        let count = 1; 

        data.forEach(countries => {
            countries.totalMedals = countries.medal_bronze + countries.medal_gold + countries.medal_silver
            arrTotal.push(countries)
        });
        
        const goldRanking = arrTotal.sort((a, b) => b.medal_gold - a.medal_gold);
        
        goldRanking.forEach(countries => {

            const divGoldMedals = document.createElement("div");
         
            divGoldMedals.innerHTML = `
                <table class="table-ranking">
                    <tr class="tr-search">
                        <td class="td-search-ranking"> ${count}º </td>
                        <td class="td-search-flag"> <img src="${countries.flag_url}"><span>${countries.country}</span> </td>
                        <td class="td-search-ouro">${countries.medal_gold}</td>
                        <td class="td-search-prata">${countries.medal_silver}</td>
                        <td class="td-search-bronze">${countries.medal_bronze}</td>
                        <td class="td-search-total">${countries.totalMedals}</td>
                    </tr>
                </table> 
            `;
            count++
            this.divSearchByCountries.appendChild(divGoldMedals);
            this.main.appendChild(this.divSearchByCountries)
        });
        
    }

    static capturingSilver(event) {

        if(event.target.tagName === "BUTTON"){
            Table.rankingSilver()
        }
    }

    static async rankingSilver() {
        
        this.divSearchByCountries.innerHTML = "";
        const data = await Countries.getCountries();
        let arrTotal = [];
        let count = 1; 

        data.forEach(countries => {
            countries.totalMedals = countries.medal_bronze + countries.medal_gold + countries.medal_silver
            arrTotal.push(countries)
        });

        const silverRanking = arrTotal.sort((a, b) => b.medal_silver - a.medal_silver);

        silverRanking.forEach(countries => {

            const divSilverMedals = document.createElement("div");
         
            divSilverMedals.innerHTML = `
                <table class="table-ranking">
                    <tr class="tr-search">
                        <td class="td-search-ranking"> ${count}º </td>
                        <td class="td-search-flag"> <img src="${countries.flag_url}"><span>${countries.country}</span> </td>
                        <td class="td-search-ouro">${countries.medal_gold}</td>
                        <td class="td-search-prata">${countries.medal_silver}</td>
                        <td class="td-search-bronze">${countries.medal_bronze}</td>
                        <td class="td-search-total">${countries.totalMedals}</td>
                    </tr>
                </table> 
            `;
            count++
            this.divSearchByCountries.appendChild(divSilverMedals);
            this.main.appendChild(this.divSearchByCountries);
        });
    }

    static capturingBronze(event) {

        if(event.target.tagName === "BUTTON"){
            Table.rankingBronze()
        }
    }

    static async rankingBronze() {

        this.divSearchByCountries.innerHTML = "";
        const data = await Countries.getCountries();
        let arrTotal = [];
        let count = 1; 

        data.forEach(countries => {
            countries.totalMedals = countries.medal_bronze + countries.medal_gold + countries.medal_silver
            arrTotal.push(countries)
        });

        const bronzeRanking = arrTotal.sort((a, b) => b.medal_bronze - a.medal_bronze);

        bronzeRanking.forEach(countries => {

            const divBronzeMedals = document.createElement("div");
         
            divBronzeMedals.innerHTML = `
                <table class="table-ranking">
                    <tr class="tr-search">
                        <td class="td-search-ranking"> ${count}º </td>
                        <td class="td-search-flag"> <img src="${countries.flag_url}"><span>${countries.country}</span> </td>
                        <td class="td-search-ouro">${countries.medal_gold}</td>
                        <td class="td-search-prata">${countries.medal_silver}</td>
                        <td class="td-search-bronze">${countries.medal_bronze}</td>
                        <td class="td-search-total">${countries.totalMedals}</td>
                    </tr>
                </table> 
            `;
            count++
            this.divSearchByCountries.appendChild(divBronzeMedals);
            this.main.appendChild(this.divSearchByCountries);
        });
    }

}



   

