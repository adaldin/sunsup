// Context
import { useAuth } from "../../context/authContext";
// Components
import Login from "../../components/login/Login.js";
import UserProfile from "../../components/userProfile/UserProfile.js";

function Profile() {
  //******CONTEXT*/
  const { user } = useAuth();
  return (
    <>
      {!user ? (
        <div>
          <Login />
        </div>
      ) : (
        <UserProfile />
      )}
    </>
  );
}

export default Profile;
