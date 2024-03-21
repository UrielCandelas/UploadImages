
import AppProvider from './src/context/AppContext';

import AppContent from './src/pages/AppContent';

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}


