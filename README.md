# 🚪 Backrooms - Site Web du Jeu UE5.4

Site web professionnel pour votre jeu Backrooms développé sur Unreal Engine 5.4.

## 📁 Structure du Projet

```
backrooms-website/
├── index.html          # Page principale
├── styles.css          # Styles et thème Backrooms
├── script.js           # Interactivité et animations
├── images/             # Dossier pour vos captures d'écran
│   ├── screenshot1.jpg
│   ├── screenshot2.jpg
│   ├── screenshot3.jpg
│   └── screenshot4.jpg
└── README.md           # Ce fichier
```

## 🚀 Installation et Utilisation

### 1. Ouvrir le site localement

Ouvrez simplement le fichier `index.html` dans votre navigateur web préféré :
- Double-cliquez sur `index.html`
- Ou faites un clic droit → "Ouvrir avec" → Votre navigateur

### 2. Ajouter vos captures d'écran

1. Prenez des captures d'écran de votre jeu UE5.4
2. Placez-les dans le dossier `images/`
3. Nommez-les : `screenshot1.jpg`, `screenshot2.jpg`, `screenshot3.jpg`, `screenshot4.jpg`
4. Format recommandé : JPG ou PNG, résolution 1920x1080 ou supérieure

### 3. Personnaliser le contenu

#### Modifier le texte
Ouvrez `index.html` et modifiez :
- Le titre et les descriptions
- Les caractéristiques du jeu
- Les configurations système requises
- Les liens de téléchargement

#### Modifier les couleurs
Ouvrez `styles.css` et modifiez les variables CSS au début du fichier :
```css
:root {
    --primary-color: #d4c5a0;      /* Couleur principale */
    --secondary-color: #8b7355;     /* Couleur secondaire */
    --dark-bg: #0a0a0a;            /* Fond sombre */
    /* ... */
}
```

## 🎨 Fonctionnalités

### ✨ Animations et Effets
- **Effet Glitch** sur le titre principal
- **Parallax** sur la section hero
- **Animations au scroll** pour les cartes
- **Galerie interactive** avec modal
- **Menu responsive** pour mobile
- **Traînée de curseur** atmosphérique
- **Easter egg** : Code Konami (↑↑↓↓←→←→BA)

### 📱 Design Responsive
- Optimisé pour desktop, tablette et mobile
- Menu burger pour les petits écrans
- Grilles adaptatives

### 🎮 Sections Incluses
1. **Hero** - Présentation principale avec effet glitch
2. **À Propos** - Description du jeu et statistiques
3. **Caractéristiques** - 6 fonctionnalités principales
4. **Galerie** - 4 emplacements pour captures d'écran
5. **Téléchargement** - Configuration requise et boutons
6. **Footer** - Liens et informations

## 🌐 Hébergement en Ligne

### Option 1 : GitHub Pages (Gratuit)
1. Créez un compte sur [GitHub](https://github.com)
2. Créez un nouveau repository
3. Uploadez tous les fichiers
4. Allez dans Settings → Pages
5. Activez GitHub Pages
6. Votre site sera disponible à : `https://votre-nom.github.io/backrooms-website`

### Option 2 : Netlify (Gratuit)
1. Créez un compte sur [Netlify](https://netlify.com)
2. Glissez-déposez le dossier `backrooms-website`
3. Votre site est en ligne instantanément !

### Option 3 : Vercel (Gratuit)
1. Créez un compte sur [Vercel](https://vercel.com)
2. Importez votre projet
3. Déployez en un clic

## 🎯 Personnalisation Avancée

### Ajouter plus de captures d'écran
Dans `index.html`, section galerie :
```html
<div class="gallery-item">
    <img src="images/screenshot5.jpg" alt="Description">
    <div class="gallery-overlay">
        <p>Votre description</p>
    </div>
</div>
```

### Modifier les liens de téléchargement
Remplacez les `href="#"` par vos vrais liens :
```html
<a href="https://votre-lien-steam.com" class="platform-link">Steam</a>
```

### Ajouter des vidéos
Vous pouvez intégrer des vidéos YouTube dans la section galerie :
```html
<div class="gallery-item">
    <iframe width="100%" height="100%" 
            src="https://www.youtube.com/embed/VOTRE_VIDEO_ID" 
            frameborder="0" allowfullscreen>
    </iframe>
</div>
```

## 🔧 Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Animations et design moderne
- **JavaScript Vanilla** - Interactivité sans framework
- **Design Responsive** - Compatible tous appareils

## 🎨 Thème Backrooms

Le site utilise une palette de couleurs inspirée des Backrooms :
- Jaune pâle (#d4c5a0) - Éclairage fluorescent
- Marron (#8b7355) - Moquette usée
- Noir profond (#0a0a0a) - Ombres inquiétantes
- Effets de glitch et distorsion

## 📝 Conseils

1. **Images** : Utilisez des images de haute qualité (1920x1080 minimum)
2. **Performance** : Optimisez vos images (compression JPEG à 80-90%)
3. **SEO** : Modifiez les balises meta dans `<head>` pour le référencement
4. **Accessibilité** : Gardez les attributs `alt` sur les images
5. **Tests** : Testez sur différents navigateurs et appareils

## 🐛 Dépannage

**Les images ne s'affichent pas ?**
- Vérifiez que les images sont bien dans le dossier `images/`
- Vérifiez les noms de fichiers (sensible à la casse)
- Vérifiez les extensions (.jpg, .png)

**Le menu mobile ne fonctionne pas ?**
- Vérifiez que `script.js` est bien chargé
- Ouvrez la console du navigateur (F12) pour voir les erreurs

**Les animations ne fonctionnent pas ?**
- Certains navigateurs anciens ne supportent pas toutes les animations
- Testez sur Chrome, Firefox ou Edge récents

## 📧 Support

Pour toute question ou problème, n'hésitez pas à :
- Consulter la documentation HTML/CSS/JS en ligne
- Utiliser les outils de développement du navigateur (F12)
- Rechercher sur Stack Overflow

## 📄 Licence

Ce template est libre d'utilisation pour votre projet de jeu Backrooms.

---

**Bon développement et bonne chance avec votre jeu Backrooms ! 🎮👻**

*"If you're not careful and you noclip out of reality in the wrong areas, you'll end up in the Backrooms..."*