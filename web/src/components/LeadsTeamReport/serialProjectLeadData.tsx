export function serialProjectLeadData(projectListA, fullData) {
  let z = []
  return projectListA.map((souceObj) => {
    const x = souceObj

    z = [...z, souceObj?.value]
    if (x.label === 'others') {
      x.Total = fullData.filter((datObj) => !z.includes(datObj?.ProjectId))

      x.inprogress = fullData.filter(
        (datObj) =>
          !z.includes(datObj?.ProjectId) &&
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
          !z.includes(datObj?.ProjectId) &&
          ['new', 'unassigned'].includes(datObj?.Status)
      )
      x.unassigned = fullData.filter(
        (datObj) =>
          !z.includes(datObj?.ProjectId) && datObj?.Status == 'unassigned'
      )

      x.followup = fullData.filter(
        (datObj) =>
          !z.includes(datObj?.ProjectId) && datObj?.Status == 'followup'
      )

      x.visitfixed = fullData.filter(
        (datObj) =>
          !z.includes(datObj?.ProjectId) && datObj?.Status == 'visitfixed'
      )
      x.visitdone = fullData.filter(
        (datObj) =>
          !z.includes(datObj?.ProjectId) && datObj?.Status == 'visitdone'
      )
      x.negotiation = fullData.filter(
        (datObj) =>
          !z.includes(datObj?.ProjectId) && datObj?.Status == 'negotiation'
      )
      x.booked = fullData.filter(
        (datObj) => !z.includes(datObj?.ProjectId) && datObj?.Status == 'booked'
      )
      x.Dead = fullData.filter(
        (datObj) => !z.includes(datObj?.ProjectId) && datObj?.Status == 'Dead'
      )
      x.blocked = fullData.filter(
        (datObj) =>
          !z.includes(datObj?.ProjectId) && datObj?.Status == 'blocked'
      )
      x.notinterested = fullData.filter(
        (datObj) =>
          !z.includes(datObj?.ProjectId) && datObj?.Status == 'notinterested'
      )
      x.dead = fullData.filter(
        (datObj) => !z.includes(datObj?.ProjectId) && datObj?.Status == 'dead'
      )
      x.blocked = fullData.filter(
        (datObj) =>
          !z.includes(datObj?.ProjectId) && datObj?.Status == 'blocked'
      )
      x.junk = fullData.filter(
        (datObj) => !z.includes(datObj?.ProjectId) && datObj?.Status == 'junk'
      )
      x.archieve = fullData.filter(
        (datObj) =>
          !z.includes(datObj?.ProjectId) &&
          ['blocked', 'dead', 'notinterested', 'junk'].includes(datObj?.Status)
      )
      x.others = []
    } else {
      x.Total = fullData.filter(
        (datObj) => datObj?.ProjectId === souceObj?.value
      )
      x.inprogress = fullData.filter(
        (datObj) =>
          datObj?.ProjectId === souceObj?.value &&
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
          datObj?.ProjectId === souceObj?.value &&
          ['new', 'unassigned'].includes(datObj?.Status)
      )
      x.unassigned = fullData.filter(
        (datObj) =>
          datObj?.ProjectId === souceObj?.value &&
          datObj?.Status == 'unassigned'
      )

      x.followup = fullData.filter(
        (datObj) =>
          datObj?.ProjectId === souceObj?.value && datObj?.Status == 'followup'
      )

      x.visitfixed = fullData.filter(
        (datObj) =>
          datObj?.ProjectId === souceObj?.value &&
          datObj?.Status == 'visitfixed'
      )
      x.visitdone = fullData.filter(
        (datObj) =>
          datObj?.ProjectId === souceObj?.value && datObj?.Status == 'visitdone'
      )
      x.negotiation = fullData.filter(
        (datObj) =>
          datObj?.ProjectId === souceObj?.value &&
          datObj?.Status == 'negotiation'
      )
      x.booked = fullData.filter(
        (datObj) =>
          datObj?.ProjectId === souceObj?.value && datObj?.Status == 'booked'
      )
      x.Dead = fullData.filter(
        (datObj) =>
          datObj?.ProjectId === souceObj?.value && datObj?.Status == 'Dead'
      )
      x.blocked = fullData.filter(
        (datObj) =>
          datObj?.ProjectId === souceObj?.value && datObj?.Status == 'blocked'
      )
      x.notinterested = fullData.filter(
        (datObj) =>
          datObj?.ProjectId === souceObj?.value &&
          datObj?.Status == 'notinterested'
      )
      x.dead = fullData.filter(
        (datObj) =>
          datObj?.ProjectId === souceObj?.value && datObj?.Status == 'dead'
      )
      x.blocked = fullData.filter(
        (datObj) =>
          datObj?.ProjectId === souceObj?.value && datObj?.Status == 'blocked'
      )
      x.junk = fullData.filter(
        (datObj) =>
          datObj?.ProjectId === souceObj?.value && datObj?.Status == 'junk'
      )
      x.archieve = fullData.filter(
        (datObj) =>
          datObj?.ProjectId === souceObj?.value &&
          ['blocked', 'dead', 'notinterested', 'junk'].includes(datObj?.Status)
      )
      x.others = fullData.filter(
        (datObj) =>
          datObj?.ProjectId === souceObj?.value && datObj?.Status == ''
      )
    }

    return x
  })
}
