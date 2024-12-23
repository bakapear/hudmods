let { Add, Multiply, Subtract, Divide, Equals, Abs, Frac, Int, LessOrEqual, SelectFirstIfNonZero, Clamp, WrapMinMax } = require('./funs')

let TICK = 0.015
let GRAVITY = -800.0
let TICKGRAV = -12.0
let MAXVEL = 3500.0
let EPSILON = 0.03125

let OFFSET_CROUCHED = 20
let DRANGE_MIN = 0.705078
let DRANGE_MAX = 0.999999

let LAND_UNCROUCHED = 0
let LAND_CROUCHED = 1
let LAND_JUMPBUG = 2

// bounce parameters
let BOUNCE_FLOOR_HEIGHT = 0.0
let BOUNCE_LAND = 0
let BOUNCE_TELEHEIGHT = 1

// player parameters
let PLAYER_Z_POS = 0.0
let PLAYER_Z_VEL = 0.0

function checkBounce () {
  let height = PLAYER_Z_POS - BOUNCE_FLOOR_HEIGHT

  if (BOUNCE_LAND === LAND_CROUCHED) height += OFFSET_CROUCHED
  height += EPSILON

  let intervalmin = BOUNCE_LAND === LAND_JUMPBUG ? Math.max(0, BOUNCE_TELEHEIGHT - 283 * TICK) : BOUNCE_TELEHEIGHT
  let intervalmax = 2

  let vel = PLAYER_Z_VEL

  // getValidHeight
  let ticktop = Math.ceil(-vel / TICKGRAV)
  let maxzrel = ticktop >= 0 ? (0.5 * TICKGRAV * ticktop * ticktop * TICK + vel * ticktop * TICK) : 0.0
  let heightmax = Math.max(height - intervalmin, -maxzrel)
  let heightmin = Math.max(height - intervalmax, -maxzrel)

  let tick0 = Math.ceil(-(vel + MAXVEL) / TICKGRAV) - 1
  if (tick0 === -1) tick0 = 0

  // getLandTickFromStartZVel heightmax
  let z0 = 0.5 * TICKGRAV * tick0 * tick0 * TICK + vel * tick0 * TICK + heightmax
  let tickmax = z0 <= 0.0
    ? -(vel + Math.sqrt(vel * vel - 2.0 * GRAVITY * heightmax)) / TICKGRAV
    : heightmax / (MAXVEL * TICK) + (1 + vel / MAXVEL) * tick0 + 0.5 * TICKGRAV / MAXVEL * tick0 * tick0

  tickmax = Math.floor(tickmax)

  // getLandTickFromStartZVel heightmin
  z0 = 0.5 * TICKGRAV * tick0 * tick0 * TICK + vel * tick0 * TICK + heightmin
  let tickmin = z0 <= 0.0
    ? -(vel + Math.sqrt(vel * vel - 2.0 * GRAVITY * heightmin)) / TICKGRAV
    : heightmin / (MAXVEL * TICK) + (1 + vel / MAXVEL) * tick0 + 0.5 * TICKGRAV / MAXVEL * tick0 * tick0

  tickmin = Math.ceil(tickmin)

  let b = (height - intervalmax >= heightmax || height - intervalmin >= heightmin) && (tickmax - tickmin) >= 0.0
  /*
  if (b) {
    // getZFromTick tickmin
    tick0 = tickmin < Math.ceil(-(vel + MAXVEL) / TICKGRAV) ? tickmin : (Math.ceil(-(vel + MAXVEL) / TICKGRAV) - 1)
    z0 = 0.5 * TICKGRAV * tick0 * tick0 * TICK + vel * tick0 * TICK
    if (tickmin >= Math.ceil(-(vel + MAXVEL) / TICKGRAV)) z0 -= MAXVEL * TICK * (tickmin - tick0)

    let raw = -z0 % 1
    if (raw >= DRANGE_MIN && raw <= DRANGE_MAX) b = 2
  }
  */

  console.log(JSON.stringify({ res: Number(b), hmax: heightmax, hmin: heightmin, tmax: tickmax, tmin: tickmin, ttop: ticktop, zrel: maxzrel }))
  return Number(b)
}

BOUNCE_FLOOR_HEIGHT = 0
PLAYER_Z_VEL = -6
BOUNCE_LAND = LAND_UNCROUCHED

PLAYER_Z_POS = 100
checkBounce()
PLAYER_Z_POS = 97
checkBounce()
PLAYER_Z_POS = 102
checkBounce()

PLAYER_Z_POS = 4832
PLAYER_Z_VEL = 483
checkBounce()
