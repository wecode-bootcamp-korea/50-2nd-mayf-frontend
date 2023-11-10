import React from 'react';
import './List.scss';

const List = () => {
  return (
    <div className="list">
      <div className="container">
        <div className="header">
          <div className="headerTitle">Class Page</div>
        </div>

        <div className="content">
          <div className="tab">
            <div className="labelTitle class">클라스 카테고리</div>
            <ul className="categories">
              <div>
                <input type="checkbox" />
                운동
              </div>
              <div>
                <input type="checkbox" />
                공예
              </div>
              <div>
                <input type="checkbox" />
                예술
              </div>
              <div>
                <input type="checkbox" />
                요리
              </div>
              <div>
                <input type="checkbox" />
                외국어
              </div>
              <div>
                <input type="checkbox" />
                프로그래밍
              </div>
              <div>
                <input type="checkbox" />
                게임
              </div>
              <div>
                <input type="checkbox" />
                기타
              </div>
            </ul>

            <div className="labelTitle location">지역</div>
            <ul className="categories">
              <div>
                <input type="checkbox" />
                서울
              </div>
              <div>
                <input type="checkbox" />
                경기
              </div>
              <div>
                <input type="checkbox" />
                충청
              </div>
              <div>
                <input type="checkbox" />
                전라
              </div>
              <div>
                <input type="checkbox" />
                강원
              </div>
              <div>
                <input type="checkbox" />
                경상
              </div>
              <div>
                <input type="checkbox" />
                제주
              </div>
            </ul>
          </div>

          <div className="classTab">
            <div className="labels">
              <div className="labelTitle">클래스 타이틀</div>
              <select>
                <option>최신순</option>
                <option>오래된순</option>
                <option>가격 낮은 순</option>
                <option>가격 높은 순</option>
                <option>인기순</option>
              </select>
            </div>
            <div className="classList">
              <div className="class">
                <div className="picture">
                  <img
                    alt="상품이미지"
                    src="https://img.freepik.com/free-photo/top-view-arrangement-of-natural-material-stationery_23-2148898233.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699142400&semt=ais"
                  />
                </div>
                <div className="classTitle">강의 1</div>
                <div className="classLocation">서울</div>
                <div className="classCredit">10,000P</div>
              </div>

              <div className="class">
                <div className="picture">
                  <img
                    alt="상품이미지"
                    src="https://img.freepik.com/free-photo/top-view-arrangement-of-natural-material-stationery_23-2148898233.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699142400&semt=ais"
                  />
                </div>
                <div className="classTitle">강의 1</div>
                <div className="classLocation">서울</div>
                <div className="classCredit">10,000P</div>
              </div>

              <div className="class">
                <div className="picture">
                  <img
                    alt="상품이미지"
                    src="https://img.freepik.com/free-photo/top-view-arrangement-of-natural-material-stationery_23-2148898233.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699142400&semt=ais"
                  />
                </div>
                <div className="classTitle">강의 1</div>
                <div className="classLocation">서울</div>
                <div className="classCredit">10,000P</div>
              </div>

              <div className="class">
                <div className="picture">
                  <img
                    alt="상품이미지"
                    src="https://img.freepik.com/free-photo/top-view-arrangement-of-natural-material-stationery_23-2148898233.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699142400&semt=ais"
                  />
                </div>
                <div className="classTitle">강의 1</div>
                <div className="classLocation">서울</div>
                <div className="classCredit">10,000P</div>
              </div>

              <div className="class">
                <div className="picture">
                  <img
                    alt="상품이미지"
                    src="https://img.freepik.com/free-photo/top-view-arrangement-of-natural-material-stationery_23-2148898233.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699142400&semt=ais"
                  />
                </div>
                <div className="classTitle">강의 1</div>
                <div className="classLocation">서울</div>
                <div className="classCredit">10,000P</div>
              </div>

              <div className="class">
                <div className="picture">
                  <img
                    alt="상품이미지"
                    src="https://img.freepik.com/free-photo/top-view-arrangement-of-natural-material-stationery_23-2148898233.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699142400&semt=ais"
                  />
                </div>
                <div className="classTitle">강의 1</div>
                <div className="classLocation">서울</div>
                <div className="classCredit">10,000P</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
