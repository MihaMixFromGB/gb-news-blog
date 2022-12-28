import { AuthProvider } from './hooks/useAuth';
// import { SocketProvider } from './hooks/useSocket';
import { Header } from './components';
import CustomRoutes from './router';

export function App() {
  return (
    <AuthProvider>
      {/* <SocketProvider> */}
      <Header />
      <CustomRoutes />
      {/* </SocketProvider> */}
    </AuthProvider>
  );
}

export default App;
