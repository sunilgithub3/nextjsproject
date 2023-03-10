import AuthForm from '../auth/auth-form';
import { getSession } from 'next-auth/react';
import { useEffect,useState } from 'react';
import classes from './user-profile.module.css';

function UserProfile() {
  // Redirect away if NOT auth
   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        window.location.href = '/auth';
        
      } else {
        setIsLoading(false);
        
      }
    });
  }, []);

  if (isLoading) {
    return <p className={classes.profile}>Loading...</p>;
  }
  return (
    <section className={classes.profile}>
      <h1>Welcome to User Profile</h1>
     
    </section>
  );
}

export default UserProfile;