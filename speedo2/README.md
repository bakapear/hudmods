# TF2 Speedo Hud (Version 2 ~EXCLUSIVE BETA RELEASE~)

`What this does is that it stores the previous reading, and then the speedo value it displays is a combination of the current reading and the previous reading. 
So with this the speedo numbers will update quickly, but numbers displayed will be delayed. - Suthrey 2023`

### Installation
1. Place this folder inside your `tf/custom` folder
2. Edit your hud's `scripts/hudlayout.res` file and add `#base "../resource/speedo.res"` at the top
> Or add it inside `resource/ui/hudplayerclass.res` instead, if you want it to show only when player is alive

### Pseudo Code
```js
x = 0.0, prev_x = 0.0, = dx = 0.0
y = 0.0, prev_y = 0.0, = dy = 0.0
z = 0.0, prev_z = 0.0, = dz = 0.0

t = 0.0, prev_t = 0.0, = dt = 0.0
v = 0.0, prev_v = 0.0, = dv = 0.0

timer = 0.0
total_dist = 0.0

speedo = 0.0

prev_timer = 0.0
prev_total_dist =  0.0

timer_delay = 0.1
eps = 0.001953125

proxies {
	x,y,z = player_position()
	v = player_speed()
	t = current_time()
	
	dx = x - prev_x
	dy = y - prev_y
	dz = z - prev_z
	dt = t - prev_t
	dv = v - prev_v
	
	dist = sqrt(dx^2 + dy^2)
	// sqrt using 4 iterations of newtons method -> sqrt = 0.5(sqrt + number/sqrt)
	// with initial guess -> abs(dx) + abs(dy)

	if (dist <= 100): // not being teled
	  total_dist += dist
	  timer += dt
	
	if (abs(dv) >= 100): // detect getting hit by rocket/ jumping / bonking something
	  prev_timer = 0.0
	  prev_total_dist = 0.0
	  timer = 0.0
	  total_dist = 0.0  

	if (timer > 0.0):
	  speedo = (total_dist + prev_total_dist) / (timer + prev_timer) 
	
	if (timer >= timer_delay):
	  prev_timer = timer
	  prev_total_dist = total_dist
	  total_dist = 0.0
	  timer = 0.0
	
	if (abs(dz) <= eps):
	  speedo = v
	
	prev_x = x
	prev_y = y
	prev_z = z
	prev_t = t
	prev_v = v
	
	display(speedo + 0.1)
}
```

### Credits
Suthrey, Peaches
