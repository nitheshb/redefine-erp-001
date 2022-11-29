import { WhereToVote } from '@mui/icons-material'
import {
  setDoc,
  doc,
  orderBy,
  addDoc,
  // getFirestore,
  onSnapshot,
  collection,
  getDoc,
  getDocs,
  query,
  where,
  Timestamp,
  increment,
  updateDoc,
  deleteDoc,
  limit,
  arrayUnion,
  deleteField,
} from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

import { sendWhatAppTextSms1 } from 'src/util/axiosWhatAppApi'

import { db } from './firebaseConfig'
import { supabase } from './supabase'

// import { userAccessRoles } from 'src/constants/userAccess'

// **********************************************
// getF
// **********************************************

// get users list
export const steamUsersList = (orgId, snapshot, error) => {
  const itemsQuery = query(collection(db, 'users'), where('orgId', '==', orgId))
  console.log('orgname is ====>', orgId)
  return onSnapshot(itemsQuery, snapshot, error)
}
// get users list
export const steamUsersListByRole = (orgId, snapshot, error) => {
  const itemsQuery = query(
    collection(db, 'users'),
    where('orgId', '==', orgId),
    where('roles', 'array-contains-any', ['sales-manager', 'sales-executive'])
  )
  return onSnapshot(itemsQuery, snapshot, error)
}

// get all bank detials list
export const steamBankDetailsList = (orgId, snapshot, error) => {
  const itemsQuery = query(collection(db, `${orgId}_BankDetails`))
  return onSnapshot(itemsQuery, snapshot, error)
}

// get all Virtual Accounts detials list
export const steamVirtualAccountsList = (orgId, snapshot, error) => {
  const itemsQuery = query(collection(db, `${orgId}_VirtualAccounts`))
  return onSnapshot(itemsQuery, snapshot, error)
}

//  get users activity list
export const steamUsersActivityLog = (orgId, snapshot, error) => {
  const itemsQuery = query(
    collection(db, `${orgId}_user_log`),
    orderBy('time', 'desc')
  )
  return onSnapshot(itemsQuery, snapshot, error)
}

// get users activity of user list
export const steamUsersActivityOfUser = (orgId, snapshot, error) => {
  const itemsQuery = query(
    collection(db, `${orgId}_user_log`),
    where('by', '==', 'nithe.nithesh@gmail.com')
  )
  return onSnapshot(itemsQuery, snapshot, error)
}

//  get lead activity list
export const steamLeadActivityLog = async (orgId, snapshot, data, error) => {
  // const itemsQuery = query(doc(db, `${orgId}_leads_log', 'W6sFKhgyihlsKmmqDG0r'))
  const { uid } = data
  console.log('is uid g', uid)
  // return onSnapshot(doc(db, `${orgId}_leads_log`, uid), snapshot, error)
  const { data: lead_logs, error1 } = await supabase
    .from(`${orgId}_lead_logs`)
    .select('type,subtype,T, by, from, to ')
    .eq('Luid', uid)
    .order('T', { ascending: false })
  return lead_logs
  // return onSnapshot(itemsQuery, snapshot, error)
}
export const steamLeadNotes = (orgId, snapshot, data, error) => {
  // const itemsQuery = query(doc(db, `${orgId}_leads_log', 'W6sFKhgyihlsKmmqDG0r'))
  const { uid } = data
  console.log('is uid g', uid)
  return onSnapshot(doc(db, `${orgId}_leads_notes`, uid), snapshot, error)
  // return onSnapshot(itemsQuery, snapshot, error)
}
export const steamLeadPhoneLog = (orgId, snapshot, data, error) => {
  // const itemsQuery = query(doc(db, `${orgId}_leads_log', 'W6sFKhgyihlsKmmqDG0r'))
  const { uid } = data
  console.log('is uid g', uid)
  return onSnapshot(doc(db, `${orgId}_leads_log`, uid), snapshot, error)
  // return onSnapshot(itemsQuery, snapshot, error)
}
export const steamLeadScheduleLog = (orgId, snapshot, data, error) => {
  // const itemsQuery = query(doc(db, `${orgId}_leads_log', 'W6sFKhgyihlsKmmqDG0r'))
  const { uid } = data
  return onSnapshot(doc(db, `${orgId}_leads_sch`, uid), snapshot, error)
  // return onSnapshot(itemsQuery, snapshot, error)
}
export const steamLeadById = (orgId, snapshot, data, error) => {
  // const itemsQuery = query(doc(db, `${orgId}_leads_log', 'W6sFKhgyihlsKmmqDG0r'))
  const { uid } = data
  return onSnapshot(doc(db, `${orgId}_leads`, uid), snapshot, error)
  // return onSnapshot(itemsQuery, snapshot, error)
}
// stream
export const getLeadsByStatus = (orgId, snapshot, data, error) => {
  const { projAccessA, isCp } = data
  const colName = isCp ? `${orgId}_leads_cp` : `${orgId}_leads`
  const itemsQuery = query(
    collection(db, colName),
    where('ProjectId', 'in', projAccessA)
    // where('Status', 'in', status)
  )
  return onSnapshot(itemsQuery, snapshot, error)
}
export const getLeadsByUnassigned = (orgId, snapshot, error) => {
  const itemsQuery = query(
    collection(db, `${orgId}_leads`),
    where('Status', '==', 'unassigned')
  )
  return onSnapshot(itemsQuery, snapshot, error)
}
export const getLeadsByAdminStatus = (orgId, snapshot, data, error) => {
  const { status, projAccessA } = data
  const itemsQuery = query(
    collection(db, `${orgId}_leads`),
    where('Status', 'in', status)
    //  orderBy('Date')
  )
  console.log('hello by Status', onSnapshot(itemsQuery, snapshot, error))
  return onSnapshot(itemsQuery, snapshot, error)
}

