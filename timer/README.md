# TF2 Timer Hud

### Installation
1. Place this folder inside your `tf/custom` folder
2. Edit your hud's `scripts/hudlayout.res` file and add `#base "../resource/timer.res"` at the top
> Or add it inside `resource/ui/hudplayerclass.res` instead, if you want it to show only when player is alive

### Configuring Zones
1. Create a .vmt file inside `materials/vgui/replay/thumbnails/timer/zones/`
2. Add start- and endzone mins/maxs in the file:
```res
"UnlitGeneric" {
	$startzone_mins "[-448 -160 1280]"
	$startzone_maxs "[-320 64 1504]"
	$endzone_mins "[13888 3088 -3584]"
	$endzone_maxs "[15168 4624 -1936]"
}
```
3. Edit `materials/vgui/replay/thumbnails/timer/mod.vmt` and add `#base "zones/your_custom_zone.vmt"` at the top
4. Run `hud_reloadscheme` in console to apply the changes in-game