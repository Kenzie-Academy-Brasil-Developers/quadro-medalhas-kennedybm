import { Table } from "../controllers/medalTable.js";

export class Countries {

    static async getCountries() {
        
        const response = await fetch(`https://kenzie-olympics.herokuapp.com/paises`);
        const data = await response.json();
    
        return data
    }

}