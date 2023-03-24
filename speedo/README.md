# TF2 Speedo Hud

![Preview](https://user-images.githubusercontent.com/13366049/226966436-ba7b807a-73b9-4ced-ae5f-455a65033e30.png)
![Preview 2](https://user-images.githubusercontent.com/13366049/227498500-de58cde9-ffbe-422f-acee-e3f18419790d.png)


### Installation
1. Place this folder inside your `tf/custom` folder
2. Edit your hud's `scripts/hudlayout.res` file and add `#base "../resource/speedo_horizontal_center.res"` at the top
> Or add it inside `resource/ui/hudplayerclass.res` instead, if you want it to show only when player is alive

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
#base "../resource/speedo_absolute_right.res"
"Resource/HudLayout.res" {
  "speedo_absolute_right" {
    "xpos" "c-64"
    "ypos" "0"
    "wide" "128"
    "tall" "32"
    "d4" { "wide" "32" "tall" "32" }
    "d3" { "wide" "32" "tall" "32" }
    "d2" { "wide" "32" "tall" "32" }
    "d1" { "wide" "32" "tall" "32" }
  }
  
  ...
}
```

<details>
  <summary>Example of changing size of digits for center aligned speedo</summary>
  <br>
  
```res
#base "../resource/speedo_horizontal_center.res"
"Resource/HudLayout.res" {
  "speedo_horizontal_center" {
    "xpos" "c-128"
    "wide" "256"
    "tall" "64"
    "d4_4k" { "wide" "64" "tall" "64" }
    "d3_4k" { "wide" "64" "tall" "64" }
    "d2_4k" { "wide" "64" "tall" "64" }
    "d1_4k" { "wide" "64" "tall" "64" }
    "d3_3k" { "wide" "64" "tall" "64" "xpos" "32" }
    "d2_3k" { "wide" "64" "tall" "64" }
    "d1_3k" { "wide" "64" "tall" "64" }
    "d2_2k" { "wide" "64" "tall" "64" "xpos" "64" }
    "d1_2k" { "wide" "64" "tall" "64" }
    "d1_1k" { "wide" "64" "tall" "64" "xpos" "96" }
  }
  
  ...
}
```
</details>

### Credits
Waldo, SgtPugs, ILDPRUT
