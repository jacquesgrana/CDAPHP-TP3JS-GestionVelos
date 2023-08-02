/**
 * Modèle
 */
export default class Model {
  #bikes; // tableau des vélos renvoyés par la bdd.
  #types; // tableau des types de vélos.
  #sizes; // tableau des tailles de vélos.

  #endPoint = "https://tpjs-exo3-serveur-json-server.onrender.com/bikes"; //https://tpjs-exo3-serveur-json-server.onrender.com/bikes
  //https://magical-elf-d6cdf3.netlify.app/fe72d06f-72c4-4df6-b601-62158565ae12/bikes
  //https://magical-elf-d6cdf3.netlify.app/
  //https://64bbdb5b05b8c967e0144d07--magical-elf-d6cdf3.netlify.app/bikes

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
    fetch(this.#endPoint, {
        method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.#bikes = data;
        displayBikes(this.#bikes);
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
  }

  /**
   * Méthode qui envoie une requête au serveur pour effacer un vélo dans la bdd selon son id, puis lance la callback pour les afficher.
   * @param {callback} displayBikes 
   */
  deleteBikeFromServer(id, displayBikes) {
    fetch(`${this.#endPoint}/${id}`, {
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
        console.error("Erreur :", error);
      });
  }

  /**
   * Méthode qui envoie une requête au serveur pour ajouter un vélo dans la bdd, puis lance la callback pour les afficher.
   * @param {callback} displayBikes 
   */
  addBikeFromServer(bikeToAdd, displayBikes) {
    fetch(this.#endPoint, {
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
        console.error("Erreur :", error);
      });
  }

  /**
   * Méthode qui envoie une requête au serveur pour modifier un vélo dans la bdd selon son id, puis lance la callback pour les afficher.
   * @param {callback} displayBikes 
   */
  updateBikeFromServer(bikeToUpdate, displayBikes) {
    fetch(`${this.#endPoint}/${bikeToUpdate.id}`, {
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
        console.error("Erreur :", error);
      });
  }
}
