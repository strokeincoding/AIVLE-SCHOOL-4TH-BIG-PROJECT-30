import React, { useEffect, useState} from 'react';
import './Man.css';
import image1 from "./lefttop.png";
import image2 from "./righttop.png";
import image3 from "./leftdown.png";
import image4 from "./rightdown.png";

const initialPredefinedValues = {};
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    initialPredefinedValues[`${i},${j}`] = '';
  }
}
initialPredefinedValues['1,1'] = "기술 스택";
initialPredefinedValues['7,1'] = '문제해결능력';
initialPredefinedValues['1,7'] = 'Soft Skill';
initialPredefinedValues['7,7'] = '트렌드';
initialPredefinedValues['4,4'] = '?';

const Man = () => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('mandalartData');
    return savedData ? JSON.parse(savedData) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showMandalart, setShowMandalart] = useState(true);
 
  const getCookieValue = (name) => (
    document.cookie.split('; ').find(row => row.startsWith(name + '='))
    ?.split('=')[1]
  );
 
  const fetchData = async () => {
    const nickname = getCookieValue('nickname');
    console.log(nickname);
    if (!nickname || nickname === 'undefined') {
      console.error('User ID is not found or undefined');
      return;
    }
 
    const apiUrl = `http://127.0.0.1:8000/chat-gpt/?nickname=${nickname}`;
    setIsLoading(true);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setData(data);
      setShowMandalart(true);
      localStorage.setItem('mandalartData', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching data: ', error);
      setShowMandalart(false);
    }
    setIsLoading(false);
  };
 
 
  const [predefinedValues, setPredefinedValues] = useState(initialPredefinedValues);
 
  useEffect(() => {
    if (data) {
      const newValues = { ...initialPredefinedValues };
 
      if (Array.isArray(data["기술 스택"])) {
        data["기술 스택"].forEach((val, index) => {
          const coordinates = [
            "0,0", "0,1", "0,2",
            "1,0", "1,2",
            "2,0", "2,1", "2,2"
          ];
          newValues[coordinates[index]] = val;
        });
      }
 
      if (Array.isArray(data["문제해결 능력"])) {
        data["문제해결 능력"].forEach((val, index) => {
          const coordinates = [
            "6,0", "6,1", "6,2",
            "7,0", "7,2",
            "8,0", "8,1", "8,2"
          ];
          newValues[coordinates[index]] = val;
        });
      }

      if (Array.isArray(data["soft skill"])) {
        data["soft skill"].forEach((val, index) => {
          const coordinates = [
            "0,6", "0,7", "0,8",
            "1,6", "1,8",
            "2,6", "2,7", "2,8"
          ];
          newValues[coordinates[index]] = val;
        });
      }
     
      if (Array.isArray(data["트렌드"])) {
        data["트렌드"].forEach((val, index) => {
          const coordinates = [
            "6,6", "6,7", "6,8",
            "7,6", "7,8",
            "8,6", "8,7", "8,8"
          ];
          newValues[coordinates[index]] = val;
        });
      }
 
      newValues["4,4"] = data['job']; 
 
      setPredefinedValues(newValues);
    }
  }, [data]);
 
  const handleButtonClick = () => {
    fetchData();
  };
 
  const imagePaths = {
    "3,3": image1,
    "3,5": image2,
    "5,3": image3,
    "5,5": image4,
  };
 
  const renderCell = (rowIndex, colIndex) => {
    const cellKey = `${rowIndex},${colIndex}`;
    const content = predefinedValues[cellKey] || '';
    const cellClass = content ? "cell-with-content" : "cell-without-content";
    const imagePath = imagePaths[cellKey];
   
    const cellStyle = ["1,1", "7,1", "1,7", "7,7"].includes(cellKey)
                      ? { color: 'red' }
                      : {};
 
    if (imagePath) {
      return (
        <td className={cellClass}>
          <img src={imagePath} alt={`Cell ${cellKey}`} style={{ width: '100%', height: '100%' }} />
        </td>
      );
    }
 
    return (
      <td className={cellClass} style={cellStyle}>
        <p style={{ fontSize: '0.66vw' }}>{content}</p>
      </td>
    );
  };
 
  return (
    <div className="container">
    <h1 className="mandalart-guide-title"style={{ fontSize: '2rem', fontWeight: 'bold' }}>만다라트 가이드</h1>
    <div className="button-container">
      <button onClick={handleButtonClick}>만다라트 생성</button>
    </div>
    {isLoading && (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    )}
      {showMandalart && (
        <div className="table-container fadeIn">
          <table className="square-table">
          <tbody>
            {[...Array(9)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                {[...Array(9)].map((_, colIndex) => (
                  <td key={colIndex}>{renderCell(rowIndex, colIndex)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
  );
};
 
export default Man;
 