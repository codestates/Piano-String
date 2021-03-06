function expireModal({ handleResign, isModalVisible, setIsModalVisible }) {
  return (
    <div>
      { isModalVisible
      ? (
        <div className="modalBackround">
          <div className="modalWrapper">
            <span className="closeIcon" onClick={() => setIsModalVisible(false)}>&times;</span>
            <div className="madalText">
              <div>정말 탈퇴하시겠습니까?</div>
              <div>탈퇴하시려면 비밀번호를 다시 입력해주세요.</div>
            </div>
            <div className="modalInputWrap">
              <input type="password" />
              <button type="button" onClick={handleResign}>탈퇴하기</button>
            </div>
          </div>
        </div>
      )
      : null}
    </div>
  )
}

export default expireModal
