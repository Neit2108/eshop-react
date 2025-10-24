import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { Router } from './Router.tsx'
import { store } from './store/store.ts'
import { initializeAuth } from './store/slices/authSlice'

// Khởi tạo xác thực trước khi render router
store.dispatch(initializeAuth() as never)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Router/>
    </Provider>
  </StrictMode>,
)
