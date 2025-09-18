import { useAuth } from '../context/AuthContext';


export default function DashboardHeader() {
  const { user, signOut, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      {user ? (
        <>
          <span>{user.email}</span>
          <button onClick={signOut}>Logout</button>
        </>
      ) : (
        <a href="/auth/login">Login</a>
      )}
    </div>
  );
}
