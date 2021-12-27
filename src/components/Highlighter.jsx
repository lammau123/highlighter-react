import React, {useEffect, useState} from "react";

const Highlighter = () => {
  const [sourceText, setSourceText] = useState("");   
  const [searchTerm, setSearchTerm] = useState("");   
  const [resultText, setResultText] = useState("");
  const [insensitive, setInsensitive] = useState(false);

  useEffect(() => {
    highLightText(searchTerm);
  }, [sourceText, searchTerm, insensitive]);

  const handleSourceText = (event) => {
    const value = event.target.value;
    setSourceText(value);
    setResultText(value);
  }

  const handleSearchTerm = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  }

  const handleInsensitive = () => {
        setInsensitive(!insensitive);
  }
  
  const highLightText = (value) => {
    if(value){
      const ins = insensitive ? "g" : "gi";
      setResultText(sourceText.replace(RegExp(value, ins), function(x){
        return `<mark>${x}</mark>`;
      }));
    }
  }

  return (
    <>
      <div>
        <textarea rows="6" cols="34" className="source-text" value={sourceText} onChange={handleSourceText}/>
      </div>
      <div style={{paddingBottom: '10px'}}>
        <input className="search-term" value={searchTerm} onChange={handleSearchTerm}/>
      </div>
      <div>
        <label>case sensitive? 
          <input type="checkbox" className="case-sensitive" defaultChecked={insensitive} onChange={handleInsensitive}/>
        </label>
      </div>
      <div className="result" dangerouslySetInnerHTML={{__html: resultText}}/>
    </>
  );
};

export default Highlighter;