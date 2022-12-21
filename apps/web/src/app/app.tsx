import { AuthProvider } from './hooks/useAuth';
import { Header } from './components';
import CustomRoutes from './router';

export function App() {
  return (
    <AuthProvider>
      <Header />
      <CustomRoutes />
    </AuthProvider>
  );
}

export default App;
