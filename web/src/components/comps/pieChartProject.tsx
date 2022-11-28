import { useState, useEffect } from 'react'
import HeadNavBar from '../HeadNavBar/HeadNavBar'
import DummyBodyLayout from '../DummyBodyLayout/DummyBodyLayout'
import HeadSideBar from '../HeadSideBar/HeadSideBar'
import SiderForm from '../SiderForm/SiderForm'
import ProjectsMHomeBody from '../ProjectsMHomeBody/ProjectsMHomeBody'
import HeadSideBarDetailView from 'src/components/HeadDetailSideBar'
import { MetaTags } from '@redwoodjs/web'
import { getAllProjects } from 'src/context/dbQueryFirebase'
// import { ResponsiveBar } from '@nivo/bar'
import { EyeIcon, PencilIcon } from '@heroicons/react/outline'
import { Link, routes } from '@redwoodjs/router'
// import { ResponsivePie } from '@nivo/pie'
import { useAuth } from 'src/context/firebase-auth-context'

const PieChartProject = ({ reportPayload }) => {
  const { user } = useAuth()

  const { orgId } = user
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false)
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false)
  const [project, setProject] = useState({})
  const handleNewProjectClose = () => setIsNewProjectOpen(false)
  const handleEditProjectClose = () => setIsEditProjectOpen(false)
  const [projects, setProjects] = useState([])
  const [viewable, setViewable] = useState('Home')

  const getProjects = async () => {
    const unsubscribe = getAllProjects(
      orgId,
      (querySnapshot) => {
        const projects = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setProjects(projects)
      },
      () => setProjects([])
    )
    return unsubscribe
  }

  let data = [
    {
      id: 'Sold',
      label: 'Sold',
      value: 5,
      color: 'hsl(9, 70%, 50%)',
    },
    {
      id: 'Booked',
      label: 'Booked',
      value: 25,
      color: 'hsl(35, 70%, 50%)',
    },
    {
      id: 'Available',
      label: 'Available',
      value: 85,
      color: 'hsl(9, 70%, 50%)',
    },
    {
      id: 'Hold',
      label: 'Hold',
      value: 10,
      color: 'hsl(202, 70%, 50%)',
    },
  ]

  useEffect(() => {
    console.log('was this changed', reportPayload)
    if (reportPayload?.length > 0) {
      data = reportPayload
      console.log('was this insider changedd', data)
    } else {
      data = [
        {
          id: 'Sold',
          label: 'Sold',
          value: 5,
          color: 'hsl(9, 70%, 50%)',
        },
        {
          id: 'Booked',
          label: 'Booked',
          value: 25,
          color: 'hsl(35, 70%, 50%)',
        },
        {
          id: 'Available',
          label: 'Available',
          value: 85,
          color: 'hsl(9, 70%, 50%)',
        },
        {
          id: 'Hold',
          label: 'Hold',
          value: 10,
          color: 'hsl(202, 70%, 50%)',
        },
      ]
    }
  }, [reportPayload])

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <>
      <ResponsivePie
        data={reportPayload || data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]],
        }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: 'ruby',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'c',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'go',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'python',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'scala',
            },
            id: 'lines',
          },
          {
            match: {
              id: 'lisp',
            },
            id: 'lines',
          },
          {
            match: {
              id: 'elixir',
            },
            id: 'lines',
          },
          {
            match: {
              id: 'javascript',
            },
            id: 'lines',
          },
        ]}
        motionConfig="slow"
        transitionMode="innerRadius"
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
      />
    </>
  )
}

export default PieChartProject
