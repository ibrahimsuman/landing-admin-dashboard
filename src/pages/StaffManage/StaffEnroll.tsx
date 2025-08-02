import React from "react";
import { useForm } from "react-hook-form";

type Staff = {
  id: number;
  name: string;
  email: string;
  role: string;
  image?: string;
};

type StaffEnrollProps = {
  onEnroll: (staff: Staff) => void;
};

const roles = ["Admin", "Manager", "Support", "Delivery"];

const StaffEnroll: React.FC<StaffEnrollProps> = ({ onEnroll }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Staff, "id">>();

  const onSubmit = (data: Omit<Staff, "id">) => {
    const newStaff: Staff = {
      ...data,
      id: Date.now(),
    };
    onEnroll(newStaff);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl mx-auto space-y-5"
    >
      <h2 className="text-xl font-semibold text-gray-800">Enroll New Staff</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Jane Doe"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email format",
            },
          })}
          placeholder="jane@example.com"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Role
        </label>
        <select
          {...register("role", { required: true })}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image URL
        </label>
        <input
          type="url"
          {...register("image")}
          placeholder="https://example.com/image.jpg"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-semibold transition"
        >
          Enroll Staff
        </button>
      </div>
    </form>
  );
};

export default StaffEnroll;
