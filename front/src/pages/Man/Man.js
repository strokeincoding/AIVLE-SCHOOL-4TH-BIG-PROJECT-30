import React, { useEffect, useState } from 'react';
import './Man.css';

let sagazi = ['Softskill', '기술스택', '문제해결능력', '트렌드'];
let soft = ['Softskill', '기술스택', '문제해결능력', '트렌드'];


const Man = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:8000/chat-gpt/';
    const fetchData = async () => {
      setIsLoading(true); // 로딩 시작
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
      setIsLoading(false); // 로딩 완료
    };
    fetchData();
  }, []);

  // 데이터가 있을 경우에만 키 추출
  let dataKeys = data ? Object.keys(data) : [];

  // 상태 초기값을 관리하면서 dataKeys의 값에 따라 업데이트
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
      });
    }
  }, [data]);

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
