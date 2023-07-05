import { createMarkup } from "./utils/dom.js";
import Model from "./Model.js";
import View from "./View.js";

export default class Controller {
  model = new Model();
  view = new View();

  divRow;

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
}
