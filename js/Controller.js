import { createMarkup } from "./utils/dom.js";
import Model from "./Model.js";
import View from "./View.js";

export default class Controller {
  model;
  view;
  divRow;
  constructor() {
    this.model = new Model();
    this.view = new View(this);
  }

  run() {
    this.view.render();
    this.model.types.forEach((t) => {
      this.view.renderOptionSelectType(t);
      this.view.renderOptionSelectTypeModal(t);

    });
    this.model.sizes.forEach((s) => {
      this.view.renderOptionSelectSizeModal(s);
    });

    this.model.getBikesFromServer(this.displayBikes);
    this.view.attachModalEventHandlers();
   
  }

  displayBikes = (bikes) => {
    this.view.emptyBikesContainer();
    console.log(bikes);
    bikes.forEach((b) => {
      this.view.renderBike(b);
    });
    this.view.attachModelEventHandlerEditButtons();
    this.view.attachModelEventHandlerDeleteButtons();
  }

  calcFilter() {
    console.log("calcul du filtrage");
    const filterChoice = document.getElementById("select-filters").value;
    console.log("select value :", filterChoice);

    if(filterChoice == "All") {
      this.displayBikes(this.model.bikes);
    }
    else {
      const filteredList = this.model.bikes.filter(b => b.type == filterChoice);
      this.displayBikes(filteredList);
    }
  }

  displaySelectSizes() {
    this.model.sizes.forEach(s => this.view.renderOptionSelectSize(s));
  }

  displaySelectTypes() {
    this.model.types.forEach(t => this.view.renderOptionSelectTypeModal(t));
  }

  fillFormModal(element) {
    const parent = element.parentNode.parentNode;
    const pId = parent.children[5];
    const idDb = String(pId.innerHTML).substring(1);
    const id = this.model.bikes.findIndex((bike, index) => {return bike.id == idDb});
    //console.log("id dans db :", idDb);
    //console.log("id dans tab :", id);
    //console.log("bike : ", this.model.bikes[id]);
    this.view.fillFormModal(this.model.bikes[id]);
  }

  deleteBike(element) {
    const parent = element.parentNode.parentNode;
    const pId = parent.children[5];
    const idDb = String(pId.innerHTML).substring(1);
    // remplacer par requete par le model
    this.model.deleteBikeFromServer(idDb, this.displayBikes);
    // afficher les bikes
    //this.model.getBikesFromServer(this.displayBikes);
    //this.model.bikes.splice(id, 1);
    console.log("delete bike à l'id :", idDb);
  }

  addBike(bikeToAdd) {
    this.model.addBikeFromServer(bikeToAdd, this.displayBikes);
  }

  updateBike(bikeToAdd) {
    this.model.updateBikeFromServer(bikeToAdd, this.displayBikes);
  }
}
