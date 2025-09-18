import { useAuth } from '../context/AuthContext';

export default function TestPage() {
  const { user, loading, signOut } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <button onClick={signOut}>Sign Out</button>
        </>
      ) : (
        <p>No user logged in</p>
      )}
    </div>
  );
}
