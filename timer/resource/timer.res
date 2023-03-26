"Timer.res" {

	"timer_bg" {
		"controlName" "EditablePanel"
		"xpos" "c-31"
		"ypos" "c97"
		"wide" "61"
		"tall" "16"
		"bgcolor_override" "0 0 0 125"
		"paintbackgroundtype" "2"
	}

	"timer" {
		"controlName" "EditablePanel"
		"visible" "1" // default visibility
		"enabled" "1"
		"wide" "60"
		"tall" "10"
		"xpos" "c-29"
		"ypos" "c100"
		
		"d4" {
			"controlName" "CTFImagePanel"
			"wide" "10"
			"tall" "10"
			"image" "replay/thumbnails/timer/digits/d4"
		}
		"d3" {
			"controlName" "CTFImagePanel"
			"xpos" "-2"
			"wide" "10"
			"tall" "10"
			"image" "replay/thumbnails/timer/digits/d3"
			
			"pin_to_sibling"		"d4"
			"pin_corner_to_sibling"		"7"
			"pin_to_sibling_corner"		"5"
		}
		"colon" {
			"controlName" "CTFImagePanel"
			"xpos" "-4"
			"wide" "10"
			"tall" "10"
			"image" "replay/thumbnails/timer/digits/colon"
			
			"pin_to_sibling"		"d3"
			"pin_corner_to_sibling"		"7"
			"pin_to_sibling_corner"		"5"
		}
		"d2" {
			"controlName" "CTFImagePanel"
			"xpos" "-4"
			"wide" "10"
			"tall" "10"
			"image" "replay/thumbnails/timer/digits/d2"
			
			"pin_to_sibling"		"colon"
			"pin_corner_to_sibling"		"7"
			"pin_to_sibling_corner"		"5"
		}
		"d1" {
			"controlName" "CTFImagePanel"
			"xpos" "-2"
			"wide" "10"
			"tall" "10"
			"image" "replay/thumbnails/timer/digits/d1"
			
			"pin_to_sibling"		"d2"
			"pin_corner_to_sibling"		"7"
			"pin_to_sibling_corner"		"5"
		}
		"dot" {
			"controlName" "CTFImagePanel"
			"xpos" "-4"
			"wide" "10"
			"tall" "10"
			"image" "replay/thumbnails/timer/digits/dot"
			
			"pin_to_sibling"		"d1"
			"pin_corner_to_sibling"		"7"
			"pin_to_sibling_corner"		"5"
		}
		"n1" {
			"controlName" "CTFImagePanel"
			"xpos" "-4"
			"wide" "10"
			"tall" "10"
			"image" "replay/thumbnails/timer/digits/n1"
			
			"pin_to_sibling"		"dot"
			"pin_corner_to_sibling"		"7"
			"pin_to_sibling_corner"		"5"
		}
		"n2" {
			"controlName" "CTFImagePanel"
			"xpos" "-2"
			"wide" "10"
			"tall" "10"
			"image" "replay/thumbnails/timer/digits/n2"
			
			"pin_to_sibling"		"n1"
			"pin_corner_to_sibling"		"7"
			"pin_to_sibling_corner"		"5"
		}
	} 
}