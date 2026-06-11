@echo off
chcp 65001 >nul
echo ========================================
echo 🎬 EXTRACTION D'IMAGES DE LA VIDÉO
echo ========================================
echo.

REM Vérifier si Python est installé
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python n'est pas installé ou n'est pas dans le PATH
    echo.
    echo 💡 Téléchargez Python depuis: https://www.python.org/downloads/
    echo    Cochez "Add Python to PATH" lors de l'installation
    pause
    exit /b 1
)

echo ✅ Python détecté
echo.

REM Vérifier si opencv-python est installé
python -c "import cv2" >nul 2>&1
if errorlevel 1 (
    echo 📦 Installation d'opencv-python...
    echo.
    pip install opencv-python
    echo.
)

REM Exécuter le script d'extraction
echo 🚀 Extraction des images en cours...
echo.
python extract_video_frames.py

echo.
echo ========================================
pause

@REM Made with Bob
