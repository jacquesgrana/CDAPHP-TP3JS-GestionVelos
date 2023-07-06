import { createMarkup } from "./utils/dom.js";

export default class View {
  selectType;
  constructor(controller) {
    this.controller = controller;
  }

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
      { onsubmit: (event) => this.calcFilter(event) }
    ]);
    this.optionAll = createMarkup("option", "Tous", this.selectType, [{value: "All"}]);
    const btnFilter = createMarkup("button", "Filtrer", formFilters, [
      { class: "btn btn-warning" }
    ]);
    btnFilter.addEventListener("click", (event) => this.calcFilter(event));
    this.divRow = createMarkup("div", "", rootDocument, [
      { class: "row my-2 " },
    ]);
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
    const pId = createMarkup("p", "#" + b.id, divCard, [{style: "visibility: hidden"} ,{class: "m-0"}])
    const divButtons = createMarkup("div", "", divCard, [
      { class: "d-flex justify-content-between" },
      { style: "width:100%" },
    ]);
    const btnSuppr = createMarkup("button", "Supprimer", divButtons, [
      { class: "btn btn-danger btn-delete-bike mb-1" },
    ]);
    const btnEdit = createMarkup("button", "Editer", divButtons, [
      { class: "btn btn-primary btn-edit-bike" },
    ]);
  }

  renderOptionSelectType(t) {
    createMarkup("option", t, this.selectType, [{ value: t }]);
  }

  renderOptionSelectTypeModal(t) {
    const selectTypes = document.getElementById("select-type");
    createMarkup("option", t, selectTypes, [{ value: t }]);
  }

  renderOptionSelectSizeModal(s) {
    const selectSizes = document.getElementById("select-size");
    createMarkup("option", s, selectSizes, [{ value: s }]);
  }

  attachModalEventHandlers() {
    const showModalButton = document.getElementById("showModalBtn");
    const closeModalButton = document.getElementById("closeModalBtn");
    const closeButton = document.getElementById("xModalBtn");
    showModalButton.addEventListener("click", this.showModalAdd);
    closeModalButton.addEventListener("click", this.hideModal);
    closeButton.addEventListener("click", this.hideModal);
  }

  attachModelEventHandlerEditButtons() {
    const editButtons = document.getElementsByClassName("btn-edit-bike");
    Array.from(editButtons).forEach((b) =>
      b.addEventListener("click", this.showModalEdit)
    );
  }

  attachModelEventHandlerDeleteButtons() {
    const deleteButtons = document.getElementsByClassName("btn-delete-bike");
    Array.from(deleteButtons).forEach((b) =>
      b.addEventListener("click", this.deleteBike)
    );
  }

  deleteBike = (event) => {
    console.log("delete bike de view")
    event.preventDefault();
    if (window.confirm("Voulez-vous vraiment supprimer ce vélo ?")) {
      console.log("delete : ok");
      this.controller.deleteBike(event.target);
    } else {
      console.log("delete : ko");
      this.hideModal();
    }
  }

  showModalAdd = (event) => {
    event.preventDefault();
    //this.controller.displaySelectTypes();
    //this.controller.displaySelectSizes();
    const modal = document.getElementById("modal-container");
    modal.classList.add("show");
    modal.style.display = "block";
    document.body.classList.add("modal-open");
    this.emptyFormModal();
  }

  showModalEdit = (event) => {
    event.preventDefault();
    const element = event.target;
    //this.controller.displaySelectTypes();
    //this.controller.displaySelectSizes();
    const modal = document.getElementById("modal-container");
    modal.classList.add("show");
    modal.style.display = "block";
    document.body.classList.add("modal-open");
    this.controller.fillFormModal(element);
  }

  hideModal() {
    const modal = document.getElementById("modal-container");
    modal.classList.remove("show");
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  }

  fillFormModal(bike) {
    const titleModal = document.getElementById("modal-title");
    titleModal.innerText = "Editer un vélo"
    const modelInputModal = document.getElementById("modelModal");
    modelInputModal.value = bike.model;
    const brandInputModal = document.getElementById("brandModal");
    brandInputModal.value = bike.brand;

    const typeSelectModal = document.getElementById("select-type");
    typeSelectModal.value = bike.type;

    const sizeSelectModal = document.getElementById("select-size");
    sizeSelectModal.value = bike.size;

    const priceInputModal = document.getElementById("priceModal");
    priceInputModal.value = bike.price;
    const idInputModal = document.getElementById("idModal");
    idInputModal.value = bike.id;

  }

  emptyFormModal() {
    const titleModal = document.getElementById("modal-title");
    titleModal.innerText = "Ajouter un vélo"
    const modelInputModal = document.getElementById("modelModal");
    modelInputModal.value = "";
    const brandInputModal = document.getElementById("brandModal");
    brandInputModal.value = "";

    const typeSelectModal = document.getElementById("select-type");
    typeSelectModal.value = "";

    const sizeSelectModal = document.getElementById("select-size");
    sizeSelectModal.value = "";

    const priceInputModal = document.getElementById("priceModal");
    priceInputModal.value = "";
    const idInputModal = document.getElementById("idModal");
    idInputModal.value = "";
  }

  emptyBikesContainer() {
    this.divRow.innerHTML = "";
  }

   calcFilter(event) {
    event.preventDefault();
    console.log("clic filtrer");
    this.controller.calcFilter();
  }
}
