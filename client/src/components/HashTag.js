import { useState } from 'react';
import { useCallback } from 'react';

function hashTag({ article, setArticle, tagList, setTagList }) {
  const [hashtag, setHashtag] = useState('')
  // const [tagList, setHashArr] = useState([])

  const onChangeHashtag = (e) => {
    setHashtag(e.target.value)
  }

  const onKeyUp = useCallback(
    (e) => {
      if (true) {
        const $HashWrapOuter = document.querySelector('.HashWrapOuter');
        const $HashWrapInner = document.createElement('div');
        $HashWrapInner.className = 'HashWrapInner';

        $HashWrapInner.addEventListener('click', () => {
          $HashWrapOuter?.removeChild($HashWrapInner);
          setTagList(tagList.filter((hashtag) => hashtag));
        })

        if(e.keyCode === 13 && e.target.value.trim() !== '') {
          $HashWrapInner.innerHTML = `#${e.target.value}`;
          $HashWrapOuter?.appendChild($HashWrapInner);
          setTagList((tagList) => [...tagList, hashtag], console.log(tagList));
          setHashtag('');
        }
      }
    },
    [hashtag, tagList],
  )

  return (
    <div className="HashWrap">
      <div className="HashWrapOuter"></div>
      <input
        className="HashInput"
        type="text"
        value={hashtag}
        onChange={onChangeHashtag}
        onKeyUp={onKeyUp}
        placeholder="해쉬태그 입력"
      />
    </div>
  )
}


export default hashTag
