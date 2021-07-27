import React, { useState } from "react";
import { EyeIcon } from "@heroicons/react/solid";
import { EyeOffIcon } from "@heroicons/react/solid";

function PasswordField<T>({
  formData,
  name,
  placeholder,
  handleFormDataChange,
}: {
  formData: T;
  name: keyof T;
  placeholder: string;
  handleFormDataChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <div className="relative">
      <input
        type={isPasswordVisible ? "text" : "password"}
        value={formData[name] as any}
        name={name as string}
        placeholder={placeholder}
        onChange={handleFormDataChange}
        className="focus:ring-2 focus:ring-bg-blue-400 bg-gray-100 mb-3 w-full rounded-lg px-4 py-3 outline-none"
      />
      {isPasswordVisible ? (
        <EyeOffIcon
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          className="h-10 w-10 text-blue-600 absolute right-1 top-1 hover:bg-blue-100 rounded-full cursor-pointer p-2"
        />
      ) : (
        <EyeIcon
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          className="h-10 w-10 text-blue-600 absolute right-1 top-1 hover:bg-blue-100 rounded-full cursor-pointer p-2"
        />
      )}
    </div>
  );
}

export default PasswordField;
