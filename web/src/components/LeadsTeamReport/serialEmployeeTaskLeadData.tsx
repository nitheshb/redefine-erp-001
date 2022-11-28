/* eslint-disable prettier/prettier */
import { DockSharp } from '@mui/icons-material'
import { getTodayTodoLeadsDataByUser } from 'src/context/dbQueryFirebase'

export function serialEmployeeTaskLeadData(employeeListA) {
  console.log('user list is', employeeListA)
  let z = []
  const finalSet = []
  employeeListA.map(async (souceObj) => {
    const sou = {}
    z = [...z, souceObj?.value]
    const { value, label,offPh } = souceObj

    const todoData = await getTodayTodoLeadsDataByUser(
      'maahomes',
      (querySnapshot) => {
        let pro
        const y = []
        const Total = []
        let tomorrowDay =[]
        let sevenDays = []
        let twentyDays = []
        let thirtyDays = []
        let fourtyDays = []
        let fiftyDays = []
        let fiftyDaysMore = []
        let TotalMore = []
        const todayDate = new Date(+new Date().setHours(0, 0, 0, 0)).getTime()
        const tomorrowDate = new Date(
          +new Date().setHours(0, 0, 0, 0) + 86400000
        ).getTime()
        const sevenDaysDate = new Date(
          +new Date().setHours(0, 0, 0, 0) - 604800000
        ).getTime()
        const twentyDaysDate = new Date(
          +new Date().setHours(0, 0, 0, 0) - 1036800000
        ).getTime()
        const thirtyDaysDate = new Date(
          +new Date().setHours(0, 0, 0, 0) - 2592000000
        ).getTime()
        const fourtyDaysDate = new Date(
          +new Date().setHours(0, 0, 0, 0) - 3456000000
        ).getTime()
        const fiftyDaysDate = new Date(
          +new Date().setHours(0, 0, 0, 0) - 4320000000
        ).getTime()
        console.log('fifty days date is ', label, 1659168185117 > thirtyDaysDate,1659168185117-twentyDaysDate, fourtyDaysDate )
        if (querySnapshot.docs.length === 0) {
          sou['label'] = label
          sou['Name'] = label
          sou['value'] = value
          sou['offPh'] = offPh || ""
          sou['now'] = tomorrowDay
          sou['sevenDays'] = sevenDays
          sou['twentyDays'] = twentyDays
          sou['thirtyDays'] = thirtyDays
          sou['fourtyDays'] = fourtyDays
          sou['sevenDays'] = sevenDays
          sou['fiftyDays'] = fiftyDays
          sou['fiftyDaysMore'] = fiftyDaysMore
          sou['Total'] = TotalMore
          return sou
        } else {
          const projects = querySnapshot.docs.map(async (docSnapshot) => {
            const x = docSnapshot.data()
            const { staDA } = x
            console.log('wow it', x)

            const tomorrowDateNEW = staDA.filter(
              (da) =>
                x[da]['schTime'] < tomorrowDate  &&
                x[da]['schTime'] >= todayDate && x[da]['sts'] === 'pending' && x[da]['assTo'] != undefined
            )
            // const sevenDaysNew = staDA.filter(
            //   (da) =>
            //     ((x[da]['sts'] === 'pending') &&
            //     (x[da]['schTime'] < sevenDaysDate ) &&
            //     (x[da]['schTime'] >= tomorrowDate) && x[da]['assTo'] != undefined)
            // )
            const sevenDaysNew = staDA.filter(
              (da) =>
                ((x[da]['sts'] === 'pending') &&
                (x[da]['schTime'] <todayDate ) &&
                (x[da]['schTime'] >= sevenDaysDate ) &&
              x[da]['assTo'] != undefined)
            )
            const twentyDaysNew = staDA.filter(
              (da) =>
                ((x[da]['sts'] === 'pending') &&
                (x[da]['schTime'] < sevenDaysDate) &&
                (x[da]['schTime']  >=twentyDaysDate) && x[da]['assTo'] != undefined)
            )
            const thirtyDaysNew = staDA.filter(
              (da) =>
                x[da]['schTime'] >= thirtyDaysDate &&
                x[da]['schTime'] < twentyDaysDate   &&
                x[da]['sts'] === 'pending' && x[da]['assTo'] != undefined
            )
            const fourtyDaysNew = staDA.filter(
              (da) =>
                x[da]['schTime'] >= fourtyDaysDate &&
                x[da]['schTime'] < thirtyDaysDate  &&
                x[da]['sts'] === 'pending' && x[da]['assTo'] != undefined
            )
            const fiftyDaysNew = staDA.filter(
              (da) =>
                x[da]['schTime'] >= fiftyDaysDate &&
                x[da]['schTime'] <  fourtyDaysDate &&
                x[da]['sts'] === 'pending' && x[da]['assTo'] != undefined
            )

            const fiftyDaysMoreNew = staDA.filter(
              (da) =>
                x[da]['schTime'] < fiftyDaysDate && x[da]['sts'] === 'pending' && x[da]['assTo'] != undefined
            )
            tomorrowDay = [...tomorrowDay, ...tomorrowDateNEW]
            sevenDays = [...sevenDays, ...sevenDaysNew]
            twentyDays = [...twentyDays, ...twentyDaysNew]
            thirtyDays = [...thirtyDays, ...thirtyDaysNew]
            fourtyDays = [...fourtyDays, ...fourtyDaysNew]
            fiftyDays = [...fiftyDays, ...fiftyDaysNew]
            fiftyDaysMore = [...fiftyDaysMore, ...fiftyDaysMoreNew]
            TotalMore = [...TotalMore, ...tomorrowDateNEW, ...sevenDaysNew,...twentyDaysNew ,...thirtyDaysNew,...fourtyDaysNew,...fiftyDaysMoreNew  ]
            sou['label'] = label
            sou['Name'] = label
            sou['value'] = value
            sou['offPh'] = offPh || ""
            sou['now'] = tomorrowDay
            sou['sevenDays'] = sevenDays
            sou['twentyDays'] = twentyDays
            sou['thirtyDays'] = thirtyDays
            sou['fourtyDays'] = fourtyDays
            sou['sevenDays'] = sevenDays
            sou['fiftyDays'] = fiftyDays
            sou['fiftyDaysMore'] = fiftyDaysMore
            sou['Total'] =TotalMore

            return sou

            // return x
          })
        }

        // //  get the task details from docid
        // if (projects.length > 0) {
        //   console.log(
        //     'my values are ',
        //     projects,
        //     projects.filter((data) => data != 'remove')
        //   )
        //   projects.filter((data) => data != undefined)
        //   Promise.all(projects).then(function (results) {
        //     console.log('master one', results)
        //     results.filter((data) => data != 'remove')
        //   })
        // } else {
        //   console.log('my values are 1 ', projects)
        // }
      },
      { uid: value, type: 'today' },
      () => {
        console.log('error')
      }
    )

    finalSet.push(sou)

    return sou
  })

  return finalSet
}
