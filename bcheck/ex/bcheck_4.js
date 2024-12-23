let { Add, Multiply, Subtract, Divide, Equals, Abs, Frac, Int, LessOrEqual, SelectFirstIfNonZero, Clamp, WrapMinMax } = require('./funs2')

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
  $height = Subtract({ srcVar1: $PLAYER_Z_POS, srcVar2: $BOUNCE_FLOOR_HEIGHT, resultVar: $height })

  // if (BOUNCE_LAND === LAND_CROUCHED) height += OFFSET_CROUCHED
  $tmp1 = Subtract({ srcVar1: $BOUNCE_LAND, srcVar2: $LAND_CROUCHED, resultVar: $tmp1 })
  $tmp1 = Abs({ srcVar1: $tmp1, resultVar: $tmp1 })
  $tmp2 = Add({ srcVar1: $height, srcVar2: $OFFSET_CROUCHED, resultVar: $tmp2 })
  $height = LessOrEqual({ srcVar1: $tmp1, srcVar2: $0, lessEqualVar: $tmp2, greaterVar: $height, resultVar: $height })

  $height = Add({ srcVar1: $height, srcVar2: $EPSILON, resultVar: $height })

  // intervalmin = BOUNCE_LAND === LAND_JUMPBUG ? Math.max(0, BOUNCE_TELEHEIGHT - 283 * TICK) : BOUNCE_TELEHEIGHT
  $tmp1 = Subtract({ srcVar1: $BOUNCE_LAND, srcVar2: $LAND_JUMPBUG, resultVar: $tmp1 })
  $tmp1 = Abs({ srcVar1: $tmp1, resultVar: $tmp1 })
  $tmp2 = Multiply({ srcVar1: $JVEL, srcVar2: $TICK, resultVar: $tmp2 })
  $tmp2 = Subtract({ srcVar1: $BOUNCE_TELEHEIGHT, srcVar2: $tmp2, resultVar: $tmp2 })
  $tmp2 = LessOrEqual({ srcVar1: $tmp2, srcVar2: $0, lessEqualVar: $0, greaterVar: $tmp2, resultVar: $tmp2 })
  $intervalmin = LessOrEqual({ srcVar1: $tmp1, srcVar2: $0, lessEqualVar: $tmp2, greaterVar: $BOUNCE_TELEHEIGHT, resultVar: $intervalmin })

  $vel = Equals({ srcVar1: $PLAYER_Z_VEL, resultVar: $vel })

  // --- getValidHeight ---

  // ticktop = Math.ceil(-vel / TICKGRAV)
  $tmp1 = Multiply({ srcVar1: $vel, srcVar2: $n, resultVar: $tmp1 })
  $tmp1 = Divide({ srcVar1: $tmp1, srcVar2: $TICKGRAV, resultVar: $tmp1 })
  $tmp2 = Frac({ srcVar1: $tmp1, resultVar: $tmp2 })
  $tmp1 = Int({ srcVar1: $tmp1, resultVar: $tmp1 }) // Int
  $tmp3 = Add({ srcVar1: $tmp1, srcVar2: $1, resultVar: $tmp3 })
  $ticktop = LessOrEqual({ srcVar1: $tmp2, srcVar2: $0, lessEqualVar: $tmp1, greaterVar: $tmp3, resultVar: $ticktop })

  // maxzrel = ticktop >= 0 ? (0.5 * TICKGRAV * ticktop * ticktop * TICK + vel * ticktop * TICK) : 0.0
  $tmp1 = Multiply({ srcVar1: $h, srcVar2: $TICKGRAV, resultVar: $tmp1 })
  $tmp1 = Multiply({ srcVar1: $ticktop, srcVar2: $tmp1, resultVar: $tmp1 })
  $tmp1 = Multiply({ srcVar1: $ticktop, srcVar2: $tmp1, resultVar: $tmp1 })
  $tmp1 = Multiply({ srcVar1: $TICK, srcVar2: $tmp1, resultVar: $tmp1 })
  $tmp2 = Multiply({ srcVar1: $vel, srcVar2: $ticktop, resultVar: $tmp2 })
  $tmp2 = Multiply({ srcVar1: $TICK, srcVar2: $tmp2, resultVar: $tmp2 })
  $tmp2 = Add({ srcVar1: $tmp1, srcVar2: $tmp2, resultVar: $tmp2 })

  $maxzrel = LessOrEqual({ srcVar1: $0, srcVar2: $ticktop, lessEqualVar: $tmp2, greaterVar: $0, resultVar: $maxzrel })

  // heightmax = Math.max(height - intervalmin, -maxzrel)
  $tmp1 = Multiply({ srcVar1: $n, srcVar2: $maxzrel, resultVar: $tmp1 })
  $tmp2 = Subtract({ srcVar1: $height, srcVar2: $intervalmin, resultVar: $tmp2 })
  $heightmax = LessOrEqual({ srcVar1: $tmp2, srcVar2: $tmp1, lessEqualVar: $tmp1, greaterVar: $tmp2, resultVar: $heightmax })

  // heightmin = Math.max(height - intervalmax, -maxzrel)
  $tmp2 = Subtract({ srcVar1: $height, srcVar2: $intervalmax, resultVar: $tmp2 })
  $heightmin = LessOrEqual({ srcVar1: $tmp2, srcVar2: $tmp1, lessEqualVar: $tmp1, greaterVar: $tmp2, resultVar: $heightmin })

  // tick0 = Math.ceil(-(vel + MAXVEL) / TICKGRAV) - 1
  $tmp1 = Add({ srcVar1: $vel, srcVar2: $MAXVEL, resultVar: $tmp1 })
  $tmp1 = Multiply({ srcVar1: $tmp1, srcVar2: $n, resultVar: $tmp1 })
  $tmp1 = Divide({ srcVar1: $tmp1, srcVar2: $TICKGRAV, resultVar: $tmp1 })
  $tmp2 = Frac({ srcVar1: $tmp1, resultVar: $tmp2 }) // Frac
  $tmp1 = Int({ srcVar1: $tmp1, resultVar: $tmp1 }) // Int
  $tmp3 = Add({ srcVar1: $tmp1, srcVar2: $1, resultVar: $tmp3 })
  $tmp1 = LessOrEqual({ srcVar1: $tmp2, srcVar2: $0, lessEqualVar: $tmp1, greaterVar: $tmp3, resultVar: $tmp1 })
  $tick0 = Subtract({ srcVar1: $tmp1, srcVar2: $1, resultVar: $tick0 })

  // if (tick0 === -1) tick0 = 0
  $tmp1 = Subtract({ srcVar1: $tick0, srcVar2: $n, resultVar: $tmp1 })
  $tmp1 = Abs({ srcVar1: $tmp1, resultVar: $tmp1 })
  $tick0 = LessOrEqual({ srcVar1: $tmp1, srcVar2: $0, lessEqualVar: $0, greaterVar: $tick0, resultVar: $tick0 })

  // --- getLandTickFromStartZVel heightmax ---
  // z0 = 0.5 * TICKGRAV * tick0 * tick0 * TICK + vel * tick0 * TICK + heightmax
  $tmp1 = Multiply({ srcVar1: $h, srcVar2: $TICKGRAV, resultVar: $tmp1 })
  $tmp1 = Multiply({ srcVar1: $tick0, srcVar2: $tmp1, resultVar: $tmp1 })
  $tmp1 = Multiply({ srcVar1: $tick0, srcVar2: $tmp1, resultVar: $tmp1 })
  $tmp1 = Multiply({ srcVar1: $TICK, srcVar2: $tmp1, resultVar: $tmp1 })
  $tmp2 = Multiply({ srcVar1: $vel, srcVar2: $tick0, resultVar: $tmp2 })
  $tmp2 = Multiply({ srcVar1: $TICK, srcVar2: $tmp2, resultVar: $tmp2 })
  $tmp1 = Add({ srcVar1: $tmp1, srcVar2: $tmp2, resultVar: $tmp1 })
  $z0 = Add({ srcVar1: $tmp1, srcVar2: $heightmax, resultVar: $z0 })

  // tickmax = z0 <= 0.0 ? -(vel + Math.sqrt(vel * vel - 2.0 * GRAVITY * heightmax)) / TICKGRAV : heightmax / (MAXVEL * TICK) + (1 + vel / MAXVEL) * tick0 + 0.5 * TICKGRAV / MAXVEL * tick0 * tick0
  // PART1: -(vel + Math.sqrt(vel * vel - 2.0 * GRAVITY * heightmax)) / TICKGRAV
  $tmp1 = Multiply({ srcVar1: $vel, srcVar2: $vel, resultVar: $tmp1 })
  $tmp2 = Multiply({ srcVar1: $2, srcVar2: $GRAVITY, resultVar: $tmp2 })
  $tmp2 = Multiply({ srcVar1: $heightmax, srcVar2: $tmp2, resultVar: $tmp2 })
  $tmp1 = Subtract({ srcVar1: $tmp1, srcVar2: $tmp2, resultVar: $tmp1 })

  // SQRT START

  // initial guess = tick0
  $sqrt = Equals({ srcVar1: $tick0, resultVar: $sqrt })
  // number we want to sqrt
  $num = Equals({ srcVar1: $tmp1, resultVar: $num })
  // sqrt using 10 iterations of newtons method -> sqrt = 0.5(sqrt + number/sqrt)
  $tmp1 = Divide({ srcVar1: $num, srcVar2: $sqrt, resultVar: $tmp1 })
  $tmp1 = Add({ srcVar1: $tmp1, srcVar2: $sqrt, resultVar: $tmp1 })
  $sqrt = Multiply({ srcVar1: $h, srcVar2: $tmp1, resultVar: $sqrt })
  $tmp1 = Divide({ srcVar1: $num, srcVar2: $sqrt, resultVar: $tmp1 })
  $tmp1 = Add({ srcVar1: $tmp1, srcVar2: $sqrt, resultVar: $tmp1 })
  $sqrt = Multiply({ srcVar1: $h, srcVar2: $tmp1, resultVar: $sqrt })
  $tmp1 = Divide({ srcVar1: $num, srcVar2: $sqrt, resultVar: $tmp1 })
  $tmp1 = Add({ srcVar1: $tmp1, srcVar2: $sqrt, resultVar: $tmp1 })
  $sqrt = Multiply({ srcVar1: $h, srcVar2: $tmp1, resultVar: $sqrt })
  $tmp1 = Divide({ srcVar1: $num, srcVar2: $sqrt, resultVar: $tmp1 })
  $tmp1 = Add({ srcVar1: $tmp1, srcVar2: $sqrt, resultVar: $tmp1 })
  $sqrt = Multiply({ srcVar1: $h, srcVar2: $tmp1, resultVar: $sqrt })
  $tmp1 = Divide({ srcVar1: $num, srcVar2: $sqrt, resultVar: $tmp1 })
  $tmp1 = Add({ srcVar1: $tmp1, srcVar2: $sqrt, resultVar: $tmp1 })
  $sqrt = Multiply({ srcVar1: $h, srcVar2: $tmp1, resultVar: $sqrt })
  $tmp1 = Divide({ srcVar1: $num, srcVar2: $sqrt, resultVar: $tmp1 })
  $tmp1 = Add({ srcVar1: $tmp1, srcVar2: $sqrt, resultVar: $tmp1 })
  $sqrt = Multiply({ srcVar1: $h, srcVar2: $tmp1, resultVar: $sqrt })
  $tmp1 = Divide({ srcVar1: $num, srcVar2: $sqrt, resultVar: $tmp1 })
  $tmp1 = Add({ srcVar1: $tmp1, srcVar2: $sqrt, resultVar: $tmp1 })
  $sqrt = Multiply({ srcVar1: $h, srcVar2: $tmp1, resultVar: $sqrt })
  $tmp1 = Divide({ srcVar1: $num, srcVar2: $sqrt, resultVar: $tmp1 })
  $tmp1 = Add({ srcVar1: $tmp1, srcVar2: $sqrt, resultVar: $tmp1 })
  $sqrt = Multiply({ srcVar1: $h, srcVar2: $tmp1, resultVar: $sqrt })
  $tmp1 = Divide({ srcVar1: $num, srcVar2: $sqrt, resultVar: $tmp1 })
  $tmp1 = Add({ srcVar1: $tmp1, srcVar2: $sqrt, resultVar: $tmp1 })
  $sqrt = Multiply({ srcVar1: $h, srcVar2: $tmp1, resultVar: $sqrt })

  $tmp1 = Equals({ srcVar1: $sqrt, resultVar: $tmp1 })

  // SQRT END

  $tmp1 = Add({ srcVar1: $vel, srcVar2: $tmp1, resultVar: $tmp1 })
  $tmp1 = Multiply({ srcVar1: $n, srcVar2: $tmp1, resultVar: $tmp1 })
  $tickmax = Divide({ srcVar1: $tmp1, srcVar2: $TICKGRAV, resultVar: $tickmax })
  // PART2: heightmax / (MAXVEL * TICK) + (1 + vel / MAXVEL) * tick0 + 0.5 * TICKGRAV / MAXVEL * tick0 * tick0
  // tmp1 + tmp2
  $tmp1 = Multiply({ srcVar1: $MAXVEL, srcVar2: $TICK, resultVar: $tmp1 })
  $tmp1 = Divide({ srcVar1: $heightmax, srcVar2: $tmp1, resultVar: $tmp1 })
  $tmp2 = Divide({ srcVar1: $vel, srcVar2: $MAXVEL, resultVar: $tmp2 })
  $tmp2 = Add({ srcVar1: $1, srcVar2: $tmp2, resultVar: $tmp2 })
  $tmp2 = Multiply({ srcVar1: $tick0, srcVar2: $tmp2, resultVar: $tmp2 })
  $tmp1 = Add({ srcVar1: $tmp2, srcVar2: $tmp1, resultVar: $tmp1 })
  $tmp2 = Multiply({ srcVar1: $h, srcVar2: $TICKGRAV, resultVar: $tmp2 })
  $tmp2 = Divide({ srcVar1: $tmp2, srcVar2: $MAXVEL, resultVar: $tmp2 })
  $tmp2 = Multiply({ srcVar1: $tick0, srcVar2: $tmp2, resultVar: $tmp2 })
  $tmp2 = Multiply({ srcVar1: $tick0, srcVar2: $tmp2, resultVar: $tmp2 })
  $tmp1 = Add({ srcVar1: $tmp1, srcVar2: $tmp2, resultVar: $tmp1 })

  $tickmax = LessOrEqual({ srcVar1: $z0, srcVar2: $0, lessEqualVar: $tickmax, greaterVar: $tmp1, resultVar: $tickmax })

  $tickmax = Int({ srcVar1: $tickmax, resultVar: $tickmax }) // Int

  // --- getLandTickFromStartZVel heightmin ---
  // z0 = 0.5 * TICKGRAV * tick0 * tick0 * TICK + vel * tick0 * TICK + heightmin
  $tmp1 = Multiply({ srcVar1: $h, srcVar2: $TICKGRAV, resultVar: $tmp1 })
  $tmp1 = Multiply({ srcVar1: $tick0, srcVar2: $tmp1, resultVar: $tmp1 })
  $tmp1 = Multiply({ srcVar1: $tick0, srcVar2: $tmp1, resultVar: $tmp1 })
  $tmp1 = Multiply({ srcVar1: $TICK, srcVar2: $tmp1, resultVar: $tmp1 })
  $tmp2 = Multiply({ srcVar1: $vel, srcVar2: $tick0, resultVar: $tmp2 })
  $tmp2 = Multiply({ srcVar1: $TICK, srcVar2: $tmp2, resultVar: $tmp2 })
  $tmp1 = Add({ srcVar1: $tmp1, srcVar2: $tmp2, resultVar: $tmp1 })
  $z0 = Add({ srcVar1: $tmp1, srcVar2: $heightmin, resultVar: $z0 })

  // tickmin = z0 <= 0.0 ? -(vel + Math.sqrt(vel * vel - 2.0 * GRAVITY * heightmin)) / TICKGRAV : heightmin / (MAXVEL * TICK) + (1 + vel / MAXVEL) * tick0 + 0.5 * TICKGRAV / MAXVEL * tick0 * tick0
  // PART1: -(vel + Math.sqrt(vel * vel - 2.0 * GRAVITY * heightmin)) / TICKGRAV
  $tmp1 = Multiply({ srcVar1: $vel, srcVar2: $vel, resultVar: $tmp1 })
  $tmp2 = Multiply({ srcVar1: $2, srcVar2: $GRAVITY, resultVar: $tmp2 })
  $tmp2 = Multiply({ srcVar1: $heightmin, srcVar2: $tmp2, resultVar: $tmp2 })
  $tmp1 = Subtract({ srcVar1: $tmp1, srcVar2: $tmp2, resultVar: $tmp1 })

  // SQRT START

  // initial guess = tick0
  $sqrt = Equals({ srcVar1: $tick0, resultVar: $sqrt })
  // number we want to sqrt
  $num = Equals({ srcVar1: $tmp1, resultVar: $num })
  // sqrt using 10 iterations of newtons method -> sqrt = 0.5(sqrt + number/sqrt)
  $tmp1 = Divide({ srcVar1: $num, srcVar2: $sqrt, resultVar: $tmp1 })
  $tmp1 = Add({ srcVar1: $tmp1, srcVar2: $sqrt, resultVar: $tmp1 })
  $sqrt = Multiply({ srcVar1: $h, srcVar2: $tmp1, resultVar: $sqrt })
  $tmp1 = Divide({ srcVar1: $num, srcVar2: $sqrt, resultVar: $tmp1 })
  $tmp1 = Add({ srcVar1: $tmp1, srcVar2: $sqrt, resultVar: $tmp1 })
  $sqrt = Multiply({ srcVar1: $h, srcVar2: $tmp1, resultVar: $sqrt })
  $tmp1 = Divide({ srcVar1: $num, srcVar2: $sqrt, resultVar: $tmp1 })
  $tmp1 = Add({ srcVar1: $tmp1, srcVar2: $sqrt, resultVar: $tmp1 })
  $sqrt = Multiply({ srcVar1: $h, srcVar2: $tmp1, resultVar: $sqrt })
  $tmp1 = Divide({ srcVar1: $num, srcVar2: $sqrt, resultVar: $tmp1 })
  $tmp1 = Add({ srcVar1: $tmp1, srcVar2: $sqrt, resultVar: $tmp1 })
  $sqrt = Multiply({ srcVar1: $h, srcVar2: $tmp1, resultVar: $sqrt })
  $tmp1 = Divide({ srcVar1: $num, srcVar2: $sqrt, resultVar: $tmp1 })
  $tmp1 = Add({ srcVar1: $tmp1, srcVar2: $sqrt, resultVar: $tmp1 })
  $sqrt = Multiply({ srcVar1: $h, srcVar2: $tmp1, resultVar: $sqrt })
  $tmp1 = Divide({ srcVar1: $num, srcVar2: $sqrt, resultVar: $tmp1 })
  $tmp1 = Add({ srcVar1: $tmp1, srcVar2: $sqrt, resultVar: $tmp1 })
  $sqrt = Multiply({ srcVar1: $h, srcVar2: $tmp1, resultVar: $sqrt })
  $tmp1 = Divide({ srcVar1: $num, srcVar2: $sqrt, resultVar: $tmp1 })
  $tmp1 = Add({ srcVar1: $tmp1, srcVar2: $sqrt, resultVar: $tmp1 })
  $sqrt = Multiply({ srcVar1: $h, srcVar2: $tmp1, resultVar: $sqrt })
  $tmp1 = Divide({ srcVar1: $num, srcVar2: $sqrt, resultVar: $tmp1 })
  $tmp1 = Add({ srcVar1: $tmp1, srcVar2: $sqrt, resultVar: $tmp1 })
  $sqrt = Multiply({ srcVar1: $h, srcVar2: $tmp1, resultVar: $sqrt })
  $tmp1 = Divide({ srcVar1: $num, srcVar2: $sqrt, resultVar: $tmp1 })
  $tmp1 = Add({ srcVar1: $tmp1, srcVar2: $sqrt, resultVar: $tmp1 })
  $sqrt = Multiply({ srcVar1: $h, srcVar2: $tmp1, resultVar: $sqrt })

  $tmp1 = Equals({ srcVar1: $sqrt, resultVar: $tmp1 })

  // SQRT END

  $tmp1 = Add({ srcVar1: $vel, srcVar2: $tmp1, resultVar: $tmp1 })
  $tmp1 = Multiply({ srcVar1: $n, srcVar2: $tmp1, resultVar: $tmp1 })
  $tickmin = Divide({ srcVar1: $tmp1, srcVar2: $TICKGRAV, resultVar: $tickmin })
  // PART2: heightmin / (MAXVEL * TICK) + (1 + vel / MAXVEL) * tick0 + 0.5 * TICKGRAV / MAXVEL * tick0 * tick0
  // tmp1 + tmp2
  $tmp1 = Multiply({ srcVar1: $MAXVEL, srcVar2: $TICK, resultVar: $tmp1 })
  $tmp1 = Divide({ srcVar1: $heightmin, srcVar2: $tmp1, resultVar: $tmp1 })
  $tmp2 = Divide({ srcVar1: $vel, srcVar2: $MAXVEL, resultVar: $tmp2 })
  $tmp2 = Add({ srcVar1: $1, srcVar2: $tmp2, resultVar: $tmp2 })
  $tmp2 = Multiply({ srcVar1: $tick0, srcVar2: $tmp2, resultVar: $tmp2 })
  $tmp1 = Add({ srcVar1: $tmp2, srcVar2: $tmp1, resultVar: $tmp1 })
  $tmp2 = Multiply({ srcVar1: $h, srcVar2: $TICKGRAV, resultVar: $tmp2 })
  $tmp2 = Divide({ srcVar1: $tmp2, srcVar2: $MAXVEL, resultVar: $tmp2 })
  $tmp2 = Multiply({ srcVar1: $tick0, srcVar2: $tmp2, resultVar: $tmp2 })
  $tmp2 = Multiply({ srcVar1: $tick0, srcVar2: $tmp2, resultVar: $tmp2 })
  $tmp1 = Add({ srcVar1: $tmp1, srcVar2: $tmp2, resultVar: $tmp1 })

  $tickmin = LessOrEqual({ srcVar1: $z0, srcVar2: $0, lessEqualVar: $tickmin, greaterVar: $tmp1, resultVar: $tickmin })

  // tickmin = Math.ceil(tickmin)
  $tmp1 = Frac({ srcVar1: $tickmin, resultVar: $tmp1 }) // Frac
  $tmp2 = Int({ srcVar1: $tickmin, resultVar: $tmp2 }) // Int
  $tmp3 = Add({ srcVar1: $tmp2, srcVar2: $1, resultVar: $tmp3 })
  $tickmin = LessOrEqual({ srcVar1: $tmp1, srcVar2: $0, lessEqualVar: $tmp2, greaterVar: $tmp3, resultVar: $tickmin })

  // b = (height - intervalmax >= heightmax || height - intervalmin >= heightmin) && (tickmax - tickmin) >= 0.0
  // PART1: if (height - intervalmax >= heightmax) tmp1 = 1 else 0
  $tmp1 = Subtract({ srcVar1: $height, srcVar2: $intervalmax, resultVar: $tmp1 })
  $tmp1 = LessOrEqual({ srcVar1: $heightmax, srcVar2: $tmp1, lessEqualVar: $1, greaterVar: $0, resultVar: $tmp1 })
  // PART2: if (height - intervalmin >= heightmin) tmp2 = 1 else 0
  $tmp2 = Subtract({ srcVar1: $height, srcVar2: $intervalmin, resultVar: $tmp2 })
  $tmp2 = LessOrEqual({ srcVar1: $heightmin, srcVar2: $tmp2, lessEqualVar: $1, greaterVar: $0, resultVar: $tmp2 })

  $tmp1 = Add({ srcVar1: $tmp1, srcVar2: $tmp2, resultVar: $tmp1 })
  $tmp1 = LessOrEqual({ srcVar1: $1, srcVar2: $tmp1, lessEqualVar: $1, greaterVar: $0, resultVar: $tmp1 })

  // PART3: if (tickmax - tickmin >= 0.0) tmp3 = 1 else 0
  $tmp3 = Subtract({ srcVar1: $tickmax, srcVar2: $tickmin, resultVar: $tmp3 })
  $tmp3 = LessOrEqual({ srcVar1: $0, srcVar2: $tmp3, lessEqualVar: $1, greaterVar: $0, resultVar: $tmp3 })

  $tmp1 = Add({ srcVar1: $tmp3, srcVar2: $tmp1, resultVar: $tmp1 })
  $b = LessOrEqual({ srcVar1: $2, srcVar2: $tmp1, lessEqualVar: $1, greaterVar: $0, resultVar: $b })

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
