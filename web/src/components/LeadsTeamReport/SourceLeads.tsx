export function serialMyData(sourceListItemsA, fullData, mode) {
  let z = []
  return sourceListItemsA.map((souceObj) => {
    const x = souceObj
    z = [...z, ...souceObj.rep]
    if (x.label === 'others') {
      x.Total = fullData.filter((datObj) => !z.includes(datObj?.Source))

      console.log(
        'macho',
        fullData.filter(
          (datObj) =>
            !z.includes(datObj?.Source) &&
            [
              'new',
              'unassigned',
              'followup',
              'visitfixed',
              'visitdone',
              'negotiation',
              'booked',
              'dead',
              'junk',
              'blocked',
            ].includes(datObj?.Status)
        )
      )

      x.inprogress = fullData.filter(
        (datObj) =>
          !z.includes(datObj?.Source) &&
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
          !z.includes(datObj?.Source) &&
          ['new', 'unassigned'].includes(datObj?.Status)
      )
      x.unassigned = fullData.filter(
        (datObj) =>
          !z.includes(datObj?.Source) && datObj?.Status == 'unassigned'
      )

      x.followup = fullData.filter(
        (datObj) => !z.includes(datObj?.Source) && datObj?.Status == 'followup'
      )

      x.visitfixed = fullData.filter(
        (datObj) =>
          !z.includes(datObj?.Source) && datObj?.Status == 'visitfixed'
      )
      x.visitdone = fullData.filter(
        (datObj) => !z.includes(datObj?.Source) && datObj?.Status == 'visitdone'
      )
      x.negotiation = fullData.filter(
        (datObj) =>
          !z.includes(datObj?.Source) && datObj?.Status == 'negotiation'
      )
      x.booked = fullData.filter(
        (datObj) => !z.includes(datObj?.Source) && datObj?.Status == 'booked'
      )
      x.Dead = fullData.filter(
        (datObj) => !z.includes(datObj?.Source) && datObj?.Status == 'Dead'
      )
      x.blocked = fullData.filter(
        (datObj) => !z.includes(datObj?.Source) && datObj?.Status == 'blocked'
      )
      x.notinterested = fullData.filter(
        (datObj) =>
          !z.includes(datObj?.Source) && datObj?.Status == 'notinterested'
      )
      x.dead = fullData.filter(
        (datObj) => !z.includes(datObj?.Source) && datObj?.Status == 'dead'
      )
      x.blocked = fullData.filter(
        (datObj) => !z.includes(datObj?.Source) && datObj?.Status == 'blocked'
      )
      x.junk = fullData.filter(
        (datObj) => !z.includes(datObj?.Source) && datObj?.Status == 'junk'
      )
      x.archieve = fullData.filter(
        (datObj) =>
          !z.includes(datObj?.Source) &&
          ['blocked', 'dead', 'notinterested', 'junk'].includes(datObj?.Status)
      )
      x.others = []
    } else {
      // x.Total = fullData.filter(
      //   (datObj) =>
      //     souceObj?.rep.includes(datObj?.Source) &&
      //     ![
      //       'new',
      //       'unassigned',
      //       'followup',
      //       'visitfixed',
      //       'visitdone',
      //       'negotiation',
      //       'booked',
      //       'blocked',
      //       'dead',
      //       'notinterested',
      //       'junk',
      //     ].includes(datObj?.Status)
      // )
      x.Total = fullData.filter((datObj) =>
        souceObj?.rep.includes(datObj?.Source)
      )
      x.inprogress = fullData.filter(
        (datObj) =>
          souceObj?.rep.includes(datObj?.Source) &&
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
          souceObj?.rep.includes(datObj?.Source) &&
          ['new', 'unassigned'].includes(datObj?.Status)
      )
      x.unassigned = fullData.filter(
        (datObj) =>
          souceObj?.rep.includes(datObj?.Source) &&
          datObj?.Status == 'unassigned'
      )
      x.others = fullData.filter(
        (datObj) =>
          souceObj?.rep.includes(datObj?.Source) && datObj?.Status == ''
      )

      x.followup = fullData.filter(
        (datObj) =>
          souceObj?.rep.includes(datObj?.Source) && datObj?.Status == 'followup'
      )

      x.visitfixed = fullData.filter(
        (datObj) =>
          souceObj?.rep.includes(datObj?.Source) &&
          datObj?.Status == 'visitfixed'
      )
      x.visitdone = fullData.filter(
        (datObj) =>
          souceObj?.rep.includes(datObj?.Source) &&
          datObj?.Status == 'visitdone'
      )
      x.negotiation = fullData.filter(
        (datObj) =>
          souceObj?.rep.includes(datObj?.Source) &&
          datObj?.Status == 'negotiation'
      )
      x.booked = fullData.filter(
        (datObj) =>
          souceObj?.rep.includes(datObj?.Source) && datObj?.Status == 'booked'
      )
      x.Dead = fullData.filter(
        (datObj) =>
          souceObj?.rep.includes(datObj?.Source) && datObj?.Status == 'Dead'
      )
      x.blocked = fullData.filter(
        (datObj) =>
          souceObj?.rep.includes(datObj?.Source) && datObj?.Status == 'blocked'
      )
      x.notinterested = fullData.filter(
        (datObj) =>
          souceObj?.rep.includes(datObj?.Source) &&
          datObj?.Status == 'notinterested'
      )
      x.dead = fullData.filter(
        (datObj) =>
          souceObj?.rep.includes(datObj?.Source) && datObj?.Status == 'dead'
      )
      x.blocked = fullData.filter(
        (datObj) =>
          souceObj?.rep.includes(datObj?.Source) && datObj?.Status == 'blocked'
      )
      x.junk = fullData.filter(
        (datObj) =>
          souceObj?.rep.includes(datObj?.Source) && datObj?.Status == 'junk'
      )
      x.archieve = fullData.filter(
        (datObj) =>
          souceObj?.rep.includes(datObj?.Source) &&
          ['blocked', 'dead', 'notinterested', 'junk'].includes(datObj?.Status)
      )
    }
    return x
  })
}
