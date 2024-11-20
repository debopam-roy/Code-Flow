import React from "react";
import { BsTerminal } from "react-icons/bs";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaPlay } from "react-icons/fa";

const Terminal = ({ selectedLanguage, handleLanguageChange }) => {
  const languages = [
    { name: "ABAP", key: "abap" },
    { name: "Apache Conf", key: "apache" },
    { name: "AsciiDoc", key: "asciidoc" },
    { name: "AutoHotkey", key: "autohotkey" },
    { name: "BAT", key: "bat" },
    { name: "C++", key: "cpp" },
    { name: "C#", key: "csharp" },
    { name: "Clojure", key: "clojure" },
    { name: "CoffeeScript", key: "coffeescript" },
    { name: "CSS", key: "css" },
    { name: "Dockerfile", key: "dockerfile" },
    { name: "F#", key: "fsharp" },
    { name: "Go", key: "go" },
    { name: "Groovy", key: "groovy" },
    { name: "Handlebars", key: "handlebars" },
    { name: "HCL", key: "hcl" },
    { name: "HTML", key: "html" },
    { name: "Ini", key: "ini" },
    { name: "Java", key: "java" },
    { name: "JavaScript", key: "javascript" },
    { name: "JSON", key: "json" },
    { name: "Julia", key: "julia" },
    { name: "Kotlin", key: "kotlin" },
    { name: "LESS", key: "less" },
    { name: "Lua", key: "lua" },
    { name: "Markdown", key: "markdown" },
    { name: "Objective-C", key: "objective-c" },
    { name: "Pascal", key: "pascal" },
    { name: "Perl", key: "perl" },
    { name: "PHP", key: "php" },
    { name: "Plain Text", key: "plaintext" },
    { name: "PowerShell", key: "powershell" },
    { name: "Pug", key: "pug" },
    { name: "Python", key: "python" },
    { name: "R", key: "r" },
    { name: "Razor", key: "razor" },
    { name: "Ruby", key: "ruby" },
    { name: "Rust", key: "rust" },
    { name: "SCSS", key: "scss" },
    { name: "Shell Script", key: "shell" },
    { name: "SQL", key: "sql" },
    { name: "Swift", key: "swift" },
    { name: "TOML", key: "toml" },
    { name: "TypeScript", key: "typescript" },
    { name: "VB", key: "vb" },
    { name: "XML", key: "xml" },
    { name: "YAML", key: "yaml" },
  ];

  return (
    <div className='bg-secondary flex flex-col h-full w-full'>
      <div className='flex gap-2 p-2 px-5 shadow-2xl shadow-primary border-contemporary border-s border-e border-b rounded-b-xl justify-between'>
        <div className='flex items-center gap-2'>
          <BsTerminal className='h-5 w-5' />
          <p className='font-bold text-sm'>TERMINAL</p>
          <IoMdInformationCircleOutline title='Interactive coding terminal' />
        </div>

        <div className='flex items-center gap-x-4'>
          <select
            className='bg-primary text-overlay px-2 py-1 rounded outline-none'
            value={selectedLanguage}
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            <option value=''>Select Language</option>
            {languages.map(({ name, key }) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          </select>
          <button
            className={`text-green-500 ${!selectedLanguage && "opacity-50 cursor-not-allowed"}`}
            title='Run Code'
            disabled={!selectedLanguage}
          >
            <FaPlay />
          </button>
        </div>
      </div>
      <p className='font-bold px-2'>CodeFlow $</p>
    </div>
  );
};

export default Terminal;
