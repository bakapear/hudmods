let $TICK = 0.015
let $GRAVITY = -800.0
let $TICKGRAV = -12.0
let $MAXVEL = 3500.0
let $EPSILON = 0.03125

let $JVEL = 283.0

let $OFFSET_CROUCHED = 20

let $LAND_UNCROUCHED = 0
let $LAND_CROUCHED = 1
let $LAND_JUMPBUG = 2

// bounce parameters
let $BOUNCE_FLOOR_HEIGHT = 0.0
let $BOUNCE_LAND = 0
let $BOUNCE_TELEHEIGHT = 1

// player parameters
let $PLAYER_Z_POS = 0.0
let $PLAYER_Z_VEL = 0.0

let $0 = 0.0
let $h = 0.5
let $1 = 1.0
let $2 = 2.0
let $n = -1.0
let $tmp1, $tmp2, $tmp3
let $height, $intervalmin, $intervalmax, $vel, $ticktop, $maxzrel, $heightmax, $heightmin, $tick0, $z0, $tickmax, $tickmin, $b

let $sqrt = 0.0
let $num = 0.0

function checkBounce () {
  $height = $PLAYER_Z_POS - $BOUNCE_FLOOR_HEIGHT

  // if (BOUNCE_LAND === LAND_CROUCHED) height += OFFSET_CROUCHED
  $tmp1 = $BOUNCE_LAND - $LAND_CROUCHED
  $tmp1 = Math.abs($tmp1)
  $tmp2 = $height + $OFFSET_CROUCHED
  $height = $tmp1 <= $0 ? $tmp2 : $height

  $height = $height + $EPSILON

  // intervalmin = BOUNCE_LAND === LAND_JUMPBUG ? Math.max(0, BOUNCE_TELEHEIGHT - 283 * TICK) : BOUNCE_TELEHEIGHT
  $tmp1 = $BOUNCE_LAND - $LAND_JUMPBUG
  $tmp1 = Math.abs($tmp1)
  $tmp2 = $JVEL * $TICK
  $tmp2 = $BOUNCE_TELEHEIGHT - $tmp2
  $tmp2 = $tmp2 <= $0 ? $0 : $tmp2
  $intervalmin = $tmp1 <= $0 ? $tmp2 : $BOUNCE_TELEHEIGHT

  $intervalmax = $2

  $vel = $PLAYER_Z_VEL

  // --- getValidHeight ---

  // ticktop = Math.ceil(-vel / TICKGRAV)
  $tmp1 = $vel * $n
  $tmp1 = $tmp1 / $TICKGRAV
  $tmp2 = $tmp1 % $1 // Frac
  $tmp1 = Math.trunc($tmp1) // Int
  $tmp3 = $tmp1 + $1
  $ticktop = $tmp2 <= $0 ? $tmp1 : $tmp3

  // maxzrel = ticktop >= 0 ? (0.5 * TICKGRAV * ticktop * ticktop * TICK + vel * ticktop * TICK) : 0.0
  $tmp1 = $h * $TICKGRAV
  $tmp1 = $ticktop * $tmp1
  $tmp1 = $ticktop * $tmp1
  $tmp1 = $TICK * $tmp1
  $tmp2 = $vel * $ticktop
  $tmp2 = $TICK * $tmp2
  $tmp2 = $tmp1 + $tmp2

  $maxzrel = $0 <= $ticktop ? $tmp2 : $0

  // heightmax = Math.max(height - intervalmin, -maxzrel)
  $tmp1 = $n * $maxzrel
  $tmp2 = $height - $intervalmin
  $heightmax = $tmp2 <= $tmp1 ? $tmp1 : $tmp2

  // heightmin = Math.max(height - intervalmax, -maxzrel)
  $tmp2 = $height - $intervalmax
  $heightmin = $tmp2 <= $tmp1 ? $tmp1 : $tmp2

  // tick0 = Math.ceil(-(vel + MAXVEL) / TICKGRAV) - 1
  $tmp1 = $vel + $MAXVEL
  $tmp1 = $tmp1 * $n
  $tmp1 = $tmp1 / $TICKGRAV
  $tmp2 = $tmp1 % $1 // Frac
  $tmp1 = Math.trunc($tmp1) // Int
  $tmp3 = $tmp1 + $1
  $tmp1 = $tmp2 <= $0 ? $tmp1 : $tmp3
  $tick0 = $tmp1 - $1

  // if (tick0 === -1) tick0 = 0
  $tmp1 = $tick0 - $n
  $tmp1 = Math.abs($tmp1)
  $tick0 = $tmp1 <= $0 ? $0 : $tick0

  // --- getLandTickFromStartZVel heightmax ---
  // z0 = 0.5 * TICKGRAV * tick0 * tick0 * TICK + vel * tick0 * TICK + heightmax
  $tmp1 = $h * $TICKGRAV
  $tmp1 = $tick0 * $tmp1
  $tmp1 = $tick0 * $tmp1
  $tmp1 = $TICK * $tmp1
  $tmp2 = $vel * $tick0
  $tmp2 = $TICK * $tmp2
  $tmp1 = $tmp1 + $tmp2
  $z0 = $tmp1 + $heightmax

  // tickmax = z0 <= 0.0 ? -(vel + Math.sqrt(vel * vel - 2.0 * GRAVITY * heightmax)) / TICKGRAV : heightmax / (MAXVEL * TICK) + (1 + vel / MAXVEL) * tick0 + 0.5 * TICKGRAV / MAXVEL * tick0 * tick0
  // PART1: -(vel + Math.sqrt(vel * vel - 2.0 * GRAVITY * heightmax)) / TICKGRAV
  $tmp1 = $vel * $vel
  $tmp2 = $2 * $GRAVITY
  $tmp2 = $heightmax * $tmp2
  $tmp1 = $tmp1 - $tmp2

  // SQRT START

  // initial guess = tick0
  $sqrt = $tick0
  // number we want to sqrt
  $num = $tmp1
  // sqrt using 10 iterations of newtons method -> sqrt = 0.5(sqrt + number/sqrt)
  $tmp1 = $num / $sqrt
  $tmp1 = $tmp1 + $sqrt
  $sqrt = $h * $tmp1
  $tmp1 = $num / $sqrt
  $tmp1 = $tmp1 + $sqrt
  $sqrt = $h * $tmp1
  $tmp1 = $num / $sqrt
  $tmp1 = $tmp1 + $sqrt
  $sqrt = $h * $tmp1
  $tmp1 = $num / $sqrt
  $tmp1 = $tmp1 + $sqrt
  $sqrt = $h * $tmp1
  $tmp1 = $num / $sqrt
  $tmp1 = $tmp1 + $sqrt
  $sqrt = $h * $tmp1
  $tmp1 = $num / $sqrt
  $tmp1 = $tmp1 + $sqrt
  $sqrt = $h * $tmp1
  $tmp1 = $num / $sqrt
  $tmp1 = $tmp1 + $sqrt
  $sqrt = $h * $tmp1
  $tmp1 = $num / $sqrt
  $tmp1 = $tmp1 + $sqrt
  $sqrt = $h * $tmp1
  $tmp1 = $num / $sqrt
  $tmp1 = $tmp1 + $sqrt
  $sqrt = $h * $tmp1
  $tmp1 = $num / $sqrt
  $tmp1 = $tmp1 + $sqrt
  $sqrt = $h * $tmp1

  $tmp1 = $sqrt

  // SQRT END

  $tmp1 = $vel + $tmp1
  $tmp1 = $n * $tmp1
  $tickmax = $tmp1 / $TICKGRAV
  // PART2: heightmax / (MAXVEL * TICK) + (1 + vel / MAXVEL) * tick0 + 0.5 * TICKGRAV / MAXVEL * tick0 * tick0
  // tmp1 + tmp2
  $tmp1 = $MAXVEL * $TICK
  $tmp1 = $heightmax / $tmp1
  $tmp2 = $vel / $MAXVEL
  $tmp2 = $1 + $tmp2
  $tmp2 = $tick0 * $tmp2
  $tmp1 = $tmp2 + $tmp1
  $tmp2 = $h * $TICKGRAV
  $tmp2 = $tmp2 / $MAXVEL
  $tmp2 = $tick0 * $tmp2
  $tmp2 = $tick0 * $tmp2
  $tmp1 = $tmp1 + $tmp2

  $tickmax = $z0 <= $0 ? $tickmax : $tmp1

  $tickmax = Math.trunc($tickmax) // Int

  // --- getLandTickFromStartZVel heightmin ---
  // z0 = 0.5 * TICKGRAV * tick0 * tick0 * TICK + vel * tick0 * TICK + heightmin
  $tmp1 = $h * $TICKGRAV
  $tmp1 = $tick0 * $tmp1
  $tmp1 = $tick0 * $tmp1
  $tmp1 = $TICK * $tmp1
  $tmp2 = $vel * $tick0
  $tmp2 = $TICK * $tmp2
  $tmp1 = $tmp1 + $tmp2
  $z0 = $tmp1 + $heightmin

  // tickmin = z0 <= 0.0 ? -(vel + Math.sqrt(vel * vel - 2.0 * GRAVITY * heightmin)) / TICKGRAV : heightmin / (MAXVEL * TICK) + (1 + vel / MAXVEL) * tick0 + 0.5 * TICKGRAV / MAXVEL * tick0 * tick0
  // PART1: -(vel + Math.sqrt(vel * vel - 2.0 * GRAVITY * heightmin)) / TICKGRAV
  $tmp1 = $vel * $vel
  $tmp2 = $2 * $GRAVITY
  $tmp2 = $heightmin * $tmp2
  $tmp1 = $tmp1 - $tmp2

  // SQRT START

  // initial guess = tick0
  $sqrt = $tick0
  // number we want to sqrt
  $num = $tmp1
  // sqrt using 10 iterations of newtons method -> sqrt = 0.5(sqrt + number/sqrt)
  $tmp1 = $num / $sqrt
  $tmp1 = $tmp1 + $sqrt
  $sqrt = $h * $tmp1
  $tmp1 = $num / $sqrt
  $tmp1 = $tmp1 + $sqrt
  $sqrt = $h * $tmp1
  $tmp1 = $num / $sqrt
  $tmp1 = $tmp1 + $sqrt
  $sqrt = $h * $tmp1
  $tmp1 = $num / $sqrt
  $tmp1 = $tmp1 + $sqrt
  $sqrt = $h * $tmp1
  $tmp1 = $num / $sqrt
  $tmp1 = $tmp1 + $sqrt
  $sqrt = $h * $tmp1
  $tmp1 = $num / $sqrt
  $tmp1 = $tmp1 + $sqrt
  $sqrt = $h * $tmp1
  $tmp1 = $num / $sqrt
  $tmp1 = $tmp1 + $sqrt
  $sqrt = $h * $tmp1
  $tmp1 = $num / $sqrt
  $tmp1 = $tmp1 + $sqrt
  $sqrt = $h * $tmp1
  $tmp1 = $num / $sqrt
  $tmp1 = $tmp1 + $sqrt
  $sqrt = $h * $tmp1
  $tmp1 = $num / $sqrt
  $tmp1 = $tmp1 + $sqrt
  $sqrt = $h * $tmp1

  $tmp1 = $sqrt

  // SQRT END

  $tmp1 = $vel + $tmp1
  $tmp1 = $n * $tmp1
  $tickmin = $tmp1 / $TICKGRAV
  // PART2: heightmin / (MAXVEL * TICK) + (1 + vel / MAXVEL) * tick0 + 0.5 * TICKGRAV / MAXVEL * tick0 * tick0
  // tmp1 + tmp2
  $tmp1 = $MAXVEL * $TICK
  $tmp1 = $heightmin / $tmp1
  $tmp2 = $vel / $MAXVEL
  $tmp2 = $1 + $tmp2
  $tmp2 = $tick0 * $tmp2
  $tmp1 = $tmp2 + $tmp1
  $tmp2 = $h * $TICKGRAV
  $tmp2 = $tmp2 / $MAXVEL
  $tmp2 = $tick0 * $tmp2
  $tmp2 = $tick0 * $tmp2
  $tmp1 = $tmp1 + $tmp2

  $tickmin = $z0 <= $0 ? $tickmin : $tmp1

  // tickmin = Math.ceil(tickmin)
  $tmp1 = $tickmin % $1 // Frac
  $tmp2 = Math.trunc($tickmin) // Int
  $tmp3 = $tmp2 + $1
  $tickmin = $tmp1 <= $0 ? $tmp2 : $tmp3

  // b = (height - intervalmax >= heightmax || height - intervalmin >= heightmin) && (tickmax - tickmin) >= 0.0
  // PART1: if (height - intervalmax >= heightmax) tmp1 = 1 else 0
  $tmp1 = $height - $intervalmax
  $tmp1 = $heightmax <= $tmp1 ? $1 : $0
  // PART2: if (height - intervalmin >= heightmin) tmp2 = 1 else 0
  $tmp2 = $height - $intervalmin
  $tmp2 = $heightmin <= $tmp2 ? $1 : $0

  $tmp1 = $tmp1 + $tmp2
  $tmp1 = $1 <= $tmp1 ? $1 : $0

  // PART3: if (tickmax - tickmin >= 0.0) tmp3 = 1 else 0
  $tmp3 = $tickmax - $tickmin
  $tmp3 = $0 <= $tmp3 ? $1 : $0

  $tmp1 = $tmp3 + $tmp1
  $b = $2 <= $tmp1 ? $1 : $0

  console.log(JSON.stringify({ res: Number($b), hmax: $heightmax, hmin: $heightmin, tmax: $tickmax, tmin: $tickmin, ttop: $ticktop, zrel: $maxzrel }))

  return Number($b)
}

$BOUNCE_FLOOR_HEIGHT = 0
$PLAYER_Z_VEL = -6
$BOUNCE_LAND = $LAND_UNCROUCHED

$PLAYER_Z_POS = 100
checkBounce()
$PLAYER_Z_POS = 97
checkBounce()
$PLAYER_Z_POS = 102
checkBounce()
$PLAYER_Z_POS = 4832
$PLAYER_Z_VEL = 483
checkBounce()
