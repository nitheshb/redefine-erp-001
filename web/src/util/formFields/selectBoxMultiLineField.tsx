/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import createClass from 'create-react-class'
import PropTypes from 'prop-types'
import Select from 'react-select'
import Gravatar from 'react-gravatar'

const USERS = [
  { value: 'add new', label: 'Add New', email: 'add New' },
  { value: 'John Smith', label: 'John Smith', email: 'john@smith.com' },
  { value: 'Merry Jane', label: 'Merry Jane', email: 'merry@jane.com' },
  { value: 'Stan Hoper', label: 'Stan Hoper', email: 'stan@hoper.com' },
]
const GRAVATAR_SIZE = 15

const stringOrNode = PropTypes.oneOfType([PropTypes.string, PropTypes.node])

const GravatarOption = createClass({
  propTypes: {
    children: PropTypes.node,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    isFocused: PropTypes.bool,
    isSelected: PropTypes.bool,
    onFocus: PropTypes.func,
    onSelect: PropTypes.func,
    option: PropTypes.object.isRequired,
  },
  handleMouseDown(event) {
    event.preventDefault()
    event.stopPropagation()
    this.props.onSelect(this.props.option, event)
  },
  handleMouseEnter(event) {
    this.props.onFocus(this.props.option, event)
  },
  handleMouseMove(event) {
    if (this.props.isFocused) return
    this.props.onFocus(this.props.option, event)
  },
  render() {
    const gravatarStyle = {
      borderRadius: 3,
      display: 'inline-block',
      marginRight: 10,
      position: 'relative',
      top: -2,
      verticalAlign: 'middle',
    }
    console.log('returned values are', this.props.children)
    return (
      <p
        className={this.props.className}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseMove}
        title={this.props.option.title}
      >
        <Gravatar
          email={this.props.option.email}
          size={GRAVATAR_SIZE}
          style={gravatarStyle}
        />
        <span>hello</span>
        {this.props.children}
      </p>
    )
  },
})

const MyOption = (props) => {
  const { data, innerProps, innerRef } = props

  return (
    // <article ref={innerRef} {...innerProps} className="custom-option">
    //   <h4>{props.data.name}</h4>
    //   <div className="sub">
    //     <h4>{props.data.name}</h4> {props.data.email}{' '}
    //   </div>
    // </article>
    <>
      {data?.value === 'addNewOption' && (
        <div
          ref={innerRef}
          {...innerProps}
          style={{ display: 'fle' }}
          className="hover:bg-blue-400  p-2 "
        >
          <div>+{data?.label}</div>
        </div>
      )}
      {data?.value != 'addNewOption' && (
        <div
          ref={innerRef}
          {...innerProps}
          style={{ display: 'fle' }}
          className="hover:bg-blue-400  p-2 "
        >
          <div>{data?.label}</div>
          <div style={{ marginLeft: '0px', color: '#ccc' }}>
            {data?.aliasName}
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ marginLeft: '0px', color: '#ccc' }}>
              {data?.accountNo}
            </div>
            <div style={{ marginLeft: '10px', color: '#ccc' }}>
              {data?.ifsccode}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
const GravatarValue = createClass({
  propTypes: {
    children: PropTypes.node,
    placeholder: stringOrNode,
    value: PropTypes.object,
  },
  render() {
    const gravatarStyle = {
      borderRadius: 3,
      display: 'inline-block',
      marginRight: 10,
      position: 'relative',
      top: -2,
      verticalAlign: 'middle',
    }
    return (
      <div className="Select-value" title={this.props.value.title}>
        <span className="Select-value-label">
          <Gravatar
            email={this.props.value.email}
            size={GRAVATAR_SIZE}
            style={gravatarStyle}
          />
          hrll {this.props.children}
        </span>
      </div>
    )
  },
})

// const MultiSelectMultiLineField = createClass({
//   propTypes: {
//     hint: PropTypes.string,
//     label: PropTypes.string,
//   },
//   getInitialState() {
//     return {}
//   },
//   setValue(value) {
//     this.setState({ value })
//   },
//   render() {
//     const placeholder = <span>&#9786; Select User</span>

//     return (
//       <div className="section">
//         <h3 className="section-heading">
//           {this.props.label}{' '}
//           <a href="https://github.com/JedWatson/react-select/tree/v1.x/examples/src/components/CustomComponents.js">
//             (Source)
//           </a>
//         </h3>
//         <Select
//           arrowRenderer={arrowRenderer}
//           onChange={this.setValue}
//           optionComponent={GravatarOption}
//           options={USERS}
//           placeholder={placeholder}
//           value={this.state.value}
//           valueComponent={GravatarValue}
//         />
//         <div className="hint">
//           This example implements custom Option and Value components to render a
//           Gravatar image for each user based on their email. It also
//           demonstrates rendering HTML elements as the placeholder.
//         </div>
//       </div>
//     )
//   },
// })

// function arrowRenderer() {
//   return <span>+</span>
// }

// module.exports = MultiSelectMultiLineField

function arrowRenderer() {
  return <span>+</span>
}
const formatOptionLabel = ({ value, label, customAbbreviation }) => (
  <div style={{ display: 'flex' }}>
    <div>{label}</div>
    <div style={{ marginLeft: '10px', color: '#ccc' }}>
      {customAbbreviation}
    </div>
  </div>
)
export const MultiSelectMultiLineField = ({
  label,
  name,
  setAddNewBankStuff,
  options,
  onChange,
  value,
}) => {
  const placeholder = <span>Select Bank Account</span>
  const defaultValue = (options, value) => {
    return (options ? options.find((option) => option.id === value) : '') || ''
  }
  return (
    <div className="section">
      <label className="label font-regular text-sm mb-2">{label}</label>
      <Select
        name={name}
        arrowRenderer={arrowRenderer}
        onChange={(value) => {
          console.log('changesd on is ', value)
          onChange(value)
        }}
        optionComponent={GravatarOption}
        options={options}
        placeholder={placeholder}
        formatOptionLabel={formatOptionLabel}
        components={{ Option: MyOption }}
        value={defaultValue(options, value)}
        valueComponent={GravatarValue}
        className="text-sm  mt-1"
      />
    </div>
    // <div>
    //   <label className="label font-regular text-sm mb-2">{label}</label>
    //   <Select
    //     name={name}
    //     value={defaultValue(options, value)}
    //     onChange={(value) => {
    //       onChange(value)
    //     }}
    //     options={options}
    //     className="text-sm  mt-1 border-transparent"
    //   />

    // </div>
  )
}
