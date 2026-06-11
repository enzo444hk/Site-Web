# 🎬 Guide d'Extraction d'Images de la Vidéo

## 📸 Objectif
Extraire 2 images de votre vidéo Video.mp4 pour compléter la galerie du site web.

## 🚀 Méthode Automatique (Recommandée)

### Option 1 : Fichier Batch (Windows)
1. **Double-cliquez** sur `EXTRAIRE-IMAGES.bat`
2. Le script va :
   - Vérifier que Python est installé
   - Installer opencv-python si nécessaire
   - Extraire 2 images de la vidéo
3. Les images seront créées dans le dossier `images/` :
   - `video-frame-1.jpg`
   - `video-frame-2.jpg`

### Option 2 : Ligne de commande
```bash
# Installer opencv-python (une seule fois)
pip install opencv-python

# Exécuter le script
python extract_video_frames.py
```

## 📋 Prérequis
- **Python 3.x** installé sur votre système
  - Téléchargez depuis : https://www.python.org/downloads/
  - ⚠️ Cochez "Add Python to PATH" lors de l'installation
- **opencv-python** (sera installé automatiquement par le script)

## 🎯 Résultat Attendu

Après l'exécution, vous aurez :
```
backrooms-website/
├── images/
│   ├── Video.mp4 ✅
│   ├── Capture.PNG ✅
│   ├── Capture2.PNG ✅
│   ├── video-frame-1.jpg ⭐ NOUVEAU
│   └── video-frame-2.jpg ⭐ NOUVEAU
```

## 🌐 Galerie Complète

Votre site affichera maintenant :
1. **Bande-annonce vidéo** (Video.mp4) - En haut de la galerie
2. **Capture.PNG** - Exploration des Backrooms
3. **Capture2.PNG** - Atmosphère Inquiétante
4. **video-frame-1.jpg** - Extrait de la bande-annonce
5. **video-frame-2.jpg** - Moment intense du jeu

## 🔧 Méthode Manuelle (Alternative)

Si vous préférez extraire les images manuellement :

### Avec VLC Media Player
1. Ouvrez `Video.mp4` dans VLC
2. Mettez en pause à un moment intéressant
3. Menu **Vidéo** → **Prendre une capture d'écran**
4. Renommez l'image en `video-frame-1.jpg`
5. Répétez pour un autre moment → `video-frame-2.jpg`
6. Placez les images dans le dossier `images/`

### Avec Windows Media Player
1. Ouvrez `Video.mp4`
2. Mettez en pause
3. Appuyez sur **Windows + Shift + S** (Outil Capture)
4. Capturez l'image
5. Enregistrez comme `video-frame-1.jpg` dans `images/`
6. Répétez pour `video-frame-2.jpg`

### Avec un Éditeur Vidéo
- **DaVinci Resolve** (gratuit)
- **Shotcut** (gratuit)
- **Adobe Premiere** (payant)

Exportez 2 frames aux moments clés de votre vidéo.

## ✅ Vérification

Après l'extraction, vérifiez que :
- [ ] Les fichiers `video-frame-1.jpg` et `video-frame-2.jpg` existent dans `images/`
- [ ] Les images ont une bonne résolution (1920x1080 recommandé)
- [ ] Les images montrent des moments intéressants du jeu

## 🎨 Conseils pour Choisir les Moments

Choisissez des images qui montrent :
- ✅ L'atmosphère unique des Backrooms
- ✅ Des moments d'action ou de tension
- ✅ Les graphismes UE5.4 (Lumen/Nanite)
- ✅ Le gameplay (chat vocal, monstres, etc.)
- ❌ Évitez les écrans noirs ou transitions
- ❌ Évitez les images floues

## 🐛 Dépannage

### "Python n'est pas reconnu..."
- Installez Python depuis python.org
- Cochez "Add Python to PATH" lors de l'installation
- Redémarrez votre ordinateur

### "opencv-python ne s'installe pas"
```bash
# Essayez avec pip3
pip3 install opencv-python

# Ou avec python -m pip
python -m pip install opencv-python
```

### "La vidéo ne peut pas être ouverte"
- Vérifiez que `Video.mp4` est bien dans le dossier `images/`
- Vérifiez que le fichier n'est pas corrompu
- Essayez de lire la vidéo avec VLC pour confirmer qu'elle fonctionne

### Les images sont de mauvaise qualité
- Le script extrait en qualité 95% JPEG
- Si vous voulez plus de qualité, modifiez la ligne 62 dans `extract_video_frames.py` :
  ```python
  cv2.imwrite(output_path, frame, [cv2.IMWRITE_JPEG_QUALITY, 100])
  ```

## 📞 Besoin d'Aide ?

Si vous rencontrez des problèmes :
1. Vérifiez que Python est installé : `python --version`
2. Vérifiez que la vidéo existe : `dir images\Video.mp4`
3. Essayez la méthode manuelle avec VLC

---

**Une fois les images extraites, ouvrez `index.html` pour voir votre site complet ! 🎉**