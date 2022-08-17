import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./CommentSection.css";
import { addComment } from "../../actions/userAction";

function CommentSection() {
  const [comment1, setcomment] = useState("");

//   console.log(comment1);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { comment } = comment1;

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = {
     comment: comment1,
    };

    console.log(myForm);
    dispatch(addComment(myForm));
    // console.log("yess inside");
      setcomment({ comment: "" });
  };
  const registerDataChange = (e) => {
    // console.log(e.target.value);
    setcomment({ ...comment1, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Feedback
      </button>

      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title title" id="staticBackdropLabel">
               Comment Section
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body content">
              <form encType="application/json" onSubmit={registerSubmit}>
                <div class="form-group">
                  <label for="exampleFormControlTextarea1">
                    Add your comment
                  </label>
                  <textarea
                    class="form-control"
                    onChange={registerDataChange}
                    id="exampleFormControlTextarea1"
                    name="comment"
                    value={comment}
                    rows="3"
                  ></textarea>
                </div>
                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
           <div class="content">
            <h4>All the comments</h4>
           </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentSection;
