import { useEffect, useState } from 'react'
import { useParams } from '@redwoodjs/router'
import HeadNavBar from '../../components/HeadNavBar/HeadNavBar'
import DummyBodyLayout from '../../components/DummyBodyLayout/DummyBodyLayout'
import HeadSideBar from '../../components/HeadSideBar/HeadSideBar'
import SiderForm from '../../components/SiderForm/SiderForm'
import ProjectsMHomeBody from '../../components/ProjectsMHomeBody/ProjectsMHomeBody'
import ProjPhaseHome from '../../components/ProjPhaseHome/ProjPhaseHome'
import { getProjectByUid } from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'

const ProjectEditPage = () => {
  const [isAddPhaseOpen, setIsAddPhaseOpen] = useState(false)
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false)
  const [project, setProject] = useState({
    projectName: '',
  })
  const handleAddPhaseOnClose = () => setIsAddPhaseOpen(false)
  const handleEditProjectClose = () => setIsEditProjectOpen(false)
  const { uid } = useParams()
  const { user } = useAuth()

  const { orgId } = user

  const getProjectDetails = async (id) => {
    const unsubscribe = await getProjectByUid(
      orgId,
      id,
      (querySnapshot) => {
        const projects = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setProject(projects[0])
        console.log('set project value is ', projects[0])
      },
      () =>
        setProject({
          projectName: '',
        })
    )
    return unsubscribe
  }
  useEffect(() => {
    getProjectDetails(uid)
  }, [uid])
  return (
    <>
      <div className="flex w-screen h-screen text-gray-700">
        <HeadSideBar />
        <div className="flex flex-col flex-grow">
          <HeadNavBar />
          <div className="flex-grow p-6 overflow-auto  text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
            <div className="flex items-center flex-shrink-0 h-16 px-0  pl-0  ">
              {/* <h1 className="text-lg font-medium">redefine.</h1> */}
              <span className="relative z-10 flex items-center w-auto text-xl  leading-none pl-0">
                PROJECTS
              </span>
              <button
                onClick={() => setIsAddPhaseOpen(true)}
                className="flex items-center justify-center h-10 px-4  bg-gray-200 ml-auto text-sm font-medium rounded hover:bg-gray-300"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span className="ml-2 leading-none">Add Phase</span>
              </button>
            </div>
            {project?.projectName ? (
              <>
                <ProjectsMHomeBody
                  project={project}
                  isEdit
                  onSliderOpen={() => {
                    setIsEditProjectOpen(true)
                  }}
                />
                <ProjPhaseHome
                  projectDetails={project}
                  source="projectManagement"             />
              </>
            ) : (
              <DummyBodyLayout />
            )}
            <SiderForm
              open={isAddPhaseOpen}
              setOpen={handleAddPhaseOnClose}
              title="Add Phase"
              data={{}}
            />
            <SiderForm
              open={isEditProjectOpen}
              setOpen={handleEditProjectClose}
              title="Edit Project"
              data={project}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectEditPage
