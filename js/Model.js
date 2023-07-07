export default class Model {
  #bikes;
  #types;
  #sizes;
  constructor(controller) {
    this.#bikes = [];
    this.#types = ["VTT", "VTC", "COURSE", "BMX", "CROSS"];
    this.#sizes = ["VSM", "SM", "M", "L", "XL", "XXL"];
    this.controller = controller;
  }

  get bikes() {
    return this.#bikes;
  }

  set bikes(new_bikes) {
    this.#bikes = new_bikes;
  }

  get types() {
    return this.#types;
  }

  set types(new_types) {
    this.#types = new_types;
  }

  get sizes() {
    return this.#sizes;
  }

  set sizes(new_sizes) {
    this.#sizes = new_sizes;
  }

  getBikesFromServer(displayBikes) {
    fetch("http://localhost:3000/bikes")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //console.log("data :", data);
        this.#bikes = data;
        displayBikes(this.#bikes);
      })
      .catch((err) => {
        console.error("erreur attrapée :", err);
      });
  }

  deleteBikeFromServer(id, displayBikes) {
    fetch(`http://localhost:3000/bikes/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("L'élément a été supprimé avec succès.");
          // Effectuer d'autres actions après la suppression
          //this.getBikesFromServer(this.controller.displayBikes);
          this.getBikesFromServer(displayBikes);
        } else {
          console.log(
            "Une erreur s'est produite lors de la suppression de l'élément."
          );
          // Gérer l'erreur de suppression
        }
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la suppression de l'élément:",
          error
        );
      });
  }

  addBikeFromServer(bikeToAdd, displayBikes) {
    fetch("http://localhost:3000/bikes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bikeToAdd),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New data added:", data);
        this.getBikesFromServer(displayBikes);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  updateBikeFromServer(bikeToUpdate, displayBikes) {
    fetch(`http://localhost:3000/bikes/${bikeToUpdate.id}`, {
      method: "PUT", // or 'PATCH' for partial updates
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bikeToUpdate),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data updated:", data);
        this.getBikesFromServer(displayBikes);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}
