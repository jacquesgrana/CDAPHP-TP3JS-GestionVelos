# CDAPHP-TP3JS-GestionVelos

TP exo 3 - Examen Javascript - CDA PHP

https://jacquesgrana.github.io/CDAPHP-TP3JS-GestionVelos/

Exercice 3 – Créer un catalogue de vélos en ligne - 20pts

L’objectif de cet exercice est de créer une application qui permet de créer, modifier, supprimer et
visualiser des vélos en ligne.
Pour simuler un serveur d’API REST, vous utiliserez le package json-server :
https://www.npmjs.com/package/json-server
Toutes les requêtes se font à l’aide de la fonction « fetch » depuis un fichier que vous appelez
« Model.js ». Les méthodes de Model sont des méthodes de classe. Utiliser le mot clé « static ».
Les vélos sont issus de la classe Bike.
Chaque instance de Bike a comme propriétés directes :
id, model, brand, type (vtt, vtc, course …), Size, Price

Phase 1 - Mise en place de json-server : 3pts
Commencez par écrire un fichier db.json qui contient au moins 3 objets correspondant à des vélos.
Installer et lancer le serveur « json-server » dans un répertoire qui se trouve en dehors du répertoire
dans lequel vous allez créer votre application.

Phase 2 - Visualisation: 4pts
Créer une application qui permet de visualiser la liste des vélos issue de db.json et récupérée via une
requête « get » à l’aide de la fonction « fetch ». Afficher les instances de « Bike » sous forme de
« carte » synthétique sur le modèles des « card » de bootstrap :
https://getbootstrap.com/docs/5.0/components/card/
Utilisez la grille de bootstrap pour afficher les vélos sur 3 colonnes.

Phase 3 - Suppression: 3pts
Mettez en place un bouton qui permet de supprimer un vélo d’abord sur l’interface et dans un
deuxième temps sur le serveur en utilisant la fonction fetch avec le verbe DELETE.

Phase 4 - Filtre: 3pts
Mettez en place un formulaire qui permet de filtrer les vélos par type (vtt, vtc…)

Phase 5 – Ajout : 3pts
Créer un formulaire qui permet d’ajouter des instances de « Bike » qui seront directement visibles
dans la liste des vélos. Utiliser la fonction fetch avec le verbe POST pour ajouter à db.json le vélo en
question.

Phase 6 – Modification : 4pts
Créer un formulaire qui permet de modifier les instances de « Bike ». Les modification seront
directement visibles dans la liste des vélos. Utiliser la fonction fetch avec le verbe PUT pour modifier
dans db.json le vélo en question. La propriété id ne doit pas être modifiable (utiliser le mécanisme
des propriétés privées serait une bonne idée).
