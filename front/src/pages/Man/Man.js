import React, { useState } from 'react';
import './Man.css';

let sagazi = ['Softskill', '기술스택', '문제해결능력', '트렌드'];
let soft = ['스트레스 관리','갈등 관리','협업','머시기']
const Man = () => {
  const [sharedValue1, setSharedValue1] = useState(sagazi[0]);
  const [sharedValue2, setSharedValue2] = useState(sagazi[1]);
  const [sharedValue3, setSharedValue3] = useState(sagazi[2]);
  const [sharedValue4, setSharedValue4] = useState(sagazi[3]);

  // predefinedValues를 상태로 관리
  const [predefinedValues, setPredefinedValues] = useState({
    "3,1": soft[0],
    "3,0":soft[0],
    "3,2":soft[0],
    "4,0": soft[2],
    "4,2": soft[3],
    "5,0": soft[1],
    "5,1": soft[1],
    "5,2": soft[1],
  });

  const handleInputChange1 = (value) => setSharedValue1(value);
  const handleInputChange2 = (value) => setSharedValue2(value);
  const handleInputChange3 = (value) => setSharedValue3(value);
  const handleInputChange4 = (value) => setSharedValue4(value);

  // predefinedValues 내의 값을 변경하는 핸들러 함수
  const handlePredefinedValueChange = (key, value) => {
    setPredefinedValues((prev) => ({ ...prev, [key]: value }));
  };

  const renderCell = (rowIndex, colIndex) => {
    const cellKey = `${rowIndex},${colIndex}`;
    const specialStyle = (
      (rowIndex === 4 && colIndex === 1 && sharedValue1) || 
      (rowIndex === 7 && colIndex === 4 && sharedValue2) ||
      (rowIndex === 4 && colIndex === 7 && sharedValue3) ||
      (rowIndex === 1 && colIndex === 4 && sharedValue4)
    ) ? { color: 'red', fontFamily: 'Arial', fontWeight: 900 } : {};

    if (predefinedValues.hasOwnProperty(cellKey)) {
      return (
        <input
          type="text"
          value={predefinedValues[cellKey]}
          onChange={(e) => handlePredefinedValueChange(cellKey, e.target.value)}
          style={specialStyle}
          placeholder=" "
        />
      );
    }

    // 공유 값에 따라 입력란을 렌더링
    if ((rowIndex === 4 && colIndex === 1) || (rowIndex === 4 && colIndex === 3)) {
      return (
        <input
          type="text"
          value={sharedValue1}
          onChange={(e) => handleInputChange1(e.target.value)}
          style={specialStyle}
          placeholder=" "
        />
      );
    } else if ((rowIndex === 5 && colIndex === 4) || (rowIndex === 7 && colIndex === 4)) {
      return (
        <input
          type="text"
          value={sharedValue2}
          onChange={(e) => handleInputChange2(e.target.value)}
          style={specialStyle}
          placeholder=" "
        />
      );
    } else if ((rowIndex === 4 && colIndex === 5) || (rowIndex === 4 && colIndex === 7)) {
      return (
        <input
          type="text"
          value={sharedValue3}
          onChange={(e) => handleInputChange3(e.target.value)}
          style={specialStyle}
          placeholder=" "
        />
      );
    } else if ((rowIndex === 1 && colIndex === 4) || (rowIndex === 3 && colIndex === 4)) {
      return (
        <input
          type="text"
          value={sharedValue4}
          onChange={(e) => handleInputChange4(e.target.value)}
          style={specialStyle}
          placeholder=" "
        />
      );
    } else {
      return <input type="text" placeholder=" " />;
    }
  };

  return (
    <div>
      <h1 className="mandalart-guide-title">만다라트 가이드</h1> {/* 만다라트 가이드 제목 */}
      <div className="table-container">
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
    </div>
  );
};

export default Man;