export const getMyLeadsByDate = async (orgId, data) => {
  const { cutoffDate, uid, isCp } = data
  const colName = isCp ? `${orgId}_leads_cp` : `${orgId}_leads`
  console.log('leads table name cp', colName)
  const itemsQuery = query(
    collection(db, colName),
    where('assignedTo', '==', uid),
    where('Date', '>=', cutoffDate)
  )
  const citySnapshot = await getDocs(itemsQuery)
  // await citySnapshot.docs.map((doc) => doc.data())
  console.log('my Array data is delayer 1', citySnapshot)
  return await citySnapshot.docs.map((doc) => doc.data())
}
export const getLeadsByDate = async (orgId, data) => {
  const { cutoffDate } = data
  const itemsQuery = query(
    collection(db, `${orgId}_leads`),
    where('Date', '>=', cutoffDate)
  )
  const citySnapshot = await getDocs(itemsQuery)
  // await citySnapshot.docs.map((doc) => doc.data())
  console.log('my Array data is delayer 1', citySnapshot)
  return await citySnapshot.docs.map((doc) => doc.data())
}
// get finance transactions
export const getFinanceTransactionsByStatus = (
  orgId,
  snapshot,
  data,
  error
) => {
  const { status } = data

  const itemsQuery = query(
    collection(db, `${orgId}_fincance`),
    where('status', 'in', status)
  )
  console.log('hello ', status, itemsQuery)
  return onSnapshot(itemsQuery, snapshot, error)
}
// get finance transactions
export const getCrmUnitsByStatus = (orgId, snapshot, data, error) => {
  const { status } = data

  const itemsQuery = query(
    collection(db, `${orgId}_units`),
    where('Status', 'in', status)
  )
  console.log('hello ', status, itemsQuery)
  return onSnapshot(itemsQuery, snapshot, error)
}
// get leads only of a user
export const getLeadsByStatusUser = (orgId, snapshot, data, error) => {
  console.log('orgId is ', orgId)
  const { status, uid, isCp } = data
  const colName = isCp ? `${orgId}_leads_cp` : `${orgId}_leads`
  const itemsQuery = query(
    collection(db, colName),
    where('Status', 'in', status),
    where('assignedTo', '==', uid)
  )
  console.log('hello ', status, itemsQuery)
  return onSnapshot(itemsQuery, snapshot, error)
}

export const getTodayTodoLeadsData = (orgId, snapshot, data, error) => {
  const { type } = data

  // type: 'upcoming'

  const itemsQuery = query(
    collection(db, `${orgId}_leads_sch`),
    where('staA', 'array-contains-any', ['pending', 'overdue'])
  )
  // const itemsQuery1 = query(
  //   collection(db, `${orgId}_leads_sch'),
  //   where('staA', 'array-contains-any', ['pending', 'overdue'])
  // )
  // return onSnapshot(itemsQuery, (docSna) => {
  //   console.log('Current data: ', docSna.docs.length)
  //   docSna.docs.map(async (dataSnp) => {
  //     const userRef = doc(db, `${orgId}_leads', dataSnp.id)
  //     const docSnap1 = await getDoc(userRef)
  //     if (docSnap1.exists()) {
  //       return docSnap1.data()
  //     } else {
  //       // doc.data() will be undefined in this case
  //       console.log('No such document!')
  //       return null
  //     }
  //   })
  // })
  console.log('hello ', status, itemsQuery)
  return onSnapshot(itemsQuery, snapshot, error)
}
export const getTodayTodoLeadsDataByUser = (orgId, snapshot, data, error) => {
  const { status, uid } = data

  const itemsQuery = query(
    collection(db, `${orgId}_leads_sch`),
    where('staA', 'array-contains-any', ['pending', 'overdue']),
    where('assignedTo', '==', uid)
  )

  return onSnapshot(itemsQuery, snapshot, error)
}
export const getLeadbyId1 = async (orgId, uid) => {
  const docRef = doc(db, `${orgId}_leads`, uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data())
    return docSnap.data()
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!')
  }
}
export const getLedsData1 = async (orgId) => {
  try {
    const citiesCol = collection(db, `${orgId}_leads`)
    const citySnapshot = await getDocs(citiesCol)
    await citySnapshot.docs.map((doc) => doc.data())
    await console.log(
      'inside getLeadsData1 length',
      `${orgId}leads`,
      citySnapshot.docs.map((doc) => doc.data())
    )
    return citySnapshot.docs.map((doc) => doc.data())
  } catch (error) {
    console.log('error in db', error)
  }
}

export const getLedsData = async () => {
  try {
    const citiesCol = collection(db, 'users')
    const citySnapshot = await getDocs(citiesCol)
    const cityList = citySnapshot.docs.map((doc) => doc.data())
    return cityList
  } catch (error) {
    console.log('error in db', error)
  }
}
export const getUnits = (orgId, snapshot, data, error) => {
  const { status, pId, blockId } = data

  const itemsQuery = query(
    collection(db, `${orgId}_units`),
    where('pId', '==', pId),
    where('blockId', '==', blockId),
    orderBy('unit_no', 'asc')
  )

  console.log('hello ', status, itemsQuery, data)
  return onSnapshot(itemsQuery, snapshot, error)
}

export const getCustomerDocs = async (orgId, uid: string, snapshot, error) => {
  try {
    const getAllProjectByIdQuery = await query(
      collection(db, `${orgId}_leads_docs`),
      where('cUid', '==', uid)
    )
    return onSnapshot(getAllProjectByIdQuery, snapshot, error)
  } catch (error) {
    console.log('error in db', error)
  }
}

export const getPlanDiagramByPhase = async (orgId, data, snapshot, error) => {
  const { pId, phaseId, type } = data
  console.log('plandiagram data is', data)
  try {
    const getAllProjectByIdQuery = await query(
      collection(db, `${orgId}_project_docs`),
      where('pId', '==', pId),
      where('phaseId', '==', phaseId),
      where('type', '==', type)
    )
    return onSnapshot(getAllProjectByIdQuery, snapshot, error)
  } catch (error) {
    console.log('error in db', error)
  }
}

export const getUser = async (uid: string) => {
  try {
    const userRef = doc(db, 'users', uid)
    const docSnap = await getDoc(userRef)
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
      return null
    }
  } catch (error) {
    console.log('error in db', error)
  }
}

export const checkIfLeadAlreadyExists = async (cName, matchVal) => {
  // db.collection(`${orgId}_leads`).doc().set(data)
  // db.collection('')
  console.log('matchVal', matchVal)
  const q = await query(collection(db, cName), where('Mobile', '==', matchVal))
  const parentDocs = []
  const cpDocs = []

  const querySnapshot = await getDocs(q)
  await console.log('foundLength @@', querySnapshot.docs.length)
  // return await querySnapshot.docs.length

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log('dc', doc.id, ' => ', doc.data())
    parentDocs.push(doc.data())
  })

  const q1 = await query(
    collection(db, `${cName}_cp`),
    where('Mobile', '==', matchVal)
  )

  const querySnapshot1 = await getDocs(q1)

  querySnapshot1.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log('dc', doc.id, ' => ', doc.data())
    parentDocs.push(doc.data())
  })
  return parentDocs

  // await console.log('length is ', q.length)
  // return await q.length

  // db.collection(`${orgId}_leads`).add(data)
}

