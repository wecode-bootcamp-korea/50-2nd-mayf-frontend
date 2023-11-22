import React from 'react';
import './Post.scss';
import DaumPostcode from 'react-daum-postcode';

const Post = ({ company, setCompany }) => {
  const complete = ({ address, addressType, bname, buildingName }) => {
    let fullAddress = address;
    let extraAddress = '';

    if (addressType === 'R') {
      if (bname !== '') {
        extraAddress += bname;
      }
      if (buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${buildingName}` : buildingName;
      }
      fullAddress += extraAddress !== '' ? `(${extraAddress})` : '';
    }

    setCompany({
      ...company,
      address: fullAddress,
    });
  };

  return <DaumPostcode className="postModal" autoClose onComplete={complete} />;
};

export default Post;
