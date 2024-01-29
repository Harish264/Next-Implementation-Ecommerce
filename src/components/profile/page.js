// index.js (or your page component)
import { getUserData } from "@/helpers/authHelper";
import Navbar from "../components/Navbar";

export async function getServerSideProps(context) {
  const userData = await getUserData(); // Assuming getUserData performs server-side fetching
  return {
    props: {
      userData,
    },
  };
}

const UserProfile = ({ userData }) => {
  return (
    <>
      <Navbar userData={userData} />
      {/* Rest of your page content */}
    </>
  );
};

export default UserProfile;
