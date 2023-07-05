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
  //Event.preventDefault()

  //console.log("bikes :", model.getBikesFromServer())

  displayBikes = (bikes) => {
    console.log(bikes);
    bikes.forEach((b) => {
      this.view.renderBike(b);
    });
  };

/*
  showModal() {
    const modal = document.getElementById("exampleModalCenter");
    modal.classList.add("show");
    modal.style.display = "block";
    document.body.classList.add("modal-open");
  }

  hideModal() {
    var modal = document.getElementById("exampleModalCenter");
    modal.classList.remove("show");
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  }*/
}

/*
model.getBikesFromServer().forEach(b => {
    createMarkup("article", "test $", divRow, [{class: "col-4"}]);
})
*/
