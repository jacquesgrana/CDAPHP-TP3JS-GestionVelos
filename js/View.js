import { createMarkup } from "./utils/dom.js";

export default class View {
  selectType;
  constructor() {}

  render() {
    const rootDocument = document.getElementById("root");
    const h1 = createMarkup("h1", "Gestion des Vélos", rootDocument, [
      { class: "h1 my-5" },
    ]);
    const btnAdd = createMarkup("button", "Ajouter un vélo", rootDocument, [
      { type: "button" },
      { id: "showModalBtn" },
      { class: "btn btn-success mb-1" }
    ]);
    const formFilters = createMarkup("form", "", rootDocument, [
      { class: "mt-4 d-flex gap-4" },
    ]);
    this.selectType = createMarkup("select", "", formFilters, [
      { class: "mb-1" },
      { onsubmit: this.calcFilter() },
    ]);
    const btnFilter = createMarkup("button", "Filtrer", formFilters, [
      { class: "btn btn-warning" },
      { type: "submit" },
    ]);
    this.divRow = createMarkup("div", "", rootDocument, [
      { class: "row my-2 " },
    ]);
  }

  renderOptionSelectType(t) {
    createMarkup("option", t, this.selectType, [{ value: t }]);
  }

  renderBike(b) {
    const article = createMarkup("article", "", this.divRow, [
      { class: "col-4 p-2 card border-0" },
      { style: "box-sizing: border-box" },
    ]);
    const divCard = createMarkup("div", "", article, [
      {
        class:
          "border border-primary card-body d-flex flex-column justify-content-center align-items-center rounded",
      },
    ]);
    const h2Model = createMarkup("h2", b.model, divCard, [
      { class: "h2 card-title" },
    ]);
    const h3Brand = createMarkup("h3", b.brand, divCard, [
      { class: "h3 card-text" },
    ]);
    const h4Type = createMarkup("h4", b.type, divCard, [
      { class: "h4 card-text" },
    ]);
    const h4Size = createMarkup("h4", b.size, divCard, [
      { class: "h4 card-text" },
    ]);
    const h4Price = createMarkup("h4", b.price + "€", divCard, [
      { class: "h4 card-text" },
    ]);
    const divButtons = createMarkup("div", "", divCard, [
      { class: "d-flex justify-content-between" },
      { style: "width:100%" },
    ]);
    const btnSuppr = createMarkup("button", "Supprimer", divButtons, [
      { class: "btn btn-danger mb-1" },
    ]);
    const btnEdit = createMarkup("button", "Editer", divButtons, [
      { class: "btn btn-primary btn-edit-bike" },
    ]);
  }

  attachModalEventHandlers() {
    const showModalButton = document.getElementById("showModalBtn");
    const closeModalButton = document.getElementById("closeModalBtn");
    const closeButton = document.getElementById("xModalBtn");
    showModalButton.addEventListener("click", this.showModal);
    closeModalButton.addEventListener("click", this.hideModal);
    closeButton.addEventListener("click", this.hideModal);
  }

  attachModelEventHandlerEditButtons() {
    const editButtons = document.getElementsByClassName("btn-edit-bike");
    Array.from(editButtons).forEach((b) =>
      b.addEventListener("click", this.showModal)
    );
  }

  showModal(event) {
    event.preventDefault();
    const modal = document.getElementById("modal-container");
    modal.classList.add("show");
    modal.style.display = "block";
    document.body.classList.add("modal-open");
  }

  hideModal() {
    const modal = document.getElementById("modal-container");
    modal.classList.remove("show");
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  }

  calcFilter() {
    
  }
}
