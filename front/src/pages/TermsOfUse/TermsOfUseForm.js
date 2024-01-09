import React, { useEffect, useState } from 'react';
import TermsDetails from './TermsOfUse';
import { useNavigate } from 'react-router-dom';
import termsOfUseData from './termsOfUseData.json';
import './Terms.css'; 

const TermsOfUseForm = ({ setShowSignupForm }) => {
  const [agreedToTerms1, setAgreedToTerms1] = useState(false);
  const [agreedToTerms2, setAgreedToTerms2] = useState(false);
  const [allAgreed, setAllAgreed] = useState(false);
  const navigate = useNavigate();

  const handleAgreeToTerms1 = () => {
    setAgreedToTerms1(!agreedToTerms1);
  };

  const handleButtonClick = (checkboxStateSetter) => {
    checkboxStateSetter(prevState => !prevState);
  };

  const handleAgreeToTerms2 = () => {
    setAgreedToTerms2(!agreedToTerms2);
  };
  useEffect(() => {
    if (agreedToTerms1 && agreedToTerms2) {
      setAllAgreed(true);
    } else {
      setAllAgreed(false);
    }
  }, [agreedToTerms1, agreedToTerms2]);
  
  const handleAgreeAll = () => {
    if (!allAgreed) {
      setAgreedToTerms1(true);
      setAgreedToTerms2(true);
      setAllAgreed(true);
    } else {
      setAgreedToTerms1(false);
      setAgreedToTerms2(false);
      setAllAgreed(false);
    }
  }

  const handleNextButtonClick = () => {
    if (agreedToTerms1 && agreedToTerms2) {
      navigate('/join');
    }
  };

  const Table = ({ termsOfUse }) => {
    return (
      <table className='terms-table'>
        <thead>
          <tr>
            <th className='text-center'>목적</th> 
            <th className='text-center'>항목</th>
            <th className='text-center'>보유기간</th>
          </tr>
        </thead>
        <tbody>
          {termsOfUse.map((item, index) => (
            <tr key={index}>
              <td className='text-justify'>{item.목적}</td>
              <td className='text-justify'>{item.항목}</td>
              <td className='text-justify'>{item.보유기간}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div style={{ 
      alignItems: 'center', justifyContent: 'center', 
      display: 'flex', flexDirection: 'column'}}
      className='terms-check lg:w-[50%] w-full p-2'>
        <div className='lg:w-[400px] w-full grid grid-rows-5 grid-flow-col lg:gap-4 gap-2 items-center'>
          <h1 className='font-bold text-center'>길잡이 서비스 약관에 동의해 주세요</h1>
          <TermsDetails />
          <div className="center-container">
          <button type="button" onClick={() => handleButtonClick(setAgreedToTerms1)} className="agreement-button">
            <input type="checkbox" checked={agreedToTerms1} onChange={handleAgreeToTerms1} />
            <label className={`py-2 px-3 rounded-md text-white font-semibold ${agreedToTerms1 ? 'bg-[var(--color-primary-500)] border border-[var(--color-primary-500)]' : 'bg-gray-400'}`}>
              길잡이 이용약관 (필수)
            </label>
            </button>
          </div>
          {/* 약관 내용 항상 표시 */}
          <div className="terms-content">
            <Table termsOfUse={termsOfUseData} />
          </div>
          <div className="center-container">
          <button type="button" onClick={() => handleButtonClick(setAgreedToTerms2)} className="agreement-button">
            <input type="checkbox" checked={agreedToTerms2} onChange={handleAgreeToTerms2} />
            <label className={`py-2 px-3 rounded-md text-white font-semibold ${agreedToTerms2 ? 'bg-[var(--color-primary-500)] border border-[var(--color-primary-500)]' : 'bg-gray-400'}`}>
              개인정보 수집 및 이용 동의 (필수)
            </label>
            </button>
          </div>
          {/* 개인정보 수집 및 이용 동의 내용 항상 표시 */}
          <div className="center-container">
            <button onClick={handleAgreeAll} className={`py-2 w-full px-3 rounded-md text-white font-semibold ${allAgreed ? 'bg-[var(--color-primary-500)] border border-[var(--color-primary-500)] hover:text-[var(--color-primary-500)] hover:bg-white' : 'bg-gray-400 hover:bg-[var(--color-primary-500)]'}`}>
              {allAgreed ? '전체 동의 해제' : '모두 동의'}
            </button>
          </div>
          <div className="center-container">
            <button
              onClick={handleNextButtonClick}
              className={`w-full py-2 px-3 rounded-md text-white font-semibold ${agreedToTerms1 && agreedToTerms2 ? 'bg-[var(--color-primary-500)] border border-[var(--color-primary-500)] hover:text-[var(--color-primary-500)] hover:bg-white' : 'bg-gray-400 cursor-not-allowed'}`}
              disabled={!agreedToTerms1 || !agreedToTerms2}
            >
              다음
            </button>
          </div>
        </div>
    </div>
  );
}

export default TermsOfUseForm;