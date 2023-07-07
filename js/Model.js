/**
 * Modèle
 */
export default class Model {
  #bikes; // tableau des vélos renvoyés par la bdd.
  #types; // tableau des types de vélos.
  #sizes; // tableau des tailles de vélos.

  constructor() {
    this.#bikes = [];
    this.#types = ["VTT", "VTC", "COURSE", "BMX", "CROSS"];
    this.#sizes = ["VSM", "SM", "M", "L", "XL", "XXL"];
  }

  /**
   * Getters et Setters.
   */
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

  /**
   * Méthode qui envoie une requête au serveur pour récupérer les vélos dans la bdd, puis lance la callback pour les afficher.
   * @param {callback} displayBikes 
   */
  getBikesFromServer(displayBikes) {
    fetch("http://localhost:3000/bikes", {
        method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.#bikes = data;
        displayBikes(this.#bikes);
      })
      .catch((err) => {
        console.error("erreur attrapée :", err);
      });
  }

  /**
   * Méthode qui envoie une requête au serveur pour effacer un vélo dans la bdd selon son id, puis lance la callback pour les afficher.
   * @param {callback} displayBikes 
   */
  deleteBikeFromServer(id, displayBikes) {
    fetch(`http://localhost:3000/bikes/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          this.getBikesFromServer(displayBikes);
        } else {
          console.log("Une erreur s'est produite lors de la suppression de l'élément");
        }
      })
      .catch((error) => {
        console.error("Une erreur s'est produite lors de la suppression de l'élément:", error);
      });
  }

  /**
   * Méthode qui envoie une requête au serveur pour ajouter un vélo dans la bdd, puis lance la callback pour les afficher.
   * @param {callback} displayBikes 
   */
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
        this.getBikesFromServer(displayBikes);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  /**
   * Méthode qui envoie une requête au serveur pour modifier un vélo dans la bdd selon son id, puis lance la callback pour les afficher.
   * @param {callback} displayBikes 
   */
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
        this.getBikesFromServer(displayBikes);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}
