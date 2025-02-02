"use client";

import React, { useEffect, useState } from "react";
import CreatableSelect from 'react-select/creatable';// Correct import
import Select from "react-select";

// Predefined proficiency options
const proficiencyOptions = [
  { value: "Web Development", label: "Web Development" },
  { value: "Data Science", label: "Data Science" },
  { value: "Machine Learning", label: "Machine Learning" },
  { value: "Cybersecurity", label: "Cybersecurity" },
  { value: "Cloud Computing", label: "Cloud Computing" },
  { value: "Blockchain", label: "Blockchain" },
];

const Proficiencies = ({ onChange, selectedProficiencies }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); 
  }, []);

  if (!isMounted) return null;

 
  const handleChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    onChange(selectedOptions);
  };

  const handleCreate = (inputValue) => {
    const newOption = { value: inputValue.toLowerCase(), label: inputValue };
    onChange([...selectedProficiencies, newOption]);
  };

  return (
    <div className="mt-4">
      <label className="block text-gray-700 font-medium mb-2">Proficiencies</label>
      <CreatableSelect
        options={proficiencyOptions}
        isMulti
        className="basic-multi-select text-black"
        classNamePrefix="select"
        value={selectedProficiencies}
        onChange={handleChange}
        onCreateOption={handleCreate} 
        placeholder="Type and press enter to add"
      />
    </div>
  );
};

export default Proficiencies;
