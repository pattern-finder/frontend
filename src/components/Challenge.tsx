import React from 'react';
import picspyLogo from '../assets/PicSpyLogo.png';
import { Link } from 'react-router-dom';

interface ChallengeAttributes {
  _id: string;
  name: string;
  instructions: string;
  imageUrl: string;
  done: boolean;
}

export const Challenge = ({
  challenge: { _id, name, instructions, imageUrl, done },
}: {
  challenge: ChallengeAttributes;
}) => {
  return (
    <Link to="/">
      <div className="w-full bg-gray-600 rounded">
        <div className="grid grid-cols-2 gap-4 rounded  ">
          <div className="rounded m-15 px-10 py-4 col-span-2">
            <div className="image">
              <div className="Name">
                <h2> {name} </h2>
              </div>
              <div className="instructions">
                <p> {instructions} </p>
              </div>
            </div>
            <div className="flex flex-row mt-4 text-sm">
              <div>
                {' '}
                Completion :
                {done ? (
                  <i className="fas fa-check pl-2" />
                ) : (
                  <i className="fas fa-times pl-2" />
                )}
              </div>

              <div className="ml-auto flex flex-row text-sm ">
                <div className="my-auto">Created by USERNAME</div>
                <img
                  className=" max-h-full h-8 object-contain"
                  src={picspyLogo}
                  alt="profile pic"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

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
