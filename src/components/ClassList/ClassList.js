import React from 'react';
import './ClassList.scss';

const ClassList = ({ setTab }) => {
  return (
    <div className="classList">
      <div className="container">
        <div className="label">
          <div className="pageTitle">강의 내역</div>
          <button
            className="addClass"
            onClick={() => {
              setTab(4);
            }}
          >
            강의 추가
          </button>
        </div>

        <div className="contents">
          <div className="content">
            <img
              src="https://img.freepik.com/free-photo/top-view-arrangement-of-natural-material-stationery_23-2148898233.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1698796800&semt=sph"
              alt="이미지"
            />

            <div className="classInfo">
              <div className="className">강의명</div>
              <div className="classOpener">강의자</div>
              <div className="classCategory">강의 카테고리</div>
              <div className="classLocation">강의 장소</div>
            </div>

            <div className="buttons">
              <button>상세 보기</button>
              <button>삭제</button>
            </div>
          </div>

          <div className="content">
            <img
              src="https://img.freepik.com/free-photo/top-view-arrangement-of-natural-material-stationery_23-2148898233.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1698796800&semt=sph"
              alt="이미지"
            />

            <div className="classInfo">
              <div className="className">강의명</div>
              <div className="classOpener">강의자</div>
              <div className="classCategory">강의 카테고리</div>
              <div className="classLocation">강의 장소</div>
            </div>

            <div className="buttons">
              <button>상세 보기</button>
              <button>삭제</button>
            </div>
          </div>

          <div className="content">
            <img
              src="https://img.freepik.com/free-photo/top-view-arrangement-of-natural-material-stationery_23-2148898233.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1698796800&semt=sph"
              alt="이미지"
            />

            <div className="classInfo">
              <div className="className">강의명</div>
              <div className="classOpener">강의자</div>
              <div className="classCategory">강의 카테고리</div>
              <div className="classLocation">강의 장소</div>
            </div>

            <div className="buttons">
              <button>상세 보기</button>
              <button>삭제</button>
            </div>
          </div>

          <div className="content">
            <img
              src="https://img.freepik.com/free-photo/top-view-arrangement-of-natural-material-stationery_23-2148898233.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1698796800&semt=sph"
              alt="이미지"
            />

            <div className="classInfo">
              <div className="className">강의명</div>
              <div className="classOpener">강의자</div>
              <div className="classCategory">강의 카테고리</div>
              <div className="classLocation">강의 장소</div>
            </div>

            <div className="buttons">
              <button>상세 보기</button>
              <button>삭제</button>
            </div>
          </div>

          <div className="content">
            <img
              src="https://img.freepik.com/free-photo/top-view-arrangement-of-natural-material-stationery_23-2148898233.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1698796800&semt=sph"
              alt="이미지"
            />

            <div className="classInfo">
              <div className="className">강의명</div>
              <div className="classOpener">강의자</div>
              <div className="classCategory">강의 카테고리</div>
              <div className="classLocation">강의 장소</div>
            </div>

            <div className="buttons">
              <button>상세 보기</button>
              <button>삭제</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassList;
