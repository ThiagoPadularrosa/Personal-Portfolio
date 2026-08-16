import AppRouter from './router/AppRouter.jsx';
import useDocumentTitle from './hooks/usePageTitle.js';
 
export default  function App() {
  useDocumentTitle();
  return (
      <AppRouter />
  );
}

