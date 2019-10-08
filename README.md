# React-cli

## Installation
``yarn global add https://github.com/maarconte/React-cli.git``\
ou\
``npm install -g https://github.com/maarconte/React-cli.git``

## Usage
Ajoutez un fichier nommé `rcli-config.json` à la racine de votre projet

Exemple de `rcli-congig.json`:
```json
{
    "componentsPath":"src/components",
    "styleExt":"scss",
    "stylePath":"src/styles" /* Chemin vers le fichier d'imports des feuilles de style SCSS */
}
```

Puis pour créer les composants utiisez la commande
``react-cli -c <componentName>``
