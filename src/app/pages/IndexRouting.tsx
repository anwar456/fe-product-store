import AppLayout from '@app/modules/layouts/AppLayout/AppLayout'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const HomePage = React.lazy(() => import(`@app/pages/Home/HomePage`))
const ProfilePage = React.lazy(() => import(`@app/pages/Profile/ProfilePage`))
const SavingPage = React.lazy(() => import(`@app/pages/Saving/SavingPage`))

export default function IndexRouting() {
  return (
    <Routes>
      <Route path="" element={<AppLayout />}>
        <Route
          path="home/*"
          element={
            <React.Suspense>
              <HomePage />
            </React.Suspense>
          }
        />
        <Route
          path="profile/*"
          element={
            <React.Suspense>
              <ProfilePage />
            </React.Suspense>
          }
        />
        <Route
          path="saving/*"
          element={
            <React.Suspense>
              <SavingPage />
            </React.Suspense>
          }
        />
        <Route
          path="*"
          element={
            <>
              <h3>ERROR 404</h3>
            </>
          }
        ></Route>
      </Route>
    </Routes>
  )
}
