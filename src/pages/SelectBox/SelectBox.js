import $ from 'jquery';

const SelectBox = () => {
  let category0 = [
    '상위 카테고리',
    '운동',
    '예술',
    '공예',
    '외국어',
    '요리',
    '게임',
    '프로그래밍',
    '기타',
  ];

  let category1 = [
    '하위 카테고리',
    '헬스',
    '필라테스',
    '요가',
    '크로스핏',
    '축구',
    '기타',
  ];

  let category2 = [
    '하위 카테고리',
    '엔터테인먼트',
    '미술',
    '사진/영상',
    '기타',
  ];

  let category3 = [
    '하위 카테고리',
    '주얼리',
    '비누',
    '향수',
    '목공',
    '가죽',
    '기타',
  ];

  let category4 = [
    '하위 카테고리',
    '영어',
    '한국어',
    '중국어',
    '일본어',
    '스페인어',
    '기타',
  ];

  let category5 = [
    '하위 카테고리',
    '베이킹',
    '한식',
    '양식',
    '일식',
    '중식',
    '기타',
  ];

  let category6 = ['하위 카테고리', 'RTS', 'FPS', '스포츠', '캐주얼', '기타'];

  let category7 = [
    '하위 카테고리',
    'Javascript',
    'Java',
    'C/C++/C#',
    'Python',
    '기타',
  ];

  let category8 = ['하위 카테고리', '기타'];

  $('#topCategoryName').each(function (i, item) {
    if (i === 0) {
      let $seltopCategory = $(this);
      $.each(eval(category0), function () {
        $seltopCategory.append(
          "<option value='" + this + "'>" + this + '</option>',
        );
      });
      $seltopCategory.next().append("<option value=''>하위 카테고리</option>");
    }
  });

  $('select[name^=topCategory]').change(function (e) {
    let category =
      'category' + $('option', $(this)).index($('option:selected', $(this)));
    let $subCategory = $(this).next();
    $('option', $subCategory).remove();

    if (category === 'category0')
      $subCategory.append("<option value=''>하위 카테고리</option>");
    else {
      $.each(eval(category), function () {
        $subCategory.append(
          "<option value='" + this + "'>" + this + '</option>',
        );
      });
    }
  });
};

export default SelectBox;
