/* Sélecteur qui permet d'englober une catégorie */
const selecteurCategorie = ".category";

/* Nom de classe à donner à la liste d'onglets et à l'onglet actif */
const classeListeOnglets = "ongletsRPG";
const classeOngletActif = "onglet-actif";

/* Liste des catégories à onglets, à éditer selon besoins */
const listeCategoriesRPG = [
    { id : "c2", titre : "harry potter"},
    { id : "c5", titre : "criminalité"},
    { id : "c6", titre : "fantastique"},
    { id : "c3", titre : "city"}
];

const forumsRPG = listeCategoriesRPG.map(el => el.id);

/* Fonction de création d'un onglet */
const creerOnglet = (idOnglet, nomOnglet) => {
    let onglet = document.createElement("li");
    onglet.dataset.catOngletId = idOnglet;
    let contenuOnglet = document.createTextNode(nomOnglet);
    onglet.appendChild(contenuOnglet);
    onglet.addEventListener("click", (e) => {
        afficherCategorie(idOnglet);
    });
    return onglet;
};

/* Fonction d'affichage d'une catégorie */
const afficherCategorie = idCategorie => {
    forumsRPG.forEach(id => {
        document.querySelector(`${selecteurCategorie}[data-categorie-id=${id}]`).style.display = "none";
    });
    /* Affiche la catégorie sélectionnée */
    document.querySelector(`${selecteurCategorie}[data-categorie-id=${idCategorie}]`).style.display = "block";
    if(document.querySelector(`.${classeOngletActif}[data-cat-onglet-id]`))
        document.querySelector(`.${classeOngletActif}[data-cat-onglet-id]`).classList.remove(classeOngletActif);
    document.querySelector(`[data-cat-onglet-id=${idCategorie}]`).classList.add(classeOngletActif);
};

document.addEventListener('DOMContentLoaded', (event) => {

    /* Création de la liste qui contiendra les onglets */
    let htmlOnglets = document.createElement("ul");
    htmlOnglets.classList.add(classeListeOnglets);

    /* On parcourt les catégories du forum et on crée les onglets */
    document.querySelectorAll(selecteurCategorie).forEach(categorie => {
        let idCategorie = categorie.dataset.categorieId;
        if(forumsRPG.includes(idCategorie)) {
            if(forumsRPG.indexOf(idCategorie) == 0) {
                categorie.before(htmlOnglets);
            }
            htmlOnglets.appendChild(creerOnglet(idCategorie, listeCategoriesRPG[forumsRPG.indexOf(idCategorie)].titre));
        }
    });

    /* Affiche le premier onglet de la liste par défaut */
    afficherCategorie(forumsRPG[0]);

});