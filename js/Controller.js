import Model from "./Model.js";
import View from "./View.js";

/**
 * Classe controller
 */
export default class Controller {
  model;
  view;
  divRow;
  constructor() {
    this.model = new Model();
    this.view = new View(this);
  }

  /**
   * Méthode qui lance l'application
   */
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

  /**
   * Méthode qui appeller l'affichage du tableau de vélos.
   * @param {[Bike]} bikes : Tableau à afficher.
   */
  displayBikes = (bikes) => {
    this.view.emptyBikesContainer();
    this.view.renderBikes(bikes);
    this.view.attachModelEventHandlerEditButtons();
    this.view.attachModelEventHandlerDeleteButtons();
  };

  /**
   * Méthode qui gère le filtrage du tableau de vélos : applique le filter et lance l'affichage du tableau de vélos.
   */
  calcFilter() {
    const filterChoice = document.getElementById("select-filters").value;
    if (filterChoice == "All") {
      this.displayBikes(this.model.bikes);
    } else {
      const filteredList = this.model.bikes.filter(
        (b) => b.type == filterChoice
      );
      this.displayBikes(filteredList);
    }
  }

  /**
   * Méthode qui charge les options dans le select des tailles.
   */
  displaySelectSizes() {
    this.model.sizes.forEach((s) => this.view.renderOptionSelectSize(s));
  }

  /**
   * Méthode qui charge les options dans le select des types.
   */
  displaySelectTypes() {
    this.model.types.forEach((t) => this.view.renderOptionSelectTypeModal(t));
  }

  /**
   * Méthode qui cherche l'id contenu dans element et appelle la vue pour remplir la modale avec les propriétés du vélo correspondant.
   * @param {Dom Element} element : élément html du vélo dans lequel a eu lieu le clic.
   */
  fillFormModal(element) {
    const parent = element.parentNode.parentNode;
    const pId = parent.children[5];
    const idDb = String(pId.innerHTML).substring(1);
    const id = this.model.bikes.findIndex((bike, index) => {
      return bike.id == idDb;
    });
    this.view.fillFormModal(this.model.bikes[id]);
  }

  /**
   * Méthode de suppression qui cherche l'id contenu dans element et appelle le model pour envoyer la requête de suppression du vélo.
   * @param {Dom Element} element : élément html du vélo dans lequel a eu lieu le clic.
   */
  deleteBike(element) {
    const parent = element.parentNode.parentNode;
    const pId = parent.children[5];
    const idDb = String(pId.innerHTML).substring(1);
    this.model.deleteBikeFromServer(idDb, this.displayBikes);
  }

  /**
   * Méthode d'ajout qui appelle le modèle pour ajouter le vélo dans la bdd.
   * @param {Bike} bikeToAdd : élément à ajouter dans la bdd.
   */
  addBike(bikeToAdd) {
    this.model.addBikeFromServer(bikeToAdd, this.displayBikes);
  }

  /**
   * Méthode de modification qui appelle le modèle pour mettre à jour le vélo dans la bdd.
   * @param {Bike} bikeToUpdate : contient les propriétés modifiées.
   */
  updateBike(bikeToUpdate) {
    this.model.updateBikeFromServer(bikeToUpdate, this.displayBikes);
  }
}
