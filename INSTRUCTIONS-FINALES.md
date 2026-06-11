# ✅ Site Web Backrooms - Instructions Finales

## 🎉 Votre site est prêt !

### 📁 Fichiers Présents
✅ **index.html** - Page principale avec toutes vos fonctionnalités
✅ **styles.css** - Design Backrooms personnalisé
✅ **script.js** - Interactivité et animations
✅ **Video.mp4** - Votre bande-annonce (déjà intégrée !)
✅ **Capture.PNG & Capture2.PNG** - Vos captures d'écran (déjà intégrées !)

## 🔧 Dernière Étape : Extraire les Images de la Vidéo

### 🎬 Méthode Automatique (Recommandée)
**Double-cliquez sur `EXTRAIRE-IMAGES.bat`**

Le script va automatiquement :
1. Vérifier que Python est installé
2. Installer opencv-python si nécessaire
3. Extraire 2 images de Video.mp4
4. Les sauvegarder comme `video-frame-1.jpg` et `video-frame-2.jpg`

### 📋 Alternative Manuelle
Si vous préférez extraire les images manuellement :
1. Ouvrez `Video.mp4` dans VLC Media Player
2. Mettez en pause à un moment intéressant
3. Menu **Vidéo** → **Prendre une capture d'écran**
4. Renommez en `video-frame-1.jpg` et placez dans `images/`
5. Répétez pour un autre moment → `video-frame-2.jpg`

📖 **Guide complet** : Consultez `GUIDE-EXTRACTION-IMAGES.md`

### 2. Vérifier les Images
Après extraction, vous devriez avoir dans `images/` :
- ✅ Video.mp4
- ✅ Capture.PNG
- ✅ Capture2.PNG
- ⭐ video-frame-1.jpg (nouveau)
- ⭐ video-frame-2.jpg (nouveau)

### 3. Ouvrir le site
Double-cliquez sur **index.html** pour voir votre site complet !

### 4. Galerie Complète
Votre galerie affichera maintenant :
1. **Vidéo** - Bande-annonce en haut
2. **Capture.PNG** - Exploration des Backrooms
3. **Capture2.PNG** - Atmosphère Inquiétante
4. **video-frame-1.jpg** - Extrait de la vidéo
5. **video-frame-2.jpg** - Moment intense

## 🎨 Fonctionnalités Intégrées

### ✨ Votre jeu est maintenant présenté avec :
- ✅ **Chat de proximité** - Mis en avant dans les caractéristiques
- ✅ **Monstres réactifs** - Expliqué avec l'insulte qui déclenche la poursuite
- ✅ **Multijoueur Steam** - Steam Advanced Session mentionné
- ✅ **Nombreux niveaux** - Avec plusieurs sorties
- ✅ **Screamers** - Fonctionnalité mise en avant
- ✅ **Menu 3D** - Présenté comme unique
- ✅ **Monstres variés** - Différents types expliqués
- ✅ **Configuration exacte** - i5-4570 + GTX 1050 (min) / i7-7700 + GTX 1080 (rec)
- ✅ **Vidéo intégrée** - Video.mp4 en haut de la galerie

## 🌐 Mettre en Ligne

### Option 1 : GitHub Pages (Recommandé)
1. Créez un compte sur https://github.com
2. Créez un nouveau repository "backrooms-game"
3. Uploadez tous les fichiers du dossier backrooms-website
4. Allez dans Settings → Pages
5. Sélectionnez la branche "main" et cliquez sur Save
6. Votre site sera en ligne à : `https://votre-nom.github.io/backrooms-game`

### Option 2 : Netlify (Le plus simple)
1. Allez sur https://www.netlify.com
2. Créez un compte gratuit
3. Glissez-déposez le dossier "backrooms-website"
4. Votre site est en ligne instantanément !
5. Vous obtenez une URL comme : `https://votre-site.netlify.app`

### Option 3 : Vercel
1. Allez sur https://vercel.com
2. Créez un compte gratuit
3. Importez votre projet
4. Déployez en un clic

## 🎯 Personnalisation Supplémentaire

### Modifier les liens de téléchargement
Dans **index.html**, ligne ~183-186, remplacez les `#` par vos vrais liens :
```html
<a href="VOTRE_LIEN_STEAM" class="platform-link">Steam</a>
<a href="VOTRE_LIEN_EPIC" class="platform-link">Epic Games</a>
<a href="VOTRE_LIEN_ITCH" class="platform-link">Itch.io</a>
```

### Ajouter vos réseaux sociaux
Dans le footer (ligne ~210-216), ajoutez vos liens :
```html
<li><a href="VOTRE_DISCORD">Discord</a></li>
<li><a href="VOTRE_TWITTER">Twitter</a></li>
<li><a href="VOTRE_YOUTUBE">YouTube</a></li>
```

## 📱 Test du Site

### Testez sur différents appareils :
1. **Desktop** - Ouvrez index.html normalement
2. **Mobile** - Appuyez sur F12 → Icône mobile (Ctrl+Shift+M)
3. **Tablette** - Même chose, sélectionnez "iPad" dans le menu

### Vérifiez :
- ✅ La vidéo se lit correctement
- ✅ Les images s'affichent (renommez-les si besoin)
- ✅ Le menu burger fonctionne sur mobile
- ✅ Les animations se déclenchent au scroll
- ✅ Les liens fonctionnent

## 🎮 Fonctionnalités Spéciales

### Easter Egg
Essayez le code Konami sur votre site : ↑↑↓↓←→←→BA

### Effets Visuels
- Effet glitch sur le titre "BACKROOMS"
- Parallax sur la section hero
- Animations au scroll
- Galerie interactive avec modal
- Traînée de curseur atmosphérique

## 📚 Documentation

Consultez les fichiers suivants pour plus d'infos :
- **README.md** - Documentation complète
- **DEMARRAGE-RAPIDE.md** - Guide rapide
- **FONCTIONNALITES.md** - Liste de toutes les fonctionnalités du jeu

## 🐛 Problèmes Courants

### La vidéo ne se lit pas ?
- Vérifiez que Video.mp4 est bien dans le dossier images/
- Essayez de convertir la vidéo en H.264 si nécessaire

### Les images ne s'affichent pas ?
- Renommez vos fichiers en screenshot1.jpg, screenshot2.jpg, etc.
- Ou modifiez les chemins dans index.html

### Le site ne s'ouvre pas ?
- Assurez-vous d'ouvrir index.html avec un navigateur moderne (Chrome, Firefox, Edge)

## 🎊 Félicitations !

Votre site web professionnel pour Backrooms UE5.4 est prêt !

### Prochaines étapes :
1. ✅ Renommer les captures d'écran
2. ✅ Tester le site localement
3. ✅ Ajouter vos liens de téléchargement
4. ✅ Mettre en ligne sur GitHub Pages ou Netlify
5. ✅ Partager avec votre communauté !

---

**Besoin d'aide ?** Consultez les autres fichiers de documentation ou les commentaires dans le code.

**Bon lancement avec votre jeu Backrooms ! 🎮👻**