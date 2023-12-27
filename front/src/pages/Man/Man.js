import React, { useEffect, useState, useMemo } from 'react';
import './Man.css';

const Man = () => {
  // 초기 상태 설정 시 로컬 스토리지에서 데이터 로드
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('mandalartData');
    return savedData ? JSON.parse(savedData) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showMandalart, setShowMandalart] = useState(localStorage.getItem('mandalartData') ? true : false);

  // API 호출 함수
  const fetchData = async () => {
    const apiUrl = 'http://127.0.0.1:8000/chat-gpt/';
    setIsLoading(true);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setData(data);
      setShowMandalart(true); // 데이터 로드 후 만다라트 표시
      localStorage.setItem('mandalartData', JSON.stringify(data)); // 로컬 스토리지에 데이터 저장
    } catch (error) {
      console.error('Error fetching data: ', error);
      setShowMandalart(false); // 에러 발생시 만다라트 표시 안 함
    }
    setIsLoading(false);
  };

  // 데이터가 있을 경우에만 키 추출
  const dataKeys = useMemo(() => {
    return data ? Object.keys(data) : [];
  }, [data]); // useMemo를 사용하여 dataKeys를 메모이제이션

  const [sharedValue1, setSharedValue1] = useState('');
  const [sharedValue2, setSharedValue2] = useState('');
  const [sharedValue3, setSharedValue3] = useState('');
  const [sharedValue4, setSharedValue4] = useState('');

  // 데이터가 로드된 후에 sharedValues를 설정
  useEffect(() => {
    if (dataKeys.length > 0) {
      setSharedValue1(dataKeys[0] ?? '');
      setSharedValue2(dataKeys[1] ?? '');
      setSharedValue3(dataKeys[2] ?? '');
      setSharedValue4(dataKeys[3] ?? '');
    }
  }, [dataKeys]);

  const [predefinedValues, setPredefinedValues] = useState({});
  // predefinedValues를 상태로 관리
  useEffect(() => {
    if (data) {
      setPredefinedValues({
        "3,0": data[dataKeys[0]]?.[0] ?? '',
        "3,1": data[dataKeys[0]]?.[1] ?? '',
        "3,2": data[dataKeys[0]]?.[2] ?? '',
        "4,0": data[dataKeys[0]]?.[3] ?? '',
        "4,2": data[dataKeys[0]]?.[4] ?? '',
        "5,0": data[dataKeys[0]]?.[5] ?? '',
        "5,1": data[dataKeys[0]]?.[6] ?? '',
        "5,2": data[dataKeys[0]]?.[7] ?? '',
        // 두번째
        "0,3": data[dataKeys[3]]?.[0] ?? '',
        "0,4": data[dataKeys[3]]?.[1] ?? '',
        "0,5": data[dataKeys[3]]?.[2] ?? '',
        "1,3": data[dataKeys[3]]?.[3] ?? '',
        "1,5": data[dataKeys[3]]?.[4] ?? '',
        "2,3": data[dataKeys[3]]?.[5] ?? '',
        "2,4": data[dataKeys[3]]?.[6] ?? '',
        "2,5": data[dataKeys[3]]?.[7] ?? '',
        // 세번째
        "3,6": data[dataKeys[2]]?.[0] ?? '',
        "3,7": data[dataKeys[2]]?.[1] ?? '',
        "3,8": data[dataKeys[2]]?.[2] ?? '',
        "4,6": data[dataKeys[2]]?.[3] ?? '',
        "4,8": data[dataKeys[2]]?.[4] ?? '',
        "5,6": data[dataKeys[2]]?.[5] ?? '',
        "5,7": data[dataKeys[2]]?.[6] ?? '',
        "5,8": data[dataKeys[2]]?.[7] ?? '',
        // 네번째
        "6,3": data[dataKeys[1]]?.[0] ?? '',
        "6,4": data[dataKeys[1]]?.[1] ?? '',
        "6,5": data[dataKeys[1]]?.[2] ?? '',
        "7,3": data[dataKeys[1]]?.[3] ?? '',
        "7,5": data[dataKeys[1]]?.[4] ?? '',
        "8,3": data[dataKeys[1]]?.[5] ?? '',
        "8,4": data[dataKeys[1]]?.[6] ?? '',
        "8,5": data[dataKeys[1]]?.[7] ?? '',

      });
    }
  }, [data,dataKeys]);

  const handleButtonClick = () => {
    fetchData();
  };

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
          className="mandalart-input"
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
          className="mandalart-input"
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
          className="mandalart-input"
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
          className="mandalart-input"
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
          className="mandalart-input"
          type="text"
          value={sharedValue4}
          onChange={(e) => handleInputChange4(e.target.value)}
          style={specialStyle}
          placeholder=" "
        />
      );
    } else {
      return <input className="mandalart-input" type="text" placeholder=" " />;
    }
  };

  return (
      <div className="container">
        <h1 className="mandalart-guide-title">만다라트 가이드</h1>
        <div className="button-container">
          <button onClick={handleButtonClick}>만다라트 생성</button>
          {isLoading && <p>Loading...</p>}
        </div>
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