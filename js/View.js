import {createMarkup} from "./utils/dom.js"

export default class View {

    selectType
    constructor() {

    }

    render() {
        const rootDocument = document.getElementById("root");
        const h1 = createMarkup("h1", "Gestion des Vélos", rootDocument, [{class: "h1 mt-5 mb-2"}]);
        this.divRow = createMarkup("div", "",rootDocument, [{class: "row my-2 "}]);
        
        const formAdd = createMarkup("form", "", rootDocument, [{class: "mt-4"}]);
        const btnAdd = createMarkup("button", "Ajouter un vélo", formAdd, [{class: "btn btn-success mb-1"}, {type:"submit"}]);
        const formType = createMarkup("form", "", rootDocument, [{class: "mt-4"}]);
        this.selectType = createMarkup("select", "", rootDocument, [{class: "mb-1"}]);
        const btnFilter = createMarkup("button", "Filtrer", rootDocument, [{class: "btn btn-warning"}, {type:"submit"}]);
    }

    renderOptionSelectType(t) {
        createMarkup("option", t, this.selectType, [{value: t}]);
    }

    renderBike(b) {
        const article = createMarkup("article", "", this.divRow, [{class: "col-4 p-2 card border-0"},{style:"box-sizing: border-box"}]);
            const divCard = createMarkup("div", "", article, [{class: "border border-primary card-body d-flex flex-column justify-content-center align-items-center rounded"}]);
            const h2Model = createMarkup("h2", b.model, divCard, [{class: "h2 card-title"}]);
            const h3Brand = createMarkup("h3", b.brand, divCard, [{class: "h3 card-text"}]);
            const h4Type = createMarkup("h4", b.type, divCard, [{class: "h4 card-text"}]);
            const h4Size = createMarkup("h4", b.size, divCard, [{class: "h4 card-text"}]);
            const h4Price = createMarkup("h4", b.price + "€", divCard, [{class: "h4 card-text"}]);
            const btnSuppr = createMarkup("button", "Supprimer", divCard, [{class: "btn btn-danger mb-1"}]);
            const btnEdit = createMarkup("button", "Editer", divCard, [{class: "btn btn-primary"}]); 
    }

    attachModalEventHandlers() {
        const showModalButton = document.getElementById("showModalBtn");
        const closeModalButton = document.getElementById("closeModalBtn");
        const closeButton = document.getElementById("xModalBtn");
    
        showModalButton.addEventListener("click", this.showModal);
        closeModalButton.addEventListener("click", this.hideModal);
        closeButton.addEventListener("click", this.hideModal);
      }
    
      showModal() {
        const modal = document.getElementById("exampleModalCenter");
        modal.classList.add("show");
        modal.style.display = "block";
        document.body.classList.add("modal-open");
      }
    
      hideModal() {
        const modal = document.getElementById("exampleModalCenter");
        modal.classList.remove("show");
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
      }
}