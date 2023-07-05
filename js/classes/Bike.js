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