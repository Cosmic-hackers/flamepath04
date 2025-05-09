import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface User {
  id: string;
  accessibleResources: string[];
  notifications: { type: string; resourceId: string; read: boolean }[];
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]);

  const handleAllowAccess = (userId: string, resourceId: string) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          accessibleResources: [...(user.accessibleResources || []), resourceId],
          notifications: [
            ...(user.notifications || []),
            { type: 'new_resource', resourceId, read: false }
          ]
        }
      }
      return user
    })
    setUsers(updatedUsers)
    localStorage.setItem('users', JSON.stringify(updatedUsers))
    toast({
      title: "Access Granted",
      description: `Resource access has been granted to the user.`,
    })
  }

  return (
    <div>
      {/* Rest of the app component */}
    </div>
  );
};

export default App;
