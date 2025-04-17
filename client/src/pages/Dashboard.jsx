import { useState } from "react";

const profiles = [
  {
    id: 1,
    name: "Alice",
    image: "https://via.placeholder.com/150",
    bio: "Software Engineer at ABC Inc.",
    hobbies: "Reading, Hiking, Gaming",
  },
  {
    id: 2,
    name: "Bob",
    image: "https://via.placeholder.com/150",
    bio: "Product Designer at XYZ Ltd.",
    hobbies: "Sketching, Photography",
  },
  {
    id: 3,
    name: "Charlie",
    image: "https://via.placeholder.com/150",
    bio: "Data Scientist at DataCorp.",
    hobbies: "Chess, AI Research",
  },
  {
    id: 4,
    name: "Diana",
    image: "https://via.placeholder.com/150",
    bio: "Marketing Manager at Marketify.",
    hobbies: "Traveling, Blogging",
  },
];

export default function ProfilePage() {
  const [selectedProfile, setSelectedProfile] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      {!selectedProfile ? (
        <div className="grid grid-cols-2 gap-6 mt-10">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
              onClick={() => setSelectedProfile(profile)}
            >
              <img
                src={profile.image}
                alt={profile.name}
                className="w-32 h-32 object-cover rounded-full shadow-lg"
              />
              <p className="mt-2 text-lg font-semibold">{profile.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md mt-10">
          <button
            onClick={() => setSelectedProfile(null)}
            className="text-blue-600 hover:underline mb-4"
          >
            ← Back to profiles
          </button>
          <div className="flex flex-col items-center">
            <img
              src={selectedProfile.image}
              alt={selectedProfile.name}
              className="w-32 h-32 object-cover rounded-full shadow-md"
            />
            <h2 className="text-2xl font-bold mt-4">{selectedProfile.name}</h2>
            <p className="text-gray-600 mt-2">{selectedProfile.bio}</p>
            <p className="text-gray-500 mt-1">Hobbies: {selectedProfile.hobbies}</p>
          </div>
        </div>
      )}
    </div>
  );
}
