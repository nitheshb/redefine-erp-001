export const areaCoverter = (value: number, unit: string) => {
  switch (unit) {
    case 'acre':
      return value * 43560
    case 'hectare':
      return value * 107639
    case 'square-yard':
      return value * 9
    case 'square-meter':
      return Math.floor(value * 10.764)
    case 'gunta':
      return value * 1089
    default:
      return 0
  }
}
