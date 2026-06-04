# GreeceClean — Android app icon (launcher)

Production-ready launcher icon for the **GreeceClean** Android app, built from the
refreshed pin-as-“G” mark (white symbol on Aegean Blue `#0D6FDB`). Drop these
straight into the app module's `res/` tree.

## What's here

```
android/
├─ ic_launcher-playstore.png            512×512 — Google Play Store listing icon (full-bleed)
├─ mipmap-anydpi-v26/
│  ├─ ic_launcher.xml                    adaptive-icon definition (API 26+)
│  ├─ ic_launcher_foreground.png         432×432 — white mark, transparent, inside the 66dp safe zone
│  └─ ic_launcher_background.png         432×432 — flat Aegean Blue (raster fallback)
├─ values/
│  └─ ic_launcher_background.xml         <color name="ic_launcher_background">#0D6FDB</color>
├─ mipmap-mdpi/ic_launcher.png           48×48    legacy round-square launcher (API < 26)
├─ mipmap-hdpi/ic_launcher.png           72×72
├─ mipmap-xhdpi/ic_launcher.png          96×96
├─ mipmap-xxhdpi/ic_launcher.png         144×144
└─ mipmap-xxxhdpi/ic_launcher.png        192×192
```

## Install

1. Copy each `mipmap-*` folder into `app/src/main/res/` (merge with existing).
2. Copy `values/ic_launcher_background.xml` into `app/src/main/res/values/`
   (or add the `ic_launcher_background` color to your existing `colors.xml`).
3. Reference the icon in `AndroidManifest.xml`:
   ```xml
   <application
       android:icon="@mipmap/ic_launcher"
       android:roundIcon="@mipmap/ic_launcher"
       ... >
   ```
4. Upload `ic_launcher-playstore.png` (512×512) in the Play Console → Store listing.

## Notes

- **Adaptive icon:** the OS masks the foreground+background into circle / squircle /
  rounded-square per device. The mark is centred inside the **66dp safe zone**, so it
  never gets clipped by any mask shape.
- **Background** is a flat `#0D6FDB` fill — defined both as a color resource (preferred,
  crisp at any size) and as a 432×432 raster fallback.
- A **`<monochrome>`** layer is wired to the foreground for Android 13+ themed icons.
  For a true themed icon, supply a single-colour (alpha-only) silhouette later if desired.
- Source artwork: `../app-icon.png` (master) · `../logo-symbol-white.png` (mark).
  Brand: Aegean Blue `#0D6FDB`, Eco Green `#39B24A`. Mark = pin-as-“G” + eco leaf + Aegean waves.
