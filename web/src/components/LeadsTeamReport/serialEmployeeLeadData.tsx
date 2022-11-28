export function serialEmployeeLeadData(employeeListA, fullData) {
  console.log('user list is', employeeListA)
  let z = []
  return employeeListA.map((souceObj) => {
    const x = souceObj
    z = [...z, souceObj?.value]
    if (x.label === 'others') {
      x.Total = fullData.filter(
        (datObj) => !z.includes(datObj?.assignedTo)
      )

      x.inprogress = fullData.filter(
        (datObj) =>
          !z.includes(datObj?.assignedTo) &&
          [
            'new',
            'unassigned',
            'followup',
            'visitfixed',
            'visitdone',
            'negotiation',
          ].includes(datObj?.Status)
      )
      x.new = fullData.filter(
        (datObj) =>
          !z.includes(datObj?.assignedTo) &&
          ['new', 'unassigned'].includes(datObj?.Status)
      )
      x.unassigned = fullData.filter(
        (datObj) =>
          !z.includes(datObj?.assignedTo) && datObj?.Status == 'unassigned'
      )

      x.followup = fullData.filter(
        (datObj) =>
          !z.includes(datObj?.assignedTo) && datObj?.Status == 'followup'
      )

      x.visitfixed = fullData.filter(
        (datObj) =>
          !z.includes(datObj?.assignedTo) && datObj?.Status == 'visitfixed'
      )
      x.visitdone = fullData.filter(
        (datObj) =>
          !z.includes(datObj?.assignedTo) && datObj?.Status == 'visitdone'
      )
      x.negotiation = fullData.filter(
        (datObj) =>
          !z.includes(datObj?.assignedTo) && datObj?.Status == 'negotiation'
      )
      x.booked = fullData.filter(
        (datObj) =>
          !z.includes(datObj?.assignedTo) && datObj?.Status == 'booked'
      )
      x.Dead = fullData.filter(
        (datObj) => !z.includes(datObj?.assignedTo) && datObj?.Status == 'Dead'
      )
      x.blocked = fullData.filter(
        (datObj) =>
          !z.includes(datObj?.assignedTo) && datObj?.Status == 'blocked'
      )
      x.notinterested = fullData.filter(
        (datObj) =>
          !z.includes(datObj?.assignedTo) && datObj?.Status == 'notinterested'
      )
      x.dead = fullData.filter(
        (datObj) => !z.includes(datObj?.assignedTo) && datObj?.Status == 'dead'
      )
      x.blocked = fullData.filter(
        (datObj) =>
          !z.includes(datObj?.assignedTo) && datObj?.Status == 'blocked'
      )
      x.junk = fullData.filter(
        (datObj) => !z.includes(datObj?.assignedTo) && datObj?.Status == 'junk'
      )
      x.archieve = fullData.filter(
        (datObj) =>
          !z.includes(datObj?.assignedTo) &&
          ['blocked', 'dead', 'notinterested', 'junk'].includes(datObj?.Status)
      )
      x.others = []
    } else {
      const Total1 = fullData.filter(
        (datObj) => datObj?.assignedTo === souceObj?.value
      )
      console.log('total is ', Total1)
      x.Total = fullData.filter(
        (datObj) => datObj?.assignedTo === souceObj?.value
      )
      x.inprogress = fullData.filter(
        (datObj) =>
          datObj?.assignedTo === souceObj?.value &&
          [
            'new',
            'unassigned',
            'followup',
            'visitfixed',
            'visitdone',
            'negotiation',
          ].includes(datObj?.Status)
      )
      x.new = fullData.filter(
        (datObj) =>
          datObj?.assignedTo === souceObj?.value &&
          ['new', 'unassigned'].includes(datObj?.Status)
      )
      x.unassigned = fullData.filter(
        (datObj) =>
          datObj?.assignedTo === souceObj?.value &&
          datObj?.Status == 'unassigned'
      )

      x.followup = fullData.filter(
        (datObj) =>
          datObj?.assignedTo === souceObj?.value && datObj?.Status == 'followup'
      )

      x.visitfixed = fullData.filter(
        (datObj) =>
          datObj?.assignedTo === souceObj?.value &&
          datObj?.Status == 'visitfixed'
      )
      x.visitdone = fullData.filter(
        (datObj) =>
          datObj?.assignedTo === souceObj?.value &&
          datObj?.Status == 'visitdone'
      )
      x.negotiation = fullData.filter(
        (datObj) =>
          datObj?.assignedTo === souceObj?.value &&
          datObj?.Status == 'negotiation'
      )
      x.booked = fullData.filter(
        (datObj) =>
          datObj?.assignedTo === souceObj?.value && datObj?.Status == 'booked'
      )
      x.Dead = fullData.filter(
        (datObj) =>
          datObj?.assignedTo === souceObj?.value && datObj?.Status == 'Dead'
      )
      x.blocked = fullData.filter(
        (datObj) =>
          datObj?.assignedTo === souceObj?.value && datObj?.Status == 'blocked'
      )
      x.notinterested = fullData.filter(
        (datObj) =>
          datObj?.assignedTo === souceObj?.value &&
          datObj?.assignedTo == 'notinterested'
      )
      x.dead = fullData.filter(
        (datObj) =>
          datObj?.assignedTo === souceObj?.value && datObj?.Status == 'dead'
      )
      x.blocked = fullData.filter(
        (datObj) =>
          datObj?.assignedTo === souceObj?.value && datObj?.Status == 'blocked'
      )
      x.junk = fullData.filter(
        (datObj) =>
          datObj?.assignedTo === souceObj?.value && datObj?.Status == 'junk'
      )
      x.archieve = fullData.filter(
        (datObj) =>
          datObj?.assignedTo === souceObj?.value &&
          ['blocked', 'dead', 'notinterested', 'junk'].includes(datObj?.Status)
      )
      x.others = fullData.filter(
        (datObj) =>
          datObj?.assignedTo === souceObj?.value && datObj?.Status == ''
      )
    }
    return x
  })
}
