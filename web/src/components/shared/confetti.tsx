import React, { useCallback, useRef } from 'react'

import ReactCanvasConfetti from 'react-canvas-confetti'

const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100vw',
  height: '100%',
  top: 0,
  left: '-50vw',
}

export default function Confetti() {
  const refAnimationInstance = useRef(null)

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance
  }, [])

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(300 * particleRatio),
      })
  }, [])

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    })

    makeShot(0.2, {
      spread: 60,
    })

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    })

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    })

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    })
  }, [makeShot])

  return (
    <>
      <button
        className="w-40 h-10 rounded bg-blue-400 hover:bg-blue-600 "
        onClick={fire}
      >
        Shoot Confetti
      </button>
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </>
  )
}
