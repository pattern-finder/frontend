import React from 'react';
import { Challenge } from '../components/Challenge';
import data from '../components/testChallengeData';

export const ChallengeList = () => {
  // const [challenge, setChallenge] = useState({} as Challenge);

  return (
    <>
      <div className="grid grid-cols-3 gap-4 m-5">
        {data.map((challenge) => (
          <Challenge challenge={challenge} />
        ))}
      </div>
    </>
  );
};

// // <div className="min-h-screen py-6 flex flex-col justify-center">
// //   <div className="grid grid-cols-2 gap-4 rounded m-5 p-10">
// //     <div className="bg-gray-600 rounded m-15 p-10 col-span-2">
//   <div className="Test">
//     <Challenge />
//   </div>
// //   </div>
// // </div>
