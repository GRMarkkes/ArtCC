
import "./Create.css";
import deleteIcon from "../../../Asset/wrapper.png";

const Create = (props: { ImageCreate: any, onDelete: () => void }) => {
  const handleDeleteClick = () => {
    // Call the onDelete callback when delete icon is clicked
    props.onDelete();
  };

  return (
    <div className="Create">
      <div style={{ position: "relative" }}>
        <img src={props.ImageCreate} alt="ImageCreate"  style={{width:'100%'}}/>
        <img
          src={deleteIcon}
          alt="deleteIcons"
          style={{ position: "absolute", top: "2%", right: "2%" }}
          onClick={handleDeleteClick}
        />
      </div>
      <div>
        <p>Title</p>
      </div>
    </div>
  );
};

export default Create;