export const checkIfUnitAlreadyExists = async (
  cName,
  pId,
  phaseId,
  blockId,
  unitId
) => {
  // db.collection(`${orgId}_leads').doc().set(data)
  // db.collection('')
  console.log('inoinel', pId, phaseId, blockId, unitId)
  const q = await query(
    collection(db, cName),
    where('unit_no', '==', unitId),
    where('phaseId', '==', phaseId),
    where('blockId', '==', blockId),
    where('pId', '==', pId)
  )

  const querySnapshot = await getDocs(q)
  await console.log('foundLength @@', querySnapshot.docs.length)
  // return await querySnapshot.docs.length
  const parentDocs = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log('dc', doc.id, ' => ', doc.data())
    parentDocs.push(doc.data())
  })

  return parentDocs

  // await console.log('length is ', q.length)
  // return await q.length

  // db.collection(`${orgId}_leads').add(data)
}
export const checkIfUserAlreadyExists = async (cName, matchVal) => {
  // db.collection(`${orgId}_leads`).doc().set(data)
  // db.collection('')
  console.log('matchVal', matchVal)
  const q = await query(collection(db, cName), where('email', '==', matchVal))

  const querySnapshot = await getDocs(q)
  await console.log('foundLength @@', querySnapshot.docs.length)
  // return await querySnapshot.docs.length
  const parentDocs = []
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log('dc', doc.id, ' => ', doc.data())
    parentDocs.push(doc.data())
  })

  return parentDocs

  // await console.log('length is ', q.length)
  // return await q.length

  // db.collection(`${orgId}_leads`).add(data)
}
export const getAllRoleAccess = async (orgId) => {
  // userAccessRoles.forEach(async (element) => {
  //   const r = 'A' + Math.random() * 100000000000000000 + 'Z'
  //   const updated = {
  //     ...element,
  //     uid: r,
  //   }
  //   const ref = doc(db, `${orgId}_roles_access', r)
  //   await setDoc(ref, updated, { merge: true })
  // })
  const records = []
  const getAllRolesQueryById = await query(
    collection(db, `${orgId}_roles_access`)
  )
  const querySnapshot = await getDocs(getAllRolesQueryById)
  querySnapshot.forEach((doc) => {
    records.push(doc.data())
  })
  return records
}

export const getSelectedRoleAccess = async (orgId, role) => {
  const getRolesQueryById = await query(
    collection(db, `spark_roles_access`),
    where('role', '==', role)
  )
  const records = []
  const querySnapshot = await getDocs(getRolesQueryById)
  querySnapshot.forEach((doc) => {
    records.push(doc.data())
  })
  return records?.[0]?.access
    ?.filter((item) => item.checked)
    ?.map((elem) => elem.key)
}
export const getMyProjects = async (orgId, data, snapshot, error) => {
  console.log('org is ', orgId)
  const { projAccessA } = data
  console.log('what is this', projAccessA)
  const getAllProjectsQuery = await query(
    collection(db, `${orgId}_projects`),
    // where('uid', 'in', projAccessA),
    orderBy('created', 'desc')
  )
  return onSnapshot(getAllProjectsQuery, snapshot, error)
}
export const getAllProjects = async (orgId, snapshot, error) => {
  console.log('org is ', orgId)
  const getAllProjectsQuery = await query(
    collection(db, `${orgId}_projects`),
    orderBy('created', 'desc')
  )
  return onSnapshot(getAllProjectsQuery, snapshot, error)
}

export const getProjectByUid = async (orgId, uid: string, snapshot, error) => {
  try {
    const getAllProjectByIdQuery = await query(
      collection(db, `${orgId}_projects`),
      where('uid', '==', uid)
    )
    return onSnapshot(getAllProjectByIdQuery, snapshot, error)
  } catch (error) {
    console.log('error in db', error)
  }
}

export const getPhasesByProject = async (
  orgId,
  uid: string,
  snapshot,
  error
) => {
  console.log('project details are', uid)
  const getAllPhasesQuery = await query(
    collection(db, `${orgId}_phases`),
    where('projectId', '==', uid)
  )
  return onSnapshot(getAllPhasesQuery, snapshot, error)
}

export const getBlocksByPhase = async (
  { projectId, phaseId },
  snapshot,
  error
) => {
  try {
    const getAllPhasesQuery = await query(
      collection(db, 'blocks'),
      where('projectId', '==', projectId),
      where('phaseId', '==', phaseId),
      orderBy('created', 'asc'),
      limit(20)
    )
    return onSnapshot(getAllPhasesQuery, snapshot, error)
  } catch (error) {
    console.log('error at getBlocksByPhase ', error, projectId, phaseId)
    return error
  }
}

export const getPaymentSchedule = async (
  { projectId, phaseId },
  snapshot,
  error
) => {
  const getAllPaymentSchedule = await query(
    collection(db, 'paymentSchedule'),
    where('projectId', '==', projectId),
    where('phaseId', '==', phaseId),
    orderBy('created', 'asc')
  )
  return onSnapshot(getAllPaymentSchedule, snapshot, error)
}

export const getAdditionalCharges = async (
  { projectId, phaseId },
  snapshot,
  error
) => {
  const getAllAdditionalCharges = await query(
    collection(db, 'additionalCharges'),
    where('projectId', '==', projectId),
    where('phaseId', '==', phaseId),
    orderBy('created', 'asc')
  )
  return onSnapshot(getAllAdditionalCharges, snapshot, error)
}

