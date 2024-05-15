import AppRouter from "@router/AppRouter";
import AuthProvider from '@context/AuthContext';
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <>
        <AuthProvider>
            <SnackbarProvider />
            <AppRouter />
        </AuthProvider>
    </>
  )
}

export default App
