let { Add, Multiply, Subtract, Divide, Equals, Abs, Frac, Int, LessOrEqual, SelectFirstIfNonZero, Clamp, WrapMinMax } = require('./funs')

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

$intervalmax = 2.0

let $sqrt = 0.0
let $num = 0.0

function checkBounce () {
  $height = Subtract($PLAYER_Z_POS, $BOUNCE_FLOOR_HEIGHT, $height)

  // if (BOUNCE_LAND === LAND_CROUCHED) height += OFFSET_CROUCHED
  $tmp1 = Subtract($BOUNCE_LAND, $LAND_CROUCHED, $tmp1)
  $tmp1 = Abs($tmp1, $tmp1)
  $tmp2 = Add($height, $OFFSET_CROUCHED, $tmp2)
  $height = LessOrEqual($tmp1, $0, $tmp2, $height, $height)

  $height = Add($height, $EPSILON, $height)

  // intervalmin = BOUNCE_LAND === LAND_JUMPBUG ? Math.max(0, BOUNCE_TELEHEIGHT - 283 * TICK) : BOUNCE_TELEHEIGHT
  $tmp1 = Subtract($BOUNCE_LAND, $LAND_JUMPBUG, $tmp1)
  $tmp1 = Abs($tmp1, $tmp1)
  $tmp2 = Multiply($JVEL, $TICK, $tmp2)
  $tmp2 = Subtract($BOUNCE_TELEHEIGHT, $tmp2, $tmp2)
  $tmp2 = LessOrEqual($tmp2, $0, $0, $tmp2, $tmp2)
  $intervalmin = LessOrEqual($tmp1, $0, $tmp2, $BOUNCE_TELEHEIGHT, $intervalmin)

  $vel = Equals($PLAYER_Z_VEL, $vel)

  // --- getValidHeight ---

  // ticktop = Math.ceil(-vel / TICKGRAV)
  $tmp1 = Multiply($vel, $n, $tmp1)
  $tmp1 = Divide($tmp1, $TICKGRAV, $tmp1)
  $tmp2 = Frac($tmp1, $tmp2)
  $tmp1 = Int($tmp1, $tmp1) // Int
  $tmp3 = Add($tmp1, $1, $tmp3)
  $ticktop = LessOrEqual($tmp2, $0, $tmp1, $tmp3, $ticktop)

  // maxzrel = ticktop >= 0 ? (0.5 * TICKGRAV * ticktop * ticktop * TICK + vel * ticktop * TICK) : 0.0
  $tmp1 = Multiply($h, $TICKGRAV, $tmp1)
  $tmp1 = Multiply($ticktop, $tmp1, $tmp1)
  $tmp1 = Multiply($ticktop, $tmp1, $tmp1)
  $tmp1 = Multiply($TICK, $tmp1, $tmp1)
  $tmp2 = Multiply($vel, $ticktop, $tmp2)
  $tmp2 = Multiply($TICK, $tmp2, $tmp2)
  $tmp2 = Add($tmp1, $tmp2, $tmp2)

  $maxzrel = LessOrEqual($0, $ticktop, $tmp2, $0, $maxzrel)

  // heightmax = Math.max(height - intervalmin, -maxzrel)
  $tmp1 = Multiply($n, $maxzrel, $tmp1)
  $tmp2 = Subtract($height, $intervalmin, $tmp2)
  $heightmax = LessOrEqual($tmp2, $tmp1, $tmp1, $tmp2, $heightmax)

  // heightmin = Math.max(height - intervalmax, -maxzrel)
  $tmp2 = Subtract($height, $intervalmax, $tmp2)
  $heightmin = LessOrEqual($tmp2, $tmp1, $tmp1, $tmp2, $heightmin)

  // tick0 = Math.ceil(-(vel + MAXVEL) / TICKGRAV) - 1
  $tmp1 = Add($vel, $MAXVEL, $tmp1)
  $tmp1 = Multiply($tmp1, $n, $tmp1)
  $tmp1 = Divide($tmp1, $TICKGRAV, $tmp1)
  $tmp2 = Frac($tmp1, $tmp2) // Frac
  $tmp1 = Int($tmp1, $tmp1) // Int
  $tmp3 = Add($tmp1, $1, $tmp3)
  $tmp1 = LessOrEqual($tmp2, $0, $tmp1, $tmp3, $tmp1)
  $tick0 = Subtract($tmp1, $1, $tick0)

  // if (tick0 === -1) tick0 = 0
  $tmp1 = Subtract($tick0, $n, $tmp1)
  $tmp1 = Abs($tmp1, $tmp1)
  $tick0 = LessOrEqual($tmp1, $0, $0, $tick0, $tick0)

  // --- getLandTickFromStartZVel heightmax ---
  // z0 = 0.5 * TICKGRAV * tick0 * tick0 * TICK + vel * tick0 * TICK + heightmax
  $tmp1 = Multiply($h, $TICKGRAV, $tmp1)
  $tmp1 = Multiply($tick0, $tmp1, $tmp1)
  $tmp1 = Multiply($tick0, $tmp1, $tmp1)
  $tmp1 = Multiply($TICK, $tmp1, $tmp1)
  $tmp2 = Multiply($vel, $tick0, $tmp2)
  $tmp2 = Multiply($TICK, $tmp2, $tmp2)
  $tmp1 = Add($tmp1, $tmp2, $tmp1)
  $z0 = Add($tmp1, $heightmax, $z0)

  // tickmax = z0 <= 0.0 ? -(vel + Math.sqrt(vel * vel - 2.0 * GRAVITY * heightmax)) / TICKGRAV : heightmax / (MAXVEL * TICK) + (1 + vel / MAXVEL) * tick0 + 0.5 * TICKGRAV / MAXVEL * tick0 * tick0
  // PART1: -(vel + Math.sqrt(vel * vel - 2.0 * GRAVITY * heightmax)) / TICKGRAV
  $tmp1 = Multiply($vel, $vel, $tmp1)
  $tmp2 = Multiply($2, $GRAVITY, $tmp2)
  $tmp2 = Multiply($heightmax, $tmp2, $tmp2)
  $tmp1 = Subtract($tmp1, $tmp2, $tmp1)

  // SQRT START

  // initial guess = tick0
  $sqrt = Equals($tick0, $sqrt)
  // number we want to sqrt
  $num = Equals($tmp1, $num)
  // sqrt using 10 iterations of newtons method -> sqrt = 0.5(sqrt + number/sqrt)
  $tmp1 = Divide($num, $sqrt, $tmp1)
  $tmp1 = Add($tmp1, $sqrt, $tmp1)
  $sqrt = Multiply($h, $tmp1, $sqrt)
  $tmp1 = Divide($num, $sqrt, $tmp1)
  $tmp1 = Add($tmp1, $sqrt, $tmp1)
  $sqrt = Multiply($h, $tmp1, $sqrt)
  $tmp1 = Divide($num, $sqrt, $tmp1)
  $tmp1 = Add($tmp1, $sqrt, $tmp1)
  $sqrt = Multiply($h, $tmp1, $sqrt)
  $tmp1 = Divide($num, $sqrt, $tmp1)
  $tmp1 = Add($tmp1, $sqrt, $tmp1)
  $sqrt = Multiply($h, $tmp1, $sqrt)
  $tmp1 = Divide($num, $sqrt, $tmp1)
  $tmp1 = Add($tmp1, $sqrt, $tmp1)
  $sqrt = Multiply($h, $tmp1, $sqrt)
  $tmp1 = Divide($num, $sqrt, $tmp1)
  $tmp1 = Add($tmp1, $sqrt, $tmp1)
  $sqrt = Multiply($h, $tmp1, $sqrt)
  $tmp1 = Divide($num, $sqrt, $tmp1)
  $tmp1 = Add($tmp1, $sqrt, $tmp1)
  $sqrt = Multiply($h, $tmp1, $sqrt)
  $tmp1 = Divide($num, $sqrt, $tmp1)
  $tmp1 = Add($tmp1, $sqrt, $tmp1)
  $sqrt = Multiply($h, $tmp1, $sqrt)
  $tmp1 = Divide($num, $sqrt, $tmp1)
  $tmp1 = Add($tmp1, $sqrt, $tmp1)
  $sqrt = Multiply($h, $tmp1, $sqrt)
  $tmp1 = Divide($num, $sqrt, $tmp1)
  $tmp1 = Add($tmp1, $sqrt, $tmp1)
  $sqrt = Multiply($h, $tmp1, $sqrt)

  $tmp1 = Equals($sqrt, $tmp1)

  // SQRT END

  $tmp1 = Add($vel, $tmp1, $tmp1)
  $tmp1 = Multiply($n, $tmp1, $tmp1)
  $tickmax = Divide($tmp1, $TICKGRAV, $tickmax)
  // PART2: heightmax / (MAXVEL * TICK) + (1 + vel / MAXVEL) * tick0 + 0.5 * TICKGRAV / MAXVEL * tick0 * tick0
  // tmp1 + tmp2
  $tmp1 = Multiply($MAXVEL, $TICK, $tmp1)
  $tmp1 = Divide($heightmax, $tmp1, $tmp1)
  $tmp2 = Divide($vel, $MAXVEL, $tmp2)
  $tmp2 = Add($1, $tmp2, $tmp2)
  $tmp2 = Multiply($tick0, $tmp2, $tmp2)
  $tmp1 = Add($tmp2, $tmp1, $tmp1)
  $tmp2 = Multiply($h, $TICKGRAV, $tmp2)
  $tmp2 = Divide($tmp2, $MAXVEL, $tmp2)
  $tmp2 = Multiply($tick0, $tmp2, $tmp2)
  $tmp2 = Multiply($tick0, $tmp2, $tmp2)
  $tmp1 = Add($tmp1, $tmp2, $tmp1)

  $tickmax = LessOrEqual($z0, $0, $tickmax, $tmp1, $tickmax)

  $tickmax = Int($tickmax, $tickmax) // Int

  // --- getLandTickFromStartZVel heightmin ---
  // z0 = 0.5 * TICKGRAV * tick0 * tick0 * TICK + vel * tick0 * TICK + heightmin
  $tmp1 = Multiply($h, $TICKGRAV, $tmp1)
  $tmp1 = Multiply($tick0, $tmp1, $tmp1)
  $tmp1 = Multiply($tick0, $tmp1, $tmp1)
  $tmp1 = Multiply($TICK, $tmp1, $tmp1)
  $tmp2 = Multiply($vel, $tick0, $tmp2)
  $tmp2 = Multiply($TICK, $tmp2, $tmp2)
  $tmp1 = Add($tmp1, $tmp2, $tmp1)
  $z0 = Add($tmp1, $heightmin, $z0)

  // tickmin = z0 <= 0.0 ? -(vel + Math.sqrt(vel * vel - 2.0 * GRAVITY * heightmin)) / TICKGRAV : heightmin / (MAXVEL * TICK) + (1 + vel / MAXVEL) * tick0 + 0.5 * TICKGRAV / MAXVEL * tick0 * tick0
  // PART1: -(vel + Math.sqrt(vel * vel - 2.0 * GRAVITY * heightmin)) / TICKGRAV
  $tmp1 = Multiply($vel, $vel, $tmp1)
  $tmp2 = Multiply($2, $GRAVITY, $tmp2)
  $tmp2 = Multiply($heightmin, $tmp2, $tmp2)
  $tmp1 = Subtract($tmp1, $tmp2, $tmp1)

  // SQRT START

  // initial guess = tick0
  $sqrt = Equals($tick0, $sqrt)
  // number we want to sqrt
  $num = Equals($tmp1, $num)
  // sqrt using 10 iterations of newtons method -> sqrt = 0.5(sqrt + number/sqrt)
  $tmp1 = Divide($num, $sqrt, $tmp1)
  $tmp1 = Add($tmp1, $sqrt, $tmp1)
  $sqrt = Multiply($h, $tmp1, $sqrt)
  $tmp1 = Divide($num, $sqrt, $tmp1)
  $tmp1 = Add($tmp1, $sqrt, $tmp1)
  $sqrt = Multiply($h, $tmp1, $sqrt)
  $tmp1 = Divide($num, $sqrt, $tmp1)
  $tmp1 = Add($tmp1, $sqrt, $tmp1)
  $sqrt = Multiply($h, $tmp1, $sqrt)
  $tmp1 = Divide($num, $sqrt, $tmp1)
  $tmp1 = Add($tmp1, $sqrt, $tmp1)
  $sqrt = Multiply($h, $tmp1, $sqrt)
  $tmp1 = Divide($num, $sqrt, $tmp1)
  $tmp1 = Add($tmp1, $sqrt, $tmp1)
  $sqrt = Multiply($h, $tmp1, $sqrt)
  $tmp1 = Divide($num, $sqrt, $tmp1)
  $tmp1 = Add($tmp1, $sqrt, $tmp1)
  $sqrt = Multiply($h, $tmp1, $sqrt)
  $tmp1 = Divide($num, $sqrt, $tmp1)
  $tmp1 = Add($tmp1, $sqrt, $tmp1)
  $sqrt = Multiply($h, $tmp1, $sqrt)
  $tmp1 = Divide($num, $sqrt, $tmp1)
  $tmp1 = Add($tmp1, $sqrt, $tmp1)
  $sqrt = Multiply($h, $tmp1, $sqrt)
  $tmp1 = Divide($num, $sqrt, $tmp1)
  $tmp1 = Add($tmp1, $sqrt, $tmp1)
  $sqrt = Multiply($h, $tmp1, $sqrt)
  $tmp1 = Divide($num, $sqrt, $tmp1)
  $tmp1 = Add($tmp1, $sqrt, $tmp1)
  $sqrt = Multiply($h, $tmp1, $sqrt)

  $tmp1 = Equals($sqrt, $tmp1)

  // SQRT END

  $tmp1 = Add($vel, $tmp1, $tmp1)
  $tmp1 = Multiply($n, $tmp1, $tmp1)
  $tickmin = Divide($tmp1, $TICKGRAV, $tickmin)
  // PART2: heightmin / (MAXVEL * TICK) + (1 + vel / MAXVEL) * tick0 + 0.5 * TICKGRAV / MAXVEL * tick0 * tick0
  // tmp1 + tmp2
  $tmp1 = Multiply($MAXVEL, $TICK, $tmp1)
  $tmp1 = Divide($heightmin, $tmp1, $tmp1)
  $tmp2 = Divide($vel, $MAXVEL, $tmp2)
  $tmp2 = Add($1, $tmp2, $tmp2)
  $tmp2 = Multiply($tick0, $tmp2, $tmp2)
  $tmp1 = Add($tmp2, $tmp1, $tmp1)
  $tmp2 = Multiply($h, $TICKGRAV, $tmp2)
  $tmp2 = Divide($tmp2, $MAXVEL, $tmp2)
  $tmp2 = Multiply($tick0, $tmp2, $tmp2)
  $tmp2 = Multiply($tick0, $tmp2, $tmp2)
  $tmp1 = Add($tmp1, $tmp2, $tmp1)

  $tickmin = LessOrEqual($z0, $0, $tickmin, $tmp1, $tickmin)

  // tickmin = Math.ceil(tickmin)
  $tmp1 = Frac($tickmin, $tmp1) // Frac
  $tmp2 = Int($tickmin, $tmp2) // Int
  $tmp3 = Add($tmp2, $1, $tmp3)
  $tickmin = LessOrEqual($tmp1, $0, $tmp2, $tmp3, $tickmin)

  // b = (height - intervalmax >= heightmax || height - intervalmin >= heightmin) && (tickmax - tickmin) >= 0.0
  // PART1: if (height - intervalmax >= heightmax) tmp1 = 1 else 0
  $tmp1 = Subtract($height, $intervalmax, $tmp1)
  $tmp1 = LessOrEqual($heightmax, $tmp1, $1, $0, $tmp1)
  // PART2: if (height - intervalmin >= heightmin) tmp2 = 1 else 0
  $tmp2 = Subtract($height, $intervalmin, $tmp2)
  $tmp2 = LessOrEqual($heightmin, $tmp2, $1, $0, $tmp2)

  $tmp1 = Add($tmp1, $tmp2, $tmp1)
  $tmp1 = LessOrEqual($1, $tmp1, $1, $0, $tmp1)

  // PART3: if (tickmax - tickmin >= 0.0) tmp3 = 1 else 0
  $tmp3 = Subtract($tickmax, $tickmin, $tmp3)
  $tmp3 = LessOrEqual($0, $tmp3, $1, $0, $tmp3)

  $tmp1 = Add($tmp3, $tmp1, $tmp1)
  $b = LessOrEqual($2, $tmp1, $1, $0, $b)

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
