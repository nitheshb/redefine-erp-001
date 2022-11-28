/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState, useCallback } from 'react'

import {
  Form,
  Label,
  EmailField,
  PasswordField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'

import Loader from 'src/components/Loader/Loader'
import { useAuth } from 'src/context/firebase-auth-context'
import { navigateBasedOnUser } from 'src/util/userflow'
interface UserInfo {
  email: string
  password: string
}

const LoginPage = () => {
  const [loginError, setloginError] = useState(false)
  const [passwordResetMode, setPasswordResetMode] = useState(false)
  const [loginErrorMsg, setloginErrorMsg] = useState('')
  const [loader, setloader] = useState(false)

  const { login, isAuthenticated, user, forgotPassword } = useAuth()

  const navigate = useCallback(async () =>
    // isAuthenticated && user?.uid && (await navigateBasedOnUser(user?.uid)),
    [isAuthenticated, user?.uid]
  )

  useEffect(() => {
    if (user?.uid) {
      navigateBasedOnUser(user)
      setloader(false)
    }
    navigate()
  }, [isAuthenticated, navigate, user?.uid])

  const onSubmit = async (data: UserInfo) => {
    setloader(true)

    setloginError(false)
    setloginErrorMsg('')
    const { email, password } = data

    try {
      if (passwordResetMode) {
        try {
          await forgotPassword(email)
          setloginError(true)
          setloginErrorMsg('Please check your inbox for magic reset link...!')
          setloader(false)
          return
        } catch (error) {
          setloginError(true)
          console.log('password reset error ', error)
          const { code, message, name } = error
          if (code === 'auth/user-not-found') {
            setloginErrorMsg('Email Id not registered')
          } else {
            setloginErrorMsg('Contact Site Admin')
          }
          setloader(false)
          console.log(
            'error is message ',
            code,
            message,
            name,
            code === undefined
          )
          return
        }
      }

      const res: any = await login(email, password)

      // after login success user effect will trigger after setting up local with role values
      if (res?.user?.accessToken) {
        // const userData = await getUser(res.user.uid)
        // await navigateBasedOnUser(userData)
      } else {
        setloginError(true)
        setloginErrorMsg('Something went wrong')
      }
    } catch (error) {
      console.log('error is ', error)
      const { code, message, name } = error
      console.log('error is message ', code, message, name, code === undefined)
      setloginError(true)
      setloader(false)
      if (code === undefined) {
        setloginErrorMsg('Please try again')
      } else if (code === 'auth/wrong-password') {
        setloginErrorMsg('Invalid Username/Password')
      } else {
        setloginErrorMsg('Contact Admin')
      }
    }
  }

  useEffect(() => {
    setloginError(false)
    setloginErrorMsg('')
  }, [passwordResetMode])

  return (
    <>
      <div className="flex justify-between min-h-screen font-sans">
        <div
          className="relative hidden w-3/5 text-orange-500 bg-red-200 bg-center bg-cover lg:block"
          style={{
            backgroundImage: "url('/img/hero.png')",
            backgroundColor: '#091225',
          }}
        >
          <div className="absolute flex justify-center w-full bottom-20">
            <div className="max-w-md text-center">
              <span className="text-3xl font-bold leading-loose text-white">
                Control Bussiness
              </span>
              <p className="font-light leading-7 text-gray-400">
                Redefine Erp is the most comprehensive field service & asset
                managament platform with combining flexibility.
              </p>
              <div className="flex items-center justify-center pt-8 space-x-6">
                <button className="rounded-full focus:ring focus:ring-orange-500 focus:outline-none">
                  {/* <CircleLeftIcon /> */}
                </button>
                <button className="rounded-full focus:ring focus:ring-orange-500 focus:outline-none">
                  {/* <CircleRightIcon /> */}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 max-w-2xl mx-auto">
          <div className="flex flex-col px-8 pt-10 lg:px-14 xl:px-24">
            {/* <LogoIcon className="self-center w-32 md:self-end" /> */}

            <div className="pt-36 pb-6">
              <h1 className="text-[28px] font-bold leading-loose tracking-wide whitespace-nowrap text-center">
                {passwordResetMode ? 'Password Reset' : 'Account Login'}
              </h1>

              {/* <div className="flex items-center justify-between pt-6">
                <hr className="w-full border-gray-400" />
                <span className="px-4 font-light tracking-wider text-gray-500">
                  or
                </span>
                <hr className="w-full border-gray-400" />
              </div> */}

              <Form onSubmit={onSubmit} className="mt-10">
                {loginError && (
                  <div className="flex  items-center pt-1 mb-2 text-red-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-x-circle"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                    <p className="text-xs ml-1">{loginErrorMsg}</p>
                  </div>
                )}
                <Label
                  name="Email Address"
                  className="label font-regular text-sm"
                  errorClassName="label font-regular text-sm"
                />
                <EmailField
                  name="email"
                  className=" w-full px-4 py-2 rounded-sm b-order-gray-300 wborder duration-300 w-fulltransition focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 flex items-center w-full mt-2 overflow-hidden transition-all border rounded-sm border-gray-400  focus-within:shadow-lg focus-within:border-orange-500"
                  errorClassName=" w-full px-4 py-2 rounded-sm b-order-gray-300 wborder duration-300 w-fulltransition focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 flex items-center w-full mt-2 overflow-hidden transition-all border rounded-sm border-gray-400  focus-within:shadow-lg focus-within:border-orange-500"
                  validation={{ required: true }}
                />
                <FieldError
                  name="email"
                  className="error-message text-red-700 text-xs"
                />
                {!passwordResetMode && (
                  <div className="mt-2">
                    <Label
                      name="password"
                      className="label font-regular text-sm"
                      errorClassName="label font-regular text-sm"
                    />
                    <PasswordField
                      name="password"
                      className=" w-full px-4 py-2 rounded-sm b-order-gray-300 wborder duration-300 w-fulltransition focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 flex items-center w-full mt-2 overflow-hidden transition-all border rounded-sm border-gray-400  focus-within:shadow-lg focus-within:border-orange-500"
                      errorClassName=" w-full px-4 py-2 rounded-sm b-order-gray-300 wborder duration-300 w-fulltransition focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 flex items-center w-full mt-2 overflow-hidden transition-all border rounded-sm border-gray-400  focus-within:shadow-lg focus-within:border-orange-500 bg-transparent border border-red-400 "
                      validation={{
                        required: !passwordResetMode,
                      }}
                    />

                    <FieldError
                      name="password"
                      className="error-message text-red-700 text-xs"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="remember"
                      id="remember"
                      className="w-4 h-4 text-orange-500 bg-white border border-gray-400 rounded focus:outline-none focus:ring-orange-500"
                    />
                    <label
                      htmlFor="remember"
                      className="pl-2 font-light text-gray-900  text-sm"
                    >
                      Remember me
                    </label>
                  </div>
                  <section
                    onClick={() => setPasswordResetMode(!passwordResetMode)}
                  >
                    <a
                      href="#"
                      className=" text-stone-900 hover:text-stone-900 text-sm"
                    >
                      {' '}
                      {!passwordResetMode ? 'Forgot password' : 'Login'}
                    </a>
                  </section>
                </div>

                <Submit
                  className="mt-16 w-full px-6 py-3 text-white
                  rounded-sm shadow-lg transition ease-in-out duration-150 "
                  style={{ backgroundColor: '#091225' }}
                  disabled={loader}
                >
                  {loader && <Loader texColor="text-white" />}
                  {passwordResetMode ? 'Send Password Reset Email' : 'Log in'}
                </Submit>
                <div className="my-[4%] md:hidden lg:hidden">
                  <h1 className="text-center text-blue-900 font-semibold text-[1.5rem] ">
                    Control Bussiness
                  </h1>
                  <p className="text-center  text-gray-500 font-semibold text-sm ">
                    Redefine Erp is the most comprehensive field service & asset
                    managament platform with combining flexibility.
                  </p>
                </div>
              </Form>
              {/*
              <div className="pt-4 ">
                <div className="font-light text-center text-gray-500 ">
                  <span className=" font-sm">Not registered yet?</span>
                  <a
                    href="#"
                    className="font-normal text-sm text-stone-900 hover:text-stone-900 ml-2"
                  >
                    Create an Account
                  </a>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
