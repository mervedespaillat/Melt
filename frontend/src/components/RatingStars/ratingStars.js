// import React, { useState } from "react";
// import "./ratingStars.css";

// const RatingStars = ({ rating, setRating, readOnly }) => {
//   const [hoverRating, setHoverRating] = useState(0);

//   const colors = {
//     1: "#fadadd", //Red
//     2: "#ffc1cc", //Orange
//     3: "#ffbcd9", //Yellow
//     4: "#ff69b4", //Green
//     5: "#ff1493", //Blue
//   };

//   const onMouseEnter = (index) => {
//     if (!readOnly) {
//       setHoverRating(index);
//     }
//   };

//   const onMouseLeave = () => {
//     if (!readOnly) {
//       setHoverRating(0);
//     }
//   };

//   const onSaveRating = (index) => {
//     if (!readOnly && setRating) {
//       setRating(index);
//     }
//   };

//   return (
//     <div>
//       {[1, 2, 3, 4, 5].map((index) => (
//         <span
//           key={index}
//           className="star"
//           style={{
//             color:
//               hoverRating >= index && readOnly
//                 ? colors[index]
//                 : rating >= index
//                 ? colors[rating]
//                 : "#aaa",
//           }}
//           onMouseEnter={() => onMouseEnter(index)}
//           onMouseLeave={onMouseLeave}
//           onClick={() => onSaveRating(index)}
//         >
//           <i className="fa-solid fa-ice-cream"></i>
//         </span>
//       ))}
//     </div>
//   );
// };

// export default RatingStars;

import React, { useState } from "react";
import "./ratingStars.css";

const RatingStars = ({ rating, setRating, readOnly }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const colors = {
    1: "#fadadd", //Red
    2: "#ffc1cc", //Orange
    3: "#ffbcd9", //Yellow
    4: "#ff69b4", //Green
    5: "#ff1493", //Blue
  };

  const onMouseEnter = (index) => {
    if (!readOnly) {
      setHoverRating(index);
      const color = colors[index];
      document.querySelectorAll(".star").forEach((star) => {
        if (star.dataset.index === index) {
          star.style.color = color;
          star.classList.add("active");
        } else {
          star.classList.remove("active");
        }
      });
    }
  };

  const onMouseLeave = () => {
    setHoverRating(0);
    document.querySelectorAll(".star").forEach((star) => {
      star.classList.remove("active");
    });
  };

  const onSaveRating = (index) => {
    if (!readOnly && setRating) {
      setRating(index);
    }
  };

  return (
    <div className="star-con">
      {[1, 2, 3, 4, 5].map((index) => (
        <span
          key={index}
          className="star"
          data-index={index}
          style={{
            color:
              hoverRating >= index && readOnly
                ? colors[index]
                : rating >= index
                ? colors[rating]
                : "#aaa",
          }}
          onMouseEnter={() => onMouseEnter(index)}
          onMouseLeave={onMouseLeave}
          onClick={() => onSaveRating(index)}
        >
          <i className="fa-solid fa-ice-cream"></i>
        </span> 
      ))}
    </div>
  );
};

export default RatingStars;