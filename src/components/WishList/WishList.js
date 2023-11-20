import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WishList.scss';

const WishList = () => {
  const [userWishList, setUserWishList] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    getWishList();
  }, []);

  const getWishList = () => {
    fetch('http://10.58.52.140:8000/likes/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserWishList(data.result);
      });
  };

  const handleDetail = (itemId) => {
    navigate(`/detail/${itemId}`);
  };

  const handleCancel = (itemId) => {
    fetch('http://10.58.52.140:8000/likes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token,
      },
      body: JSON.stringify({
        classId: itemId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        getWishList();
      });
  };

  return (
    <div className="wishList">
      <div className="container">
        <div className="label">위시 리스트</div>

        <div className="contents">
          {!!userWishList.length &&
            userWishList.map((item) => {
              return (
                <div className="content" key={item.id}>
                  <img src={item.image_source} alt="img" />
                  <div className="classInfo">
                    <div className="className">강의명 : {item.title}</div>
                    <div className="classOpener">강의자 : {item.hostName}</div>
                    <div className="classCategory">
                      강의 카테고리 : {item.topName}({item.subName})
                    </div>
                    <div className="classLocation">
                      강의 장소 : {item.address}
                    </div>
                  </div>
                  <div className="buttons">
                    <button onClick={() => handleDetail(item.id)}>
                      상세 보기
                    </button>
                    <button onClick={() => handleCancel(item.id)}>
                      좋아요 취소
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default WishList;