// **********************************************
// addF
// **********************************************
export const createUser = async (data: any) => {
  try {
    const userRef = doc(db, 'users', data.uid)
    const docSnap = await getDoc(userRef)
    if (!docSnap.exists()) {
      await setDoc(userRef, data, { merge: true })
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!')
      return null
    }
  } catch (error) {
    console.log('error in db', error)
  }
}
export const deleteLeadSupabase = async (payload) => {
  const { data, error } = await supabase.from('maahomes_leads').delete()
  await console.log('error as ', error)
}
export const addLeadSupabase = async (payload) => {
  // const { data, error } = await supabase
  //   .from('maahomes_leads')
  //   .insert([payload])
  // await console.log('error as ', error)
}
export const addLead = async (orgId, data, by, msg) => {
  const x = await addDoc(collection(db, `${orgId}_leads`), data)
  await console.log('add Lead value is ', x, x.id, data)
  const { intype, Name, Mobile, assignedTo, Project, assignedToObj } = data
  const { data3, errorx } = await supabase.from(`${orgId}_lead_logs`).insert([
    {
      type: 'l_ctd',
      subtype: intype,
      T: Timestamp.now().toMillis(),
      Luid: x?.id || '',
      by,
      payload: {},
    },
  ])
  if (Project) {
    await sendWhatAppTextSms1(
      '7760959579',
      `Warm Greetings!

      Thanks for your interest in ${Project},
      It's a pleasure to be a part of your housing journey. Our team will be in touch with you in a brief period. In the meanwhile, this would help you get to know the project a little more.


      Warm Regards
      Maa Homes.`
    )
  }
  if (assignedTo) {
    const { offPh, name } = assignedToObj
    await sendWhatAppTextSms1(
      offPh,
      `⚡ A new lead- ${Name} Assigned to you @${Project || ''}. 📱${Mobile}`
    )

    await sendWhatAppTextSms1(
      '7760959579',
      `Greetings from MAA Homes, I am ${name}

      This is ${name} from Maa Homes,

        Regarding your interest in ${Project}, I’m pleased to be your point of contact throughout this journey. I would like to understand your requirements & do let me know if you have any doubts about ${Project}.
        Looking forward to a fruitful relationship.


      Warm Regards
      ${name}
      Maa Homes`
    )
  }
  await console.log('what is this supbase', data3, errorx)
  // await addLeadLog(orgId, x.id, {
  //   s: 's',
  //   type: 'status',
  //   subtype: 'added',
  //   T: Timestamp.now().toMillis(),
  //   txt: msg,
  //   by,
  // })

  // add task to scheduler to Intro call in 3 hrs

  const data1 = {
    by: by,
    type: 'schedule',
    pri: 'priority 1',
    notes: 'Get into Introduction Call with customer',
    sts: 'pending',
    schTime: Timestamp.now().toMillis() + 10800000, // 3 hrs
    ct: Timestamp.now().toMillis(),
  }

  const x1 = []

  x1.push('pending')

  await addLeadScheduler(orgId, x.id, data1, x1, data.assignedTo)
  return
}
// This function is used to add leads for cp
export const addCpLead = async (orgId, data, by, msg) => {
  const x = await addDoc(collection(db, `${orgId}_leads_cp`), data)
  await console.log('add Lead value is ', x, x.id, data)
  const { intype, Name, Mobile, assignedTo, Project, assignedToObj } = data
  const { data3, errorx } = await supabase.from(`${orgId}_lead_logs`).insert([
    {
      type: 'l_ctd',
      subtype: intype,
      T: Timestamp.now().toMillis(),
      Luid: x?.id || '',
      by,
      payload: {},
    },
  ])
  if (assignedTo) {
    const { offPh } = assignedToObj
    await sendWhatAppTextSms1(
      offPh,
      `⚡ A new lead- ${Name} Assigned to you @${Project}. 📱${Mobile}`
    )
  }
  await console.log('what is this supbase', data3, errorx)
  // await addLeadLog(orgId, x.id, {
  //   s: 's',
  //   type: 'status',
  //   subtype: 'added',
  //   T: Timestamp.now().toMillis(),
  //   txt: msg,
  //   by,
  // })

  // add task to scheduler to Intro call in 3 hrs

  // const data1 = {
  //   by: by,
  //   type: 'schedule',
  //   pri: 'priority 1',
  //   notes: 'Get into Introduction Call with customer',
  //   sts: 'pending',
  //   schTime: Timestamp.now().toMillis() + 10800000, // 3 hrs
  //   ct: Timestamp.now().toMillis(),
  // }

  // const x1 = []

  // x1.push('pending')

  // await addLeadScheduler(orgId, x.id, data1, x1, data.assignedTo)
  return
}

export const addCustomer = async (
  orgId,
  data,
  by,
  enqueueSnackbar,
  resetForm
) => {
  await addDoc(collection(db, `${orgId}_customer`), data)
  enqueueSnackbar('Customer Details added successfully', {
    variant: 'success',
  })
  resetForm()
  return
}
export const addUnit = async (orgId, data, by, msg) => {
  const x = await addDoc(collection(db, `${orgId}_units`), data)
  await console.log('x value is', x, x.id)
  // await addLeadLog(x.id, {
  //   s: 's',
  //   type: 'status',
  //   subtype: 'added',
  //   T: Timestamp.now().toMillis(),
  //   txt: msg,
  //   by,
  // })

  // add task to scheduler to Intro call in 3 hrs
  const { pId, phaseId, blockId, builtup_area, rate_per_sqft } = data

  addUnitComputedValues(
    `${orgId}_projects`,
    pId,
    builtup_area * rate_per_sqft || 0,
    builtup_area,
    1
  )
  addUnitComputedValues(
    'phases',
    phaseId,
    builtup_area * rate_per_sqft || 0,
    builtup_area,
    1
  )
  addUnitComputedValues(
    'blocks',
    blockId,
    builtup_area * rate_per_sqft || 0,
    builtup_area,
    1
  )

  return
}
export const addBankAccount = async (
  orgId,
  data,
  by,
  msg,
  enqueueSnackbar,
  resetForm
) => {
  const x = await addDoc(collection(db, `${orgId}_BankDetails`), data)
  enqueueSnackbar('Account added successfully', {
    variant: 'success',
  })
  resetForm()
  return
}
export const addVirtualAccount = async (orgId, data, by, msg) => {
  await addDoc(collection(db, `${orgId}_VirtualAccounts`), data)
  return
}
export const addLeadNotes = async (orgId, id, data) => {
  const xo = data?.ct
  const yo = {
    [xo]: data,
  }
  try {
    const washingtonRef = doc(db, `${orgId}_leads_notes`, id)
    console.log('check add LeadLog', washingtonRef)

    await updateDoc(washingtonRef, yo)
  } catch (error) {
    await setDoc(doc(db, `${orgId}_leads_notes`, id), yo)
  }
}

export const addUserLog = (orgId, data) => {
  // type    === addUser || updateUserRole || deleteUser
  // subtype === addUser
  // subType === RoleAdd || RoleRemoved
  // subType === deleteUser
  data.time = Timestamp.now().toMillis()
  addDoc(collection(db, `${orgId}_user_log`), data)
}

export const addLeadLog = async (orgId, did, data) => {
  const xo = Timestamp.now().toMillis()
  const yo = {
    [xo]: data,
  }
  try {
    const washingtonRef = doc(db, `${orgId}_leads_log`, did)
    console.log('check add LeadLog', washingtonRef)

    await updateDoc(washingtonRef, yo)
  } catch (error) {
    await setDoc(doc(db, `${orgId}_leads_log`, did), yo)
  }

  console.log('am at addLeadLog ')
}

export const addLeadScheduler = async (
  orgId,
  did,
  data,
  schStsA,
  assignedTo
) => {
  const xo = data?.ct
  const yo = {
    staA: schStsA,
    staDA: arrayUnion(xo),
    [xo]: data,
  }
  try {
    const washingtonRef = doc(db, `${orgId}_leads_sch`, did)
    console.log('check add LeadLog', washingtonRef)

    await updateDoc(washingtonRef, yo)
  } catch (error) {
    const y1 = { ...yo }
    yo.assignedTo = assignedTo || ''
    console.log('new log set', yo)
    await setDoc(doc(db, `${orgId}_leads_sch`, did), yo)
  }

  console.log('am at addLeadLog ')
}

export const addSchedulerLog = async (orgId, did, data) => {
  const xo = Timestamp.now().toMillis()
  data.time = Timestamp.now().toMillis()
  const yo = {
    [xo]: data,
  }
  try {
    const washingtonRef = doc(db, `${orgId}_schedules_log`, did)
    console.log('check add LeadLog', washingtonRef)
    await updateDoc(washingtonRef, yo)
  } catch (error) {
    await setDoc(doc(db, `${orgId}_schedules_log`, did), yo)
  }
  console.log('am at addLeadLog ')
}

