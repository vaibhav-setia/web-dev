import "./tuit-item.css";
import { useDispatch } from "react-redux";
import { deleteTuit, toggleLikeTuit } from "../reducers/tuits-list-reducer";
import { deleteTuitThunk, updateTuitThunk } from "../services/tuits-thunks";
const TuitItem = (props) => {
  const tuit = props.tuit;
  const index = props.idx;

  const len = props.len;
  const bottomdiv = props.idx === len - 1 ? "wd-curve-bottom" : "";
  const topdiv = props.idx === 0 ? "wd-curve-top" : "";
  // console.log(props.idx + " " + props.len);
  // console.log(props.tuit);
  const dispatch = useDispatch();

  const deleteTuitHandler = (id) => {
    dispatch(deleteTuitThunk(id));
  };

  const toggleLikeTuitHandler = (id) => {
    console.log(tuit.liked);
    dispatch(updateTuitThunk({ ...tuit, likes: tuit.likes + 1 }));
  };

  return (
    <div>
      <div className={"wd-card" + " " + bottomdiv + " " + topdiv}>
        <img src={"images/" + tuit.image} className="wd-profile-image" />
        <div class="wd-padd">
          <div className="row">
            <div className="wd-first-row">
              <div className="wd-user-info">
                <b>{tuit.userName} </b>

                <i
                  className="fas fa-check-circle cd-verified wd-blue"
                  style={{ marginRight: "3px" }}
                ></i>
                <div className="wd-gray-text">
                  {tuit.handle} &#x2022; {tuit.time}
                </div>
              </div>
              <button
                style={{ all: "unset" }}
                className="float-end wd-cross wd-gray-text"
                onClick={() => deleteTuitHandler(tuit._id)}
              >
                &#x2715;
              </button>
            </div>
            <br />
            <div className="wd-body-text">
              {tuit.tuit}
              <span style={{ color: "white" }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <br />
              </span>
            </div>
            <div className="wd-gray-text wd-buttons-row">
              <span>
                <i className="fa-regular fa-comment wd-first-button"></i>
                {tuit.replies}
              </span>
              <span>
                <i className="fa-solid fa-retweet wd-buttons"></i>
                {tuit.retuits}
              </span>
              <span>
                <div style={{ display: "inline-block" }}>
                  {tuit.liked === "True" ? (
                    <i
                      class="fa-regular fa-solid  fa-heart wd-buttons"
                      style={{ color: "#dc3446" }}
                      onClick={() =>
                        dispatch(
                          updateTuitThunk({
                            ...tuit,
                            likes: tuit.likes - 1,
                            liked: "False",
                          })
                        )
                      }
                    ></i>
                  ) : (
                    <i
                      class="fa-regular  fa-heart wd-buttons"
                      onClick={() =>
                        dispatch(
                          updateTuitThunk({
                            ...tuit,
                            likes: tuit.likes + 1,
                            liked: "True",
                          })
                        )
                      }
                    ></i>
                  )}

                  {tuit.likes}
                </div>
              </span>
              <span>
                {tuit.disliked === "True" ? (
                <i
                  className="fa-solid fa-thumbs-down wd-buttons"
                  onClick={() =>
                    dispatch(
                      updateTuitThunk({ ...tuit, dislikes: tuit.dislikes - 1, disliked: "False" })
                    )
                  }
                ></i>
                ) : ( <i
                  className="fa-solid fa-thumbs-down wd-buttons"
                  onClick={() =>
                    dispatch(
                      updateTuitThunk({ ...tuit, dislikes: tuit.dislikes + 1, disliked: "True" })
                    )
                  }
                ></i>)}
                {tuit.dislikes}
              </span>
              <span>
                <i className="fa-solid fa-arrow-up-from-bracket wd-last-button"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TuitItem;
