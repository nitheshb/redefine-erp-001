import { Dialog } from '@headlessui/react'
import { useState, useEffect } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { InputAdornment, TextField as MuiTextField } from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import Loader from 'src/components/Loader/Loader'
import { TextField } from 'src/util/formFields/TextField'
import { TextAreaField } from 'src/util/formFields/TextAreaField'
import { CustomRadioGroup } from 'src/util/formFields/CustomRadioGroup'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import { MultiSelectMultiLineField } from 'src/util/formFields/selectBoxMultiLineField'
import {
  developmentTypes,
  projectPlans,
  statesList,
} from 'src/constants/projects'
import { AreaConverter } from 'src/components/AreaConverter'

import AddBankDetailsForm from '../addBankDetailsForm'
import ProjPhaseHome from '../ProjPhaseHome/ProjPhaseHome'

const InventoryViewSideForm = ({ title, projectDetails }) => {
  
  const { enqueueSnackbar } = useSnackbar()

  return (
    <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
      <div className="px-4 sm:px-6  z-10 ">
        <Dialog.Title className=" font-semibold text-xl mr-auto ml-3 text-[#053219]">
          {projectDetails?.projectName} Inventory
        </Dialog.Title>
      </div>
      <section className="bg-teal-50">
        <ProjPhaseHome
          projectDetails={projectDetails}
          leadDetailsObj={undefined}
          source={undefined}
          unitDetails={undefined}
        />
      </section>
    </div>
  )
}

export default InventoryViewSideForm
