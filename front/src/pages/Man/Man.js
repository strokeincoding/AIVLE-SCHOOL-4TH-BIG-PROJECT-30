import React, { useEffect, useState, useMemo } from 'react';
import './Man.css';
import image1 from "./lefttop.png";
import image2 from "./righttop.png";
import image3 from "./leftdown.png";
import image4 from "./rightdown.png";


const Man = () => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('mandalartData');
    return savedData ? JSON.parse(savedData) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showMandalart, setShowMandalart] = useState(localStorage.getItem('mandalartData') ? true : false);

  const getCookieValue = (name) => (
    document.cookie.split('; ').find(row => row.startsWith(name + '='))
    ?.split('=')[1]
  );

  // API 호출 함수
  const fetchData = async () => {
    const nickname = getCookieValue('nickname'); // 쿠키에서 userId 가져오기
    console.log(nickname);
    if (!nickname || nickname === 'undefined') {
      console.error('User ID is not found or undefined');
      return; // userId가 없거나 'undefined'인 경우 함수를 종료합니다.
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
        //기술 스택
        "0,0": data[dataKeys[0]]?.[0] ?? '',
        "0,1": data[dataKeys[0]]?.[1] ?? '',
        "0,2": data[dataKeys[0]]?.[2] ?? '',
        "1,0": data[dataKeys[0]]?.[3] ?? '',
        "1,1": sharedValue1 ?? '',
        "1,2": data[dataKeys[0]]?.[4] ?? '',
        "2,0": data[dataKeys[0]]?.[5] ?? '',
        "2,1": data[dataKeys[0]]?.[6] ?? '',
        "2,2": data[dataKeys[0]]?.[7] ?? '',
        //문제해결능력
        "6,0": data[dataKeys[1]]?.[0] ?? '',
        "6,1": data[dataKeys[1]]?.[1] ?? '',
        "6,2": data[dataKeys[1]]?.[2] ?? '',
        "7,0": data[dataKeys[1]]?.[3] ?? '',
        "7,1": sharedValue2 ?? '',
        "7,2": data[dataKeys[1]]?.[4] ?? '',
        "8,0": data[dataKeys[1]]?.[5] ?? '',
        "8,1": data[dataKeys[1]]?.[6] ?? '',
        "8,2": data[dataKeys[1]]?.[7] ?? '',
        //soft skill
        "0,6": data[dataKeys[2]]?.[0] ?? '',
        "0,7": data[dataKeys[2]]?.[1] ?? '',
        "0,8": data[dataKeys[2]]?.[2] ?? '',
        "1,6": data[dataKeys[2]]?.[3] ?? '',
        "1,7": sharedValue3 ?? '',
        "1,8": data[dataKeys[2]]?.[4] ?? '',
        "2,6": data[dataKeys[2]]?.[5] ?? '',
        "2,7": data[dataKeys[2]]?.[6] ?? '',
        "2,8": data[dataKeys[2]]?.[7] ?? '',
        //트렌드
        "6,6": data[dataKeys[3]]?.[0] ?? '',
        "6,7": data[dataKeys[3]]?.[1] ?? '',
        "6,8": data[dataKeys[3]]?.[2] ?? '',
        "7,6": data[dataKeys[3]]?.[3] ?? '',
        "7,7": sharedValue4 ?? '',
        "7,8": data[dataKeys[3]]?.[4] ?? '',
        "8,6": data[dataKeys[3]]?.[5] ?? '',
        "8,7": data[dataKeys[3]]?.[6] ?? '',
        "8,8": data[dataKeys[3]]?.[7] ?? '',
        
        // 가운데
        "4,4": data['job'] ?? '',

      });
    }
  }, [data, dataKeys, sharedValue1, sharedValue2, sharedValue3, sharedValue4]);

  const handleButtonClick = () => {
    fetchData();
  };

  // 이미지 위치 정보와 파일 정보
  const imagePaths = {
    "3,3": image1,
    "3,5": image2,
    "5,3": image3,
    "5,5": image4,
  };

  const renderCell = (rowIndex, colIndex) => {
    const cellKey = `${rowIndex},${colIndex}`;
    const content = predefinedValues[cellKey] || '';
    const isSharedValueCell = ['1,1', '7,1', '1,7', '7,7'].includes(cellKey);
    
    const cellClass = content ? "cell-with-content" : "cell-without-content";
    const additionalClass = isSharedValueCell ? "shared-value-cell" : "";
    const imagePath = imagePaths[cellKey];
  
    if (imagePath) {
      return (
        <td className={`${cellClass} ${additionalClass}`}>
          <img src={imagePath} alt={`Cell ${cellKey}`} style={{ width: '100%', height: '100%' }} />
        </td>
      );
    }
  
    if (predefinedValues.hasOwnProperty(cellKey)) {
      return (
        <td className={`${cellClass} ${additionalClass}`}>
          <p>{content}</p>
        </td>
      );
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