import { getUser } from "../../../hooks";

export default async function Page() {
  const user = await getUser();

  return (
    <div className="w-screen p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-600 mt-5">Welcome</h1>
      <h2 className="text-xl font-bold mb-4 text-gray-600 mt-5">
        Your Personal Details
      </h2>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-700">Name</label>
          <div className="mt-1 text-gray-900">{user.name}</div>
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-700">Personal Email</label>
          <div className="mt-1 text-gray-900">{user.name}@gmail.com</div>
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-700">Mobile Number</label>
          <div className="mt-1 text-gray-900">+91 {user.number}</div>
        </div>
      </div>
    </div>
  );
}



