export default class Model {

    #bikes;
    #types;
    constructor() {
        this.#bikes=[];
        this.#types=["Tous", "VTT", "VTC", "COURSE", "BMX", "CROSS"];
    }

    get bikes() {
        return this.#bikes;
    }

    set bikes(new_bikes) {
        this.#bikes = new_bikes;
    }

    get types() {
        return this.#types;
    }

    set types(new_types) {
        this.#types = new_types;
    }

    getBikesFromServer(displayBikes) {
        fetch("http://localhost:3000/bikes")
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log("data :", data);
            this.#bikes = data;
            displayBikes(this.#bikes);
        })
        .catch(err => {
            console.error("erreur attrapée :", err);
        })
    }
}