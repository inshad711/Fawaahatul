import ProfileSkeletons from "@/components/Skeletons/ProfileSkeletons";
import { userService } from "@/services/userService";
import { Calendar, Mail, Phone, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import ProfileEdit from "./ProfileEdit";

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birthday: string;
}

const Profile = (customer_id: any) => {
  const [refetch, setRefetch] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const getUserData = async () => {
    const response = await userService.getUserDetails(customer_id);
    if (response?.success) {
      setUserData(response?.data);
    }
  };

  useEffect(() => {
    if (customer_id) {
      getUserData();
    }
  }, [customer_id, refetch]);

  if (!userData) {
    return <ProfileSkeletons />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-start gap-10">
        <h2 className="text-2xl tracking-wide font-medium">
          Welcome, {userData?.first_name} {userData?.last_name}
        </h2>
        <ProfileEdit userData={userData} setRefetch={setRefetch} />
      </div>

      <div className="w-full grid grid-cols-2 gap-y-1 lg:w-1/2">
        <div className="py-3 flex items-center gap-1 md:gap-2 px-4 md:px-8 bg-gray-100 text-xs md:text-sm">
          <User size={16} className="text-templateText" />
          First Name
        </div>
        <div className="py-3 px-4 md:px-8 hover:bg-gray-100 text-xs md:text-sm">
          {userData?.first_name || "-"}
        </div>
        <div className="py-3 flex items-center gap-1 md:gap-2 px-4 md:px-8 bg-gray-100 text-xs md:text-sm">
          <User size={16} className="text-templateText" />
          Last Name
        </div>
        <div className="py-3 px-4 md:px-8 hover:bg-gray-100 text-xs md:text-sm">
          {userData?.last_name || "-"}
        </div>
        {/* <div className="py-3 flex items-center gap-1 md:gap-2 p-4 md:px-8 bg-gray-100 text-xs md:text-sm">
          <Calendar size={16} className="text-templateText" />
          Date Of Birth
        </div>
        <div className="py-3 px-4 md:px-8 hover:bg-gray-100 text-xs md:text-sm">
          {userData?.birthday
            ? new Date(userData.birthday).toLocaleDateString("en-GB")
            : "-"}
        </div> */}

        <div className="py-3 flex items-center gap-1 md:gap-2 px-4 md:px-8 bg-gray-100 text-xs md:text-sm">
          <Mail size={16} className="text-templateText" />
          Email
        </div>
        <div className="py-3 px-4 md:px-8 hover:bg-gray-100 text-xs md:text-sm">
          {userData?.email || "-"}
        </div>
        <div className="py-3 flex items-center gap-1 md:gap-2 px-4 md:px-8 bg-gray-100 text-xs md:text-sm">
          <Phone size={16} className="text-templateText" />
          Phone
        </div>
        <div className="py-3 px-4 md:px-8 hover:bg-gray-100 text-xs md:text-sm">
          {userData?.phone || "-"}
        </div>
      </div>
    </div>
  );
};

export default Profile;
