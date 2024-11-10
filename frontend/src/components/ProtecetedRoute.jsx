import { useEffect, useState } from 'react';
import DataProviderHome from '../pages/DataProviderHome';
import ResearcherHome from '../pages/ResearcherHome';

function ProtectedRoute() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Fetch user role from API or context
    const role = 'researcher'/* Fetch user role logic */;
    setUserRole(role);
  }, []);

  if (userRole === 'dataProvider') {
    return <DataProviderHome />;
  } else if (userRole === 'researcher') {
    return <ResearcherHome />;
  } else {
    return <div>Loading...</div>; // Show a loading indicator while role is being determined
  }
}

export default ProtectedRoute;
