import { useAuth } from "../../utils/contexts/token";
import MainLayout from "../../layouts/main-layout";
import { useEffect, useRef, useState } from "react";
import { UserProfile } from "../../utils/apis/users/type";
import {
  deleteUser,
  getUserProfile,
  updateUserProfile,
} from "../../utils/apis/users/api";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";

const EditProfile = () => {
  const { token, addNotification } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const [formState, setFormState] = useState<
    Partial<UserProfile & { password?: string }>
  >({
    full_name: "",
    email: "",
    profile_picture: "",
    address: "",
    phone_number: "",
    password: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUserProfile(profile);
        setFormState({
          full_name: profile.full_name,
          email: profile.email,
          profile_picture: profile.profile_picture,
          address: profile.address,
          phone_number: profile.phone_number,
        });
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedProfile = await updateUserProfile(formState);
      setUserProfile(updatedProfile);
      addNotification("user profile has been updated!", "success");
    } catch (error) {
      console.error("Failed to update user profile:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser();
      addNotification("success deleted acount!", "success");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to delete user account:", error);
    }
  };

  return (
    <MainLayout>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="w-1/3 p-4 bg-white rounded-lg shadow-lg"
          >
            <h2 className="mb-2 text-xl font-bold">Confirm delete!</h2>
            <p className="mb-4">Are you sure to delete acount <strong>{userProfile?.full_name}</strong>.</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleDelete}
                className="px-4 py-2 font-semibold text-white bg-rose-700 rounded shadow-md hover:bg-rose-600"
              >
                Yes
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 font-semibold text-white bg-gray-500 rounded shadow-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <section className="mx-auto sm:mt-6 lg:mt-8 mt-12 max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow border rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <img
                    src={userProfile?.profile_picture}
                    alt={userProfile?.full_name}
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  />
                  <h1 className="text-xl font-bold">
                    {userProfile?.full_name}
                  </h1>
                  <p className="text-gray-700">{userProfile?.email}</p>
                  <div className="mt-4 flex flex-wrap gap-4 justify-center">
                    <button
                      onClick={openModal}
                      // onClick={handleDelete}
                      className="bg-rose-800 hover:bg-rose-700 text-white py-2 px-3 rounded"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4 sm:col-span-9">
              <div className="bg-white shadow border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Edit profile</h2>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        type="text"
                        placeholder="Full Name"
                        className="w-full"
                        value={formState.full_name || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="w-full"
                        value={formState.email || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        type="text"
                        placeholder="Address"
                        className="w-full"
                        value={formState.address || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone_number">Phone Number</Label>
                      <Input
                        id="phone_number"
                        type="text"
                        placeholder="Phone Number"
                        className="w-full"
                        value={formState.phone_number || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="profile_picture">Profile Picture</Label>
                      <Input
                        id="profile_picture"
                        type="text"
                        placeholder="Profile Picture URL"
                        className="w-full"
                        value={formState.profile_picture || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="w-full"
                        value={formState.password || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="bg-stone-400 hover:bg-stone-500 text-white py-2 px-4 rounded"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default EditProfile;
