export function currentStatusDispFun(dat) {
  switch (dat) {
    case 'unassigned':
      return 'Un Assigned'
      break
    case 'new':
      return 'New'
      break
    case 'followup':
      return 'Follow Up'
      break
    case 'notinterested':
      return 'Not Interested'
      break
    case 'visitfixed':
      return 'Visit Fixed'
      break
    case 'visitdone':
      return 'Visit Done'
      break
    case 'junk':
      return 'Junk'
      break
    case 'booked':
      return 'Booked'
      break

    default:
      return dat
      break
  }
}
