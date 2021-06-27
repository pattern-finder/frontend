import React, { useState, useEffect } from 'react';
import Axios from '../axios-config';
import ProgressBar from '@ramonak/react-progress-bar';

type Challenge = {
  _id: string;
  name: string;
  instructions: string;
  imageUrl: string;
  pourcentage: number;
};

export default function Challenge(props: Challenge) {
  const { name, instructions, imageUrl, pourcentage } = props;
  return (
    <div className="Challenge">
      <div className="grid grid-cols-2 gap-4 rounded m-5 p-10">
        <div className="bg-gray-600 rounded m-15 p-10 col-span-2">
          <div className="image">
            <div className="md:flex rounded-xl shadow-xl">
              <div className="md:flex-shrink-0">
                <img className="w-full p-4" src={imageUrl} />
              </div>
            </div>
            <div className="Name">
              <h2> {name} </h2>
            </div>
            <div className="instructions">
              <p> {instructions} </p>
            </div>
          </div>
          <div className="testBar">
            <ProgressBar completed={pourcentage} />
          </div>
        </div>
      </div>
    </div>
  );
}

// export const Challenge = () => {
//
//   type Challenge = {
//     _id: string;
//     name: string;
//     instructions: string;
//     imageUrl: string;
//   };
//
// // 609bef12c32facdd3fdc66e4
// const [challenge, setChallenge] = useState({} as Challenge);
//
// useEffect(() => {
//   const fetchChallenge = async (id: string) => {
//     const {
//       data: { content },
//     } = await Axios.get(`/challenges/${id}`);
//     setChallenge(content);
//   };
//
//   fetchChallenge('609bef12c32facdd3fdc66e4');
// }, ['609bef12c32facdd3fdc66e4']);
//
//
//   return(
//     // <>
//     // <div className="min-h-screen py-6 flex flex-col justify-center">
//     //   <div className="grid grid-cols-2 gap-4 rounded m-5 p-10">
//     //     <div className="bg-gray-600 rounded m-15 p-10 col-span-2">
//           // <div className="font-bold text-xl mb-2">{challenge.name}</div>
//           <div className="instructions">
//           <p>{challenge.name}</p>
//         </div>
//     //
//     //   </div>
//     // </>
//   );
//
//
// };
// export default Challenge;
