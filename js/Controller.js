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
    });
    this.model.getBikesFromServer(this.displayBikes);
    this.view.attachModalEventHandlers();
  }

  displayBikes = (bikes) => {
    console.log(bikes);
    bikes.forEach((b) => {
      this.view.renderBike(b);
    });
    this.view.attachModelEventHandlerEditButtons();
  }

  calcFilter() {
    console.log("calcul du filtrage");
  }
}
