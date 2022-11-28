import React from 'react'

import {
  ChevronDownIcon,
  PlusIcon,
  DotsVerticalIcon,
  ChatAlt2Icon,
  PaperClipIcon,
} from '@heroicons/react/outline'
import { PhoneIcon, MailIcon, UserIcon } from '@heroicons/react/outline'
import { Draggable } from 'react-beautiful-dnd'

function CardItem({ data, index }) {
  return (
    <Draggable index={index} draggableId={data.id.toString()}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white max-w-[200px] rounded-lg p-3 mb-1 mt-0 last:mb-0  cursor-pointer bg-opacity-90 group hover:bg-opacity-100 hover:bg-red-200 "
        >
          {/* <label
            className={`bg-gradient-to-r
              px-2 py-1 rounded text-white text-sm
              ${
                data.priority === 0
                  ? 'from-blue-600 to-blue-400'
                  : data.priority === 1
                  ? 'from-green-300 to-green-400'
                  : 'from-red-400 to-red-400'
              }
              `}
          >
            {data.priority === 0
              ? 'Low Priority'
              : data.priority === 1
              ? 'Medium Priority'
              : 'High Priority'}
          </label> */}
          <span
            className={`items-center h-6 px-3 py-1 text-xs font-semibold text-white bg-pink-100 rounded-full ${
              data.priority === 0
                ? 'bg-blue-500 '
                : data.priority === 1
                ? 'bg-green-500 '
                : 'bg-red-500 '
            }   ${
              data.priority === 0
                ? 'text-white '
                : data.priority === 1
                ? 'text-white '
                : 'text-white '
            }`}
          >
            {data.project}
          </span>
          <h5 className="text-md mt-3 text-md leading-6 flex">
            <PhoneIcon className="h-4 w-4 mt-1 mr-1" aria-hidden="true" />{' '}
            {data.Mobile.toString().replace(
              /(\d{3})(\d{3})(\d{4})/,
              '$1-$2-$3'
            )}
          </h5>
          <h5 className="text-sm text-md leading-6 flex">
            {' '}
            <UserIcon className="h-4 w-4 mt-1 mr-1" aria-hidden="true" />{' '}
            {data.Name}
          </h5>
          <h5 className="text-sm mb-3 text-md leading-6 flex">
            <MailIcon className="h-4 w-4 mt-1 mr-1" aria-hidden="true" />{' '}
            {data.Email.toLowerCase().replaceAll(' ', '')}
          </h5>

          <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-gray-300 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-1 leading-none">Dec 12</span>
            </div>
            <div className="relative flex items-center ml-4">
              <svg
                className="relative w-4 h-4 text-gray-300 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-1 leading-none">{data.chat}</span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default CardItem
