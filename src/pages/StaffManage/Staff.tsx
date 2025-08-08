import { useState } from "react";

// Available roles
const roles = ["Admin", "Manager", "Marketing", "Support"];

// Sample static data with image
const initialStaffList = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@store.com",
    role: "Admin",
    image: "https://teneo-website.imgix.net/2018/11/Tim-Burt-Headshot.jpg?auto=format&fit=crop&h=440&ixlib=php-4.1.0&w=440&s=fae09cfd64291e1cdb1779d359fbd56e",
    width: 440,
    height: 440,
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@store.com",
    role: "Manager",
    image: "https://teneo-website.imgix.net/2018/11/Tim-Burt-Headshot.jpg?auto=format&fit=crop&h=440&ixlib=php-4.1.0&w=440&s=fae09cfd64291e1cdb1779d359fbd56e",
    width: 440,
    height: 440,
  },
  {
    id: 3,
    name: "Charlie Lee",
    email: "charlie@store.com",
    role: "Support",
    image: "https://teneo-website.imgix.net/2018/11/Tim-Burt-Headshot.jpg?auto=format&fit=crop&h=440&ixlib=php-4.1.0&w=440&s=fae09cfd64291e1cdb1779d359fbd56e",
    width: 440,
    height: 440,
  },
];

const Staff = () => {
  const [staffList] = useState(initialStaffList);

  // Group staff by role
  const groupedByRole = roles.map((role) => ({
    role,
    members: staffList.filter((s) => s.role === role),
  }));

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Staff List by Role</h2>

      {groupedByRole.map(({ role, members }) => (
        <div key={role} className="mb-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">{role}s</h3>
          {members.length === 0 ? (
            <p className="text-sm text-gray-500">No {role.toLowerCase()}s enrolled yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {members.map((staff, index) => (
                <div
                  key={staff.id}
                  className="bg-white border rounded-lg overflow-hidden shadow hover:shadow-md transition"
                >
                  <div className="p-4">
                    <img
                      src={staff.image}
                      alt={staff.name}
                      width={staff.width}
                      height={staff.height}
                      loading="eager"
                      fetchPriority={index === 0 ? "high" : "auto"}

                      className="w-full h-48 object-cover rounded-md"
                    />
                  </div>
                  <div className="px-4 pb-4">
                    <h4 className="font-semibold text-lg">{staff.name}</h4>
                    <p className="text-sm text-gray-600">{staff.email}</p>
                    <p className="text-xs text-gray-500 mt-1">{staff.role}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Staff;
