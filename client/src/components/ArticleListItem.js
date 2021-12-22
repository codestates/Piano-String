function articleListItem({ articleItemData }) {
  return (
    <div>
      <span>{articleItemData.uuid}</span>
      <span>{articleItemData.title}</span>
      <span>{articleItemData.createAt}</span>
    </div>
  );
}

export default articleListItem;
