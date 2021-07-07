import React from 'react';
import picspyLogo from '../assets/PicSpyLogo.png';
import { Link } from 'react-router-dom';

interface ChallengeAttributes {
  _id: string;
  name: string;
  instructions: string;
  execBootstraps: { language: string }[];
  imageUrl: string;
  done: boolean;
}

export const ChallengeListitem = ({
  challenge: { _id, name, instructions, execBootstraps },
}: {
  challenge: ChallengeAttributes;
}) => {
  return (
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
              <div className="grid grid-flow-row grid-rows-1 grid-cols-8 gap-2 w-full">
                {execBootstraps.map((bs) => (
                  <Link to={`/challenges/${_id}/${bs.language}`}>
                    <div className="grid grid-rows-1 grid-cols-1 gap-4 rounded-full px-4 py-2 bg-blue-500 hover:bg-blue-700">
                      <span className="text-center">{bs.language}</span>
                      {/* {false ? (
                        <i className="fas fa-check pl-2" />
                      ) : (
                        <i className="fas fa-times pl-2" />
                      )} */}
                    </div>
                  </Link>
                ))}
              </div>
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
  );
};
