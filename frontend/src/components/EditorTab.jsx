import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

const EditorTab = ({ activeTab, onTabChange }) => {
  const [tabs, setTabs] = useState([{ name: "Untitled 1" }]);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(activeTab);

  const handleTabClick = (tabName) => {
    onTabChange(tabName);
  };

  const handleAddTab = () => {
    const newTabName = `Untitled ${tabs.length + 1}`;
    setTabs([...tabs, { name: newTabName }]);
    onTabChange(newTabName); // Set newly created tab as active
  };

  const handleRenameTab = (index) => {
    setIsEditing(true);
    setNewName(tabs[index].name);
  };

  const handleRenameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleRenameSubmit = (index) => {
    if (newName.trim() !== "") {
      const updatedTabs = [...tabs];
      updatedTabs[index].name = newName;
      setTabs(updatedTabs);
      onTabChange(newName); // Update active tab if renamed
    }
    setIsEditing(false);
  };

  const handleTabClose = (index) => {
    const updatedTabs = tabs.filter((_, i) => i !== index);
    setTabs(updatedTabs);

    // Set the next available tab as active after deletion
    if (updatedTabs.length > 0) {
      onTabChange(updatedTabs[0].name);
    } else {
      onTabChange(""); // No active tab if all are closed
    }
  };

  return (
    <div className='h-8 shadow-2xl flex flex-row flex-nowrap text-sm items-center space-x-1 overflow-hidden'>
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`flex items-center justify-center px-2 space-x-2 rounded-tr-lg rounded-bl-lg 
            ${activeTab === tab.name ? "bg-contemporary text-white" : "bg-secondary text-overlay"}`}
          onClick={() => handleTabClick(tab.name)}
        >
          {isEditing && activeTab === tab.name ? (
            <input
              type='text'
              value={newName}
              onChange={handleRenameChange}
              onBlur={() => handleRenameSubmit(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRenameSubmit(index);
              }}
              className='bg-transparent outline-none cursor-auto'
              autoFocus
            />
          ) : (
            <span onDoubleClick={() => handleRenameTab(index)}>{tab.name}</span>
          )}
          <IoMdCloseCircle
            className='text-sm'
            onClick={() => handleTabClose(index)}
          />
        </div>
      ))}
      <div
        className='flex items-center text-xs justify-center bg-secondary rounded-full p-1 cursor-pointer'
        onClick={handleAddTab}
      >
        <FaPlus />
      </div>
    </div>
  );
};

export default EditorTab;
