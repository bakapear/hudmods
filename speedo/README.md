# TF2 Speedo Hud

### Installation
1. Place this folder inside your `tf/custom` folder
2. Edit your hud's `scripts/hudlayout.res` file and add `#base "../resource/speedo_horizontal_center.res"` at the top

### Customization
There are 3 variations (`horizontal`, `vertical`, `absolute`) each having 3 alignments (`left`, `right`, `center`) to choose from. It is possible to include multiple different variations in the hudlayout file.

You can override the position/defaults in your `hudlayout.res` file like this:
```res
#base "../resource/speedo_vertical_right.res"
#base "../resource/speedo_horizontal_left.res"
"Resource/HudLayout.res" {
  "speedo_vertical_right" { "xpos" "100" "ypos" "200" }
  "speedo_horizontal_left" { "xpos" "100" "ypos" "250" } 
  
  // rest of hudlayout.res here
  ...
}
```

The digit textures file is located at `materials/vgui/replay/thumbnails/speedo/digits.vtf`. If you want to use custom digit textures, make sure that each digit is equal to the animation frame, with frame 10 being an empty texture.

If you want to change the scale of the digits, see the individual `resource/speedo_<variation>_<alignment>.res` files for reference and change them either in the file itself or override in your `hudlayout.res` file:

```res
#base "../resource/speedo_absolute_center.res"
"Resource/HudLayout.res" {
  "speedo_absolute_right" {
    "ypos" "0"
    "d4" { "wide" "32" "tall" "32" }
    "d3" { "wide" "32" "tall" "32" }
    "d2" { "wide" "32" "tall" "32" }
    "d1" { "wide" "32" "tall" "32" }
  }
  
  ...
}
```


### Credits
Waldo, SgtPugs, ILDPRUT