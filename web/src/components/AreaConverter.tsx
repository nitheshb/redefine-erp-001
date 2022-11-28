import { TextField } from 'src/util/formFields/TextField'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import { areaConversions } from 'src/constants/projects'
import { areaCoverter } from 'src/util/areaConverter'

export const AreaConverter = ({ formik, hideField, fieldName }) => {
  const onConverterAdd = ({
    primary,
    primaryUnit,
    secondary,
    secondaryUnit,
    formik,
  }) => {
    const primaryValue = primary ? areaCoverter(primary, primaryUnit) : 0
    const secondaryValue = secondary
      ? areaCoverter(secondary, secondaryUnit)
      : 0
    const value = primaryValue + secondaryValue
    value && formik.setFieldValue(fieldName, value) && hideField(false)
  }
  return (
    <div className="mt-3 mb-6">
      <label htmlFor="area" className="label font-regular text-sm">
        Add Area
      </label>
      <div className="flex justify-between items-baseline">
        <div className="basis-1/4 mr-2">
          <TextField label="" name="areaTextPrimary" type="text" />
        </div>
        <div className="basis-1/4 mr-2">
          <CustomSelect
            name="areaDropDownPrimary"
            label=""
            className="input"
            onChange={({ value }) => {
              formik.setFieldValue('areaDropDownPrimary', value)
            }}
            value={formik.values.areaDropDownPrimary}
            options={areaConversions}
          />
        </div>
        <div className="basis-1/4 mr-2">
          <TextField label="" name="areaTextSecondary" type="text" />
        </div>
        <div className="basis-1/4">
          <CustomSelect
            name="areaDropdownSecondary"
            label=""
            className="input"
            onChange={({ value }) => {
              formik.setFieldValue('areaDropdownSecondary', value)
            }}
            value={formik.values.areaDropdownSecondary}
            options={areaConversions}
          />
        </div>
      </div>
      <button
        className="mb-2 md:mb-0 float-right bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500"
        type="button"
        onClick={() =>
          onConverterAdd({
            primary: formik.values.areaTextPrimary,
            primaryUnit: formik.values.areaDropDownPrimary,
            secondary: formik.values.areaTextSecondary,
            secondaryUnit: formik.values.areaDropdownSecondary,
            formik,
          })
        }
      >
        Add
      </button>
    </div>
  )
}
