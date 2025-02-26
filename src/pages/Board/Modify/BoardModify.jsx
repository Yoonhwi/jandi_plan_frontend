import { useParams } from "react-router-dom";

const BoardModify = () => {
  const { id } = useParams();

  return (
    <div>
      <p>{id}</p>
    </div>
  );
};

export default BoardModify;
