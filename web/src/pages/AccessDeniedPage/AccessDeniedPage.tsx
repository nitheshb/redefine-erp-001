import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'
import { useAuth } from 'src/context/firebase-auth-context'
import { logout as logoutAction } from 'src/state/actions/user'

export default () => {
  const { logout } = useAuth()
  const dispatch = useDispatch()
  const onLogout = async () => {
    await logout()
    dispatch(logoutAction())
  }
  return (
    <main>
      <style
        dangerouslySetInnerHTML={{
          __html: `
              html, body {
                margin: 0;
              }
              html * {
                box-sizing: border-box;
              }
              main {
                display: flex;
                align-items: center;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
                text-align: center;
                background-color: #E2E8F0;
                height: 100vh;
              }
              section {
                background-color: white;
                border-radius: 0.25rem;
                width: 50rem;
                padding: 1rem;
                margin: 0 auto;
                box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
              }
              h1 {
                font-size: 2rem;
                margin: 0;
                font-weight: 500;
                line-height: 1;
                color: #2D3748;
              }
              p {
                margin: 1rem 0;
              }
            `,
        }}
      />
      <section>
        <h1>
          <span>Access denied: invalid role</span>
        </h1>
        <p>
          Kindly contact with customer support. Exit the application by clicking
          logout
        </p>
        <Button variant="contained" onClick={onLogout}>
          Logout
        </Button>
      </section>
    </main>
  )
}
