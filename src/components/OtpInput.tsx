import React, { useRef } from 'react';

interface OtpInputProps {
  value: string[];
  onChange: (index: number, value: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ value, onChange }) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newValue = value.slice(-1);
    
    if (/^\d$/.test(newValue)) { 
        //@ts-ignore
      const newOtp = [...value];
      newOtp[index] = newValue;
      onChange(index, newValue);
      
      if (newValue) {
        inputsRef.current[index + 1]?.focus();
      }
    } else if (value === '') {
      onChange(index, '');
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex space-x-2">
      {value.map((val, index) => (
        <input
          key={index}
          //@ts-ignore
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          value={val}
          maxLength={1}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-12 h-12 text-center border border-gray-300 rounded-md bg-white text-gray-900 text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>
  );
};

export default OtpInput;
