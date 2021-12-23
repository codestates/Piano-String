import { useState } from 'react';
import { useCallback } from 'react';

function hashTag({ article, setArticle }) {
  const [hashtag, setHashtag] = useState('')
  const [hashArr, setHashArr] = useState([])

  const onChangeHashtag = (e) => {
    setHashtag(e.target.value)
  }

  const onKeyUp = useCallback(
    (e) => {
      if(true) {
        const $HashWrapOuter = document.querySelector('.HashWrapOuter')
        const $HashWrapInner = document.createElement('div')
        $HashWrapInner.className = 'HashWrapInner'

        $HashWrapInner.addEventListener('click', () => {
          $HashWrapOuter?.removeChild($HashWrapInner)
          setHashArr(hashArr.filter((hashtag) => hashtag))
        })

        if(e.keyCode === 13 && e.target.value.trim() !== ''){
          $HashWrapInner.innerHTML = `#${e.target.value}`
          $HashWrapOuter?.appendChild($HashWrapInner)
          setHashArr((hashArr) => [...hashArr, hashtag])
          setHashtag('')
          setArtice({ ...article, tag: hashArr})
        }
      }
    },
    [hashtag, hashArr],
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