export const createProject = async (
  orgId,
  element,
  enqueueSnackbar,
  resetForm
) => {
  try {
    const uid = uuidv4()
    const uid1 = uuidv4()
    const updated = {
      ...element,
      uid,
      status: 'ongoing',
      created: Timestamp.now().toMillis(),
    }
    const phasePayload = {
      created: Timestamp.now().toMillis(),
      editMode: true,
      phaseName: 'Phase-1',
      projectId: uid,
      uid: uid1,
      availableCount: 0,
      projectType: element?.projectType,
    }
    const {
      builderBankDocId,
      landlordBankDocId,
      projectName,
      landlordShare,
      builderShare,
    } = element
    const ref = doc(db, `${orgId}_projects`, uid)
    await setDoc(ref, updated, { merge: true })
    const ref1 = doc(db, `${orgId}_phases`, uid1)
    await setDoc(ref1, phasePayload, { merge: true })

    // add phase-0
    // created
    // editMode
    // phaseName
    // projectId
    // uid
    // phaseArea
    await updateBankEntry(
      orgId,
      builderBankDocId,
      uid,
      projectName,
      builderShare
    )
    await updateBankEntry(
      orgId,
      landlordBankDocId,
      uid,
      projectName,
      landlordShare
    )
    await addVirtualAccount(
      orgId,
      { accountName: projectName, accountNo: uid },
      'nithe.nithesh@gmail.com',
      'its virtual Account'
    )
    enqueueSnackbar('Project added successfully', {
      variant: 'success',
    })
    resetForm()
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}

export const createPhase = async (element, enqueueSnackbar, resetForm) => {
  try {
    const uid = uuidv4()
    const { orgId } = element
    const updated = {
      ...element,
      uid,
      created: Timestamp.now().toMillis(),
    }
    const ref = doc(db, `${orgId}_phases`, uid)
    await setDoc(ref, updated, { merge: true })
    enqueueSnackbar('Phase added successfully', {
      variant: 'success',
    })
    resetForm()
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}

export const createBlock = async (element, enqueueSnackbar, resetForm) => {
  console.log('it is ', element)
  try {
    const uid = uuidv4()
    const updated = {
      ...element,
      uid,
      created: Timestamp.now().toMillis(),
    }
    const ref = doc(db, 'blocks', uid)
    await setDoc(ref, updated, { merge: true })
    enqueueSnackbar('Block added successfully', {
      variant: 'success',
    })
    resetForm()
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const addPaymentReceivedEntry = async (
  orgId,
  unitDocId,
  customerDetails,
  paymentDetails,
  createdByDept,
  by,
  enqueueSnackbar
) => {
  try {
    const updated = {
      ...customerDetails,
      ...paymentDetails,
      createdByDept,
      status: 'review',
      against: 'unit',
      unitId: unitDocId,
      created: Timestamp.now().toMillis(),
    }
    // const ref = doc(db, `${orgId}_fincance', unitDocId)
    const x = await addDoc(collection(db, `${orgId}_fincance`), updated)

    enqueueSnackbar('Customer added successfully', {
      variant: 'success',
    })
    return x.id
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const createBookedCustomer = async (
  orgId,
  unitDocId,
  element,
  by,
  enqueueSnackbar
) => {
  console.log('unite data is', unitDocId)
  try {
    const updated = {
      ...element,
      uid: unitDocId,
      created: Timestamp.now().toMillis(),
    }
    const ref = doc(db, `${orgId}_customers`, unitDocId)
    await setDoc(ref, updated, { merge: true })
    // const x = await addDoc(collection(db, `${orgId}_customers`), updated)
    enqueueSnackbar('Customer added successfully', {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}

export const createPaymentSheduleComp = async (element, enqueueSnackbar) => {
  try {
    const uid = uuidv4()
    const updated = {
      ...element,
      uid,
      created: Timestamp.now().toMillis(),
    }
    const ref = doc(db, 'paymentSchedule', uid)
    await setDoc(ref, updated, { merge: true })
    enqueueSnackbar('Payment added successfully', {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}

export const createAdditonalCharges = async (element, enqueueSnackbar) => {
  try {
    const uid = uuidv4()
    const updated = {
      ...element,
      uid,
      created: Timestamp.now().toMillis(),
    }
    const ref = doc(db, 'additionalCharges', uid)
    await setDoc(ref, updated, { merge: true })
    enqueueSnackbar('Charges added successfully', {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const createAttach = async (orgId, url, by, name, cUid, type) => {
  try {
    const docRef = await addDoc(collection(db, `${orgId}_leads_docs`), {
      name,
      url,
      by,
      cUid,
      type,
      cTime: Timestamp.now().toMillis(),
    })
    return docRef
  } catch (error) {
    console.log('error in db', error)
  }
}
export const createPhaseAssets = async (
  orgId,
  url,
  by,
  name,
  pId,
  phaseId,
  type,
  format
) => {
  try {
    const docRef = await addDoc(collection(db, `${orgId}_project_docs`), {
      name,
      url,
      by,
      pId,
      phaseId,
      type,
      format,
      cTime: Timestamp.now().toMillis(),
    })
    return docRef
  } catch (error) {
    console.log('error in db', error, pId)
  }
}
export const createUserToWorkReport = async (tableName, data) => {
  try {
    const { uid } = data
    const updated = {
      ...data,
      created: Timestamp.now().toMillis(),
    }
    const ref = doc(db, tableName, uid)
    await setDoc(ref, updated, { merge: true })
    return uid
  } catch (e) {
    return e
  }
}
export const createUserToAttendance = async (element, enqueueSnackbar) => {
  try {
    const uid = uuidv4()
    const updated = {
      ...element,
      uid,
      created: Timestamp.now().toMillis(),
    }
    const ref = doc(db, 'additionalCharges', uid)
    await setDoc(ref, updated, { merge: true })
    enqueueSnackbar('Charges added successfully', {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
// **********************************************
// updateF PLsiSl3rnbYxyBxis4r0f5MpX0u1
// **********************************************
export const updateUserRole = async (
  empId,
  orgName,
  orgId,
  uid,
  dept,
  role,
  email,
  offPh,
  perPh,
  by
) => {
  await updateDoc(doc(db, 'users', uid), {
    empId: empId || 101,
    orgName: orgName,
    orgId: orgId,
    department: [dept],
    roles: [role],
    offPh: offPh || '',
    perPh: perPh || '',
  })
  return await addUserLog(orgId, {
    s: 's',
    type: 'updateRole',
    subtype: 'updateRole',
    txt: `${email} is updated with ${role}`,
    by,
  })
}
export const updateUserAccessProject = async (
  orgId,
  uid,
  projAccessA,
  projectName,
  email,
  by,
  enqueueSnackbar
) => {
  await updateDoc(doc(db, 'users', uid), {
    projAccessA: projAccessA,
  })
  enqueueSnackbar(`Lead Access Provided to ${email}`, {
    variant: 'success',
  })
  return await addUserLog(orgId, {
    s: 's',
    type: 'updateRole',
    subtype: 'updateRole',
    txt: `${email} is updated with project ${projectName}`,
    by,
  })
}

export const updateAccessRoles = async (
  orgId,
  role,
  accessRoles,
  currentUser,
  enqueueSnackbar,
  currentPage
) => {
  // data.forEach(async (d) => {
  //   await updateDoc(doc(db, `${orgId}_roles_access', d.uid), d)
  // })
  try {
    await updateDoc(doc(db, `${orgId}_roles_access`, role.uid), {
      access: accessRoles,
    })
    await addUserLog(orgId, {
      s: 's',
      type: 'updateRoleAccess',
      subtype: 'updateAccessForPages',
      txt: `${currentUser.email} is updated the user access roles`,
      by: currentUser.email,
    })
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(
      `User roles for ${role.type} & ${currentPage.name} updated successfully`,
      {
        variant: 'success',
      }
    )
  } catch (e) {
    return enqueueSnackbar(e.message, { variant: 'error' })
  }
}
export const addPhaseAdditionalCharges = async (
  orgId,
  uid,
  chargePayload,
  type,
  enqueueSnackbar
) => {
  const usersUpdate = {}

  const uuxid = uuidv4()
  usersUpdate[uuxid] = chargePayload
  chargePayload.myId = uuxid
  try {
    await updateDoc(doc(db, `${orgId}_phases`, uid), {
      [type]: arrayUnion(chargePayload),
    })
    enqueueSnackbar('Charges added successfully', {
      variant: 'success',
    })
  } catch (e) {
    console.log(' error is here', e)
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const updatePhaseAdditionalCharges = async (
  orgId,
  uid,
  chargePayloadA,
  type,
  enqueueSnackbar
) => {
  try {
    await updateDoc(doc(db, `${orgId}_phases`, uid), {
      [type]: chargePayloadA,
    })

    enqueueSnackbar('Charges added successfully', {
      variant: 'success',
    })
  } catch (e) {
    console.log(' error is here', e)
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const addPhasePaymentScheduleCharges = async (
  orgId,
  uid,
  chargePayload,
  type,
  enqueueSnackbar
) => {
  const usersUpdate = {}

  const uuxid = uuidv4()
  usersUpdate[uuxid] = chargePayload
  chargePayload.myId = uuxid
  try {
    await updateDoc(doc(db, `${orgId}_phases`, uid), {
      [type]: arrayUnion(chargePayload),
    })
    enqueueSnackbar('Charges added successfully', {
      variant: 'success',
    })
  } catch (e) {
    console.log(' error is here', e)
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const updatePaymentScheduleCharges = async (
  orgId,
  uid,
  chargePayloadA,
  type,
  enqueueSnackbar
) => {
  try {
    await updateDoc(doc(db, `${orgId}_phases`, uid), {
      [type]: chargePayloadA,
    })

    enqueueSnackbar('Charges added successfully', {
      variant: 'success',
    })
  } catch (e) {
    console.log(' error is here', e)
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const updateProject = async (
  orgId,
  uid,
  project,
  existingBuildBankId,
  existingLandBankId,
  enqueueSnackbar
) => {
  try {
    await updateDoc(doc(db, `${orgId}_projects`, uid), {
      ...project,
      updated: Timestamp.now().toMillis(),
    })
    const {
      projectName,
      builderBankDocId,
      landlordBankDocId,
      landlordShare,
      builderShare,
    } = project
    console.log('my master setup Is', {
      projectName,
      builderBankDocId,
      landlordBankDocId,
      landlordShare,
      builderShare,
    })
    if (builderBankDocId != existingBuildBankId) {
      await removeProjectInBankEntry(
        orgId,
        existingBuildBankId,
        uid,
        projectName
      )
      await updateBankEntry(
        orgId,
        builderBankDocId,
        uid,
        projectName,
        builderShare
      )
    }
    if (landlordBankDocId != existingLandBankId) {
      await removeProjectInBankEntry(
        orgId,
        existingLandBankId,
        uid,
        projectName
      )
      await updateBankEntry(
        orgId,
        landlordBankDocId,
        uid,
        projectName,
        landlordShare
      )
    }

    enqueueSnackbar('Project updated successfully', {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const updateBankEntry = async (
  orgId,
  newBankDocId,
  pId,
  projectName,
  share
) => {
  try {
    await updateDoc(doc(db, `${orgId}_BankDetails`, newBankDocId), {
      usedIn: increment(1),
      usedInA: arrayUnion({ pId: pId, pName: projectName, share: share }),
      updated: Timestamp.now().toMillis(),
    })
  } catch (e) {
    console.log('updateBankEntry error', e)
  }
}
export const removeProjectInBankEntry = async (
  orgId,
  oldbankDocId,
  pId,
  projectName
) => {
  try {
    if (oldbankDocId === '') return
    // get the exisiting usedInA from old docId and filter the matched project Id
    console.log('oldbankDocId', oldbankDocId)
    const getBankProfile = doc(db, `${orgId}_BankDetails`, oldbankDocId)
    // let records
    // const docSnap1 = await await getDoc(getBankProfile)
    // if (docSnap1.exists()) {
    //   records = docSnap1.data()
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log('No such document!')
    //   return null
    // }
    // const { usedInA } = records
    // try {
    //   const removedUsedinA = usedInA?.filter((item) => item.pId != pId)

    //   await updateDoc(doc(db, `${orgId}_BankDetails`, oldbankDocId), {
    //     usedIn: increment(-1),
    //     usedInA: removedUsedinA,
    //     updated: Timestamp.now().toMillis(),
    //   })
    // } catch (error) {
    //   console.log('error1 ', error, usedInA, pId)
    // }
  } catch (e) {
    console.log('updateBankEntry error', e, oldbankDocId)
  }
}
export const updatePhase = async (uid, project, enqueueSnackbar) => {
  try {
    await updateDoc(doc(db, 'phases', uid), {
      ...project,
      updated: Timestamp.now().toMillis(),
    })
    enqueueSnackbar('Phase updated successfully', {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}

export const updateBlock = async (uid, project, enqueueSnackbar) => {
  try {
    await updateDoc(
      doc(db, 'blocks', uid),
      {
        ...project,
        updated: Timestamp.now().toMillis(),
      },
      { merge: true }
    )
    enqueueSnackbar('Block updated successfully', {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const updateBlock_AddFloor = async (uid, floorName, enqueueSnackbar) => {
  try {
    await updateDoc(doc(db, 'blocks', uid), {
      floorA: arrayUnion(floorName),
      updated: Timestamp.now().toMillis(),
    })
    enqueueSnackbar(`Floor ${floorName} added updated successfully`, {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}

export const updateLeadAssigTo = async (
  orgId,
  leadDocId,
  assignedTo,
  Status,
  leadDetailsObj,
  by
) => {
  const { value, offPh } = assignedTo
  const { Name, Email, Mobile } = leadDetailsObj
  console.log('inside updater ', assignedTo, {
    leadDocId,
    assignedTo: value,
    assignedToObj: assignedTo,
    AssignedBy: by,
    assignT: Timestamp.now().toMillis(),
  })

  await updateDoc(doc(db, `${orgId}_leads`, leadDocId), {
    assignedTo: value,
    assignedToObj: assignedTo,
    AssignedBy: by,
    assignT: Timestamp.now().toMillis(),
    Status: Status == 'unassigned' || Status == '' ? 'new' : Status,
  })
  await sendWhatAppTextSms1(
    offPh,
    `⚡ A new lead- ${Name} Assigned to you. 📱${Mobile}`
  )

  return
  // return await addUserLog({
  //   s: 's',
  //   type: 'updateRole',
  //   subtype: 'updateRole',
  //   txt: `${email} is updated with ${role}`,
  //   by,
  // })
}
export const updateLeadCustomerDetailsTo = async (
  orgId,
  leadDocId,
  data,
  by,
  enqueueSnackbar,
  resetForm
) => {
  try {
    console.log('data is', leadDocId, data)

    await updateDoc(doc(db, `${orgId}_leads`, leadDocId), {
      ...data,
    })
    enqueueSnackbar('Customer Details added successfully', {
      variant: 'success',
    })
  } catch (error) {
    console.log('customer details updation failed', error, {
      ...data,
    })
    enqueueSnackbar('Customer Details updation failed', {
      variant: 'error',
    })
  }

  return
}
export const updateLeadCostSheetDetailsTo = async (
  orgId,
  leadDocId,
  data,
  by,
  enqueueSnackbar,
  resetForm
) => {
  try {
    console.log('data is cost sheet', leadDocId, data)

    await updateDoc(doc(db, `${orgId}_leads`, leadDocId), {
      ...data,
    })
    enqueueSnackbar('Cost Sheet Updated for Customer', {
      variant: 'success',
    })
  } catch (error) {
    console.log('Filed updated Cost sheet', error, {
      ...data,
    })
    enqueueSnackbar('Customer Details updation failed', {
      variant: 'error',
    })
  }

  return
  // return await addUserLog({
  //   s: 's',
  //   type: 'updateRole',
  //   subtype: 'updateRole',
  //   txt: `${email} is updated with ${role}`,
  //   by,
  // })
}
export const updateUnitAsBooked = async (
  orgId,
  unitId,
  leadDocId,
  data,
  by,
  enqueueSnackbar,
  resetForm
) => {
  try {
    console.log('data is cost sheet', leadDocId, data, unitId)

    await updateDoc(doc(db, `${orgId}_units`, unitId), {
      ...data,
    })
    enqueueSnackbar('Cost Sheet Updated for Customer', {
      variant: 'success',
    })
  } catch (error) {
    console.log('Filed updated Cost sheet', error, {
      ...data,
    })
    enqueueSnackbar('Customer Details updation failed', {
      variant: 'error',
    })
  }

  return
  // return await addUserLog({
  //   s: 's',
  //   type: 'updateRole',
  //   subtype: 'updateRole',
  //   txt: `${email} is updated with ${role}`,
  //   by,
  // })
}

export const updateLeadRemarks_NotIntrested = async (
  orgId,
  leadDocId,
  data,
  by,
  enqueueSnackbar
) => {
  try {
    console.log('data is', leadDocId, data)
    const { from, Status, notInterestedReason, notInterestedNotes } = data

    await updateDoc(doc(db, `${orgId}_leads`, leadDocId), {
      ...data,
    })
    const { data1, error1 } = await supabase.from(`${orgId}_lead_logs`).insert([
      {
        type: 'sts_change',
        subtype: Status,
        T: Timestamp.now().toMillis(),
        Luid: leadDocId,
        by,
        payload: { reason: notInterestedReason, notes: notInterestedNotes },
        from: from,
        to: Status,
      },
    ])
    enqueueSnackbar('Updated Successfully', {
      variant: 'success',
    })
  } catch (error) {
    console.log('Updation failed', error, {
      ...data,
    })
    enqueueSnackbar('Updation failed', {
      variant: 'error',
    })
  }

  return
}
export const updateLeadRemarks = async (
  orgId,
  leadDocId,
  data,
  by,
  enqueueSnackbar
) => {
  try {
    console.log('data is visit done', leadDocId, data)
    const { from, Status, VisitDoneReason, VisitDoneNotes } = data

    await updateDoc(doc(db, `${orgId}_leads`, leadDocId), {
      ...data,
    })

    enqueueSnackbar('Updated Successfully', {
      variant: 'success',
    })
  } catch (error) {
    console.log('Updation failed', error, {
      ...data,
    })
    enqueueSnackbar('Updation failed', {
      variant: 'error',
    })
  }

  return
}
export const updateLeadRemarks_VisitDone = async (
  orgId,
  leadDocId,
  data,
  by,
  enqueueSnackbar
) => {
  try {
    console.log('data is visit done', leadDocId, data)
    const { from, Status, VisitDoneReason, VisitDoneNotes } = data

    await updateDoc(doc(db, `${orgId}_leads`, leadDocId), {
      ...data,
    })
    const { data1, error1 } = await supabase.from(`${orgId}_lead_logs`).insert([
      {
        type: 'sts_change',
        subtype: Status,
        T: Timestamp.now().toMillis(),
        Luid: leadDocId,
        by,
        payload: { reason: VisitDoneReason, notes: VisitDoneNotes },
        from: from,
        to: Status,
      },
    ])
    enqueueSnackbar('Updated Successfully', {
      variant: 'success',
    })
  } catch (error) {
    console.log('Updation failed', error, {
      ...data,
    })
    enqueueSnackbar('Updation failed', {
      variant: 'error',
    })
  }

  return
}
export const updateLeadStatus = async (
  orgId,
  leadDocId,
  oldStatus,
  newStatus,
  by,
  enqueueSnackbar
) => {
  try {
    console.log('wow it should be here', leadDocId, newStatus)
    await updateDoc(doc(db, `${orgId}_leads`, leadDocId), {
      Status: newStatus,
      coveredA: arrayUnion(oldStatus),
      stsUpT: Timestamp.now().toMillis(),
    })
    // await addLeadLog(orgId, x.id, {
    //   s: 's',
    //   type: 'status',
    //   subtype: 'added',
    //   T: Timestamp.now().toMillis(),
    //   txt: msg,
    //   by,
    // })
    const { data1, error1 } = await supabase.from(`${orgId}_lead_logs`).insert([
      {
        type: 'sts_change',
        subtype: oldStatus,
        T: Timestamp.now().toMillis(),
        Luid: leadDocId,
        by,
        payload: {},
        from: oldStatus,
        to: newStatus,
      },
    ])

    console.log('chek if ther is any erro in supa', data1, error1)
    enqueueSnackbar(`Status Updated to ${newStatus}`, {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
export const updateLeadProject = async (orgId, leadDocId, newProjObj) => {
  console.log('wow it should be here', leadDocId, newProjObj)
  await updateDoc(doc(db, `${orgId}_leads`, leadDocId), newProjObj)
}
export const updateSchLog = async (orgId, uid, kId, newStat, schStsA) => {
  const x = `${kId}.sts`
  const y = `${kId}.comT`
  await updateDoc(doc(db, `${orgId}_leads_sch`, uid), {
    staA: schStsA,
    // staDA: arrayUnion(xo),
    [x]: newStat,
    [y]: Timestamp.now().toMillis() + 21600000,
  })
}
export const undoSchLog = async (orgId, uid, kId, newStat, schStsA, oldSch) => {
  const { schTime } = oldSch
  const x = `${kId}.sts`
  const y = `${kId}.schTime`
  console.log('undo time is ', schStsA)

  await updateDoc(doc(db, `${orgId}_leads_sch`, uid), {
    staA: schStsA,
    // staDA: arrayUnion(xo),
    [x]: newStat,
    [y]: schTime,
  })
}
export const editTaskDB = async (orgId, uid, kId, newStat, schStsA, oldSch) => {
  const { schTime, notes } = oldSch
  const x = `${kId}.notes`
  const y = `${kId}.schTime`
  console.log('undo time is ', schStsA, schTime)
  await updateDoc(doc(db, `${orgId}_leads_sch`, uid), {
    staA: schStsA,
    // staDA: arrayUnion(xo),
    [x]: notes,
    [y]: schTime,
  })
}
export const rescheduleTaskDB = async (
  orgId,
  uid,
  kId,
  newStat,
  schStsA,
  schTime
) => {
  const y = `${kId}.schTime`
  console.log('new schedule time i s', schTime)

  await updateDoc(doc(db, `${orgId}_leads_sch`, uid), {
    [y]: schTime,
  })
}
export const editAddTaskCommentDB = async (
  orgId,
  uid,
  kId,
  newStat,
  schStsA,
  oldSch
) => {
  const { schTime, comments } = oldSch
  const x = `${kId}.comments`
  const y = `${kId}.schTime`
  console.log('comments are', comments)

  await updateDoc(doc(db, `${orgId}_leads_sch`, uid), {
    [x]: comments,
    [y]: schTime,
  })

  if (comments.length > 0) {
    const { c } = comments[0]
    await updateDoc(doc(db, `${orgId}_leads`, uid), {
      Remarks: c,
    })
  }
}
export const updateSch = async (
  orgId,
  uid,
  kId,
  newCt,
  schStsA,
  assignedTo,
  actionType,
  existingCount
) => {
  const x = `${kId}.schTime`
  const y = `${kId}.${actionType}`
  // const y = {
  //   [x]: newCt,
  //   [x]: newCt,

  //   assignedTo,
  // }
  const z = `${actionType}`
  console.log('xo xo xo 1', actionType, y)
  try {
    await updateDoc(doc(db, `${orgId}_leads_sch`, uid), {
      [x]: newCt,
      [y]: increment(1),
      assignedTo,
    })
  } catch (error) {
    console.log('xo xo xo error', error)
  }
}
export const updateMoreDetails = async (uid, moreDetails, enqueueSnackbar) => {
  try {
    await updateDoc(doc(db, 'phases', uid), {
      moreDetails: {
        ...moreDetails,
        updated: Timestamp.now().toMillis(),
      },
    })
    enqueueSnackbar('Details updated successfully', {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}

export const updatePayment = async (uid, element, enqueueSnackbar) => {
  try {
    await updateDoc(
      doc(db, 'paymentSchedule', uid),
      {
        ...element,
        updated: Timestamp.now().toMillis(),
      },
      { merge: true }
    )
    enqueueSnackbar('Payment updated successfully', {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}

export const updateAdditionalCharges = async (
  uid,
  element,
  enqueueSnackbar
) => {
  try {
    await updateDoc(
      doc(db, 'additionalCharges', uid),
      {
        ...element,
        updated: Timestamp.now().toMillis(),
      },
      { merge: true }
    )
    enqueueSnackbar('Payment updated successfully', {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}
// **********************************************
// deleteF
// **********************************************

export const deleteUser = async (orgId, uid, by, email, myRole) => {
  await deleteDoc(doc(db, 'users', uid))
  return await addUserLog(orgId, {
    s: 's',
    type: 'deleteRole',
    subtype: 'deleteRole',
    txt: `Employee ${email} as ${myRole} is deleted`,
    by,
  })
}

export const deleteAsset = async (orgId, uid, by, email, myRole) => {
  await deleteDoc(doc(db, `${orgId}_project_docs`, uid))
  // return await addUserLog({
  //   s: 's',
  //   type: 'deleteRole',
  //   subtype: 'deleteRole',
  //   txt: `Employee ${email} as ${myRole} is deleted`,
  //   by,
  // })
}
export const deleteBankAccount = async (
  orgId,
  uid,
  by,
  email,
  myRole,
  enqueueSnackbar
) => {
  try {
    await deleteDoc(doc(db, `${orgId}_BankDetails`, uid))
    enqueueSnackbar('Bank Acount deleted successfully', {
      variant: 'success',
    })
  } catch (error) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }

  // return await addUserLog({
  //   s: 's',
  //   type: 'deleteRole',
  //   subtype: 'deleteRole',
  //   txt: `Employee ${email} as ${myRole} is deleted`,
  //   by,
  // })
}

export const deletePayment = async (uid, enqueueSnackbar) => {
  try {
    await deleteDoc(doc(db, 'paymentSchedule', uid))

    enqueueSnackbar('Payment deleted successfully', {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}

export const deleteAdditionalCharge = async (uid, enqueueSnackbar) => {
  try {
    await deleteDoc(doc(db, 'additionalCharges', uid))

    enqueueSnackbar('Payment deleted successfully', {
      variant: 'success',
    })
  } catch (e) {
    enqueueSnackbar(e.message, {
      variant: 'error',
    })
  }
}

export const deleteSchLog = async (
  orgId,
  uid,
  kId,
  newStat,
  schStsA,
  schStsMA
) => {
  await updateDoc(doc(db, `${orgId}_leads_sch`, uid), {
    staA: schStsA,
    staDA: schStsMA,
    [kId]: deleteField(),
  })
}

/// **********************************************
// Manipulators
// **********************************************

export const addUnitComputedValues = async (
  c_name,
  docId,
  value,
  area,
  unitCount
) => {
  const yo = {
    totalValue: increment(value),
    totalArea: increment(area),
    totalUnitCount: increment(unitCount),
    availableCount: increment(unitCount),
  }
  try {
    const washingtonRef = doc(db, c_name, docId)

    await updateDoc(washingtonRef, yo)
  } catch (error) {
    await setDoc(doc(db, c_name, docId), yo)
  }
  return
}
