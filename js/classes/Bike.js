/**
 * Classe qui représente un vélo.
 */
export default class Bike {
    #id;
    #model;
    #brand;
    #type;
    #size;
    #price;

    constructor(id, model, brand, type, size, price) {
        this.#id = id;
        this.#model = model;
        this.#brand = brand;
        this.#type = type;
        this.#size = size;
        this.#price = price;
    }
    /**
     * Fonction de comparaison.
     * @param {Bike} bike : vélo à comparer.
     * @returns vrai si toutes les propriétés sont égales, faux sinon.
     */
    equals(bike) {
        if((this.#id == bike.id) && (this.#model == bike.model) 
        && (this.#brand == bike.brand) && (this.#type == bike.type) 
        && (this.#size == bike.size) && (this.#price == bike.price)) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Getters et Setters.
     */
    get id() {
        return this.#id;
    }

    set id(new_id) {
        this.#id = new_id;
    }

    get model() {
        return this.#model;
    }

    set model(new_model) {
        this.#model = new_model;
    }

    get brand() {
        return this.#brand;
    }

    set brand(new_brand) {
        this.#brand = new_brand;
    }

    get type() {
        return this.#type;
    }

    set type(new_type) {
        this.#type = new_type;
    }

    get size() {
        return this.#size;
    }

    set size(new_size) {
        this.#size = new_size;
    }

    get price() {
        return this.#price;
    }

    set price(new_price) {
        this.#price = new_price;
    }
}