import React, { useEffect, useState } from 'react';
import picspyLogo from '../assets/PicSpyLogo.png';
import { Link } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit';
import axios from 'axios';
import toast from 'react-hot-toast';

interface ChallengeAttributes {
  _id: string;
  name: string;
  instructions: string;
  execBootstraps: { language: string }[];
  imageUrl: string;
  done: boolean;
  owner: string;
}

export const ChallengeListitem = ({
  challenge: { _id, name, instructions, execBootstraps, owner },
}: {
  challenge: ChallengeAttributes;
}) => {
  const getUserSession = useAuthUser();
  const [user, setUser] = useState(
    {} as { username: string; avatarUrl?: string; _id: string },
  );

  useEffect(() => {
    axios
      .get(owner)
      .then(({ data }) => {
        setUser(data.content);
      })
      .catch((err) => {
        toast.error(`Could not load languages: ${err}`);
      });
  }, [owner]);

  return (
    <div className="w-full bg-gray-600 rounded">
      <div className="grid grid-cols-2 gap-4 rounded  ">
        <div className="rounded m-15 px-4 py-2 col-span-2">
          <div className="image">
            <div className="Name">
              <h2> {name} </h2>
            </div>
            <div className="instructions">
              <p> {instructions} </p>
            </div>
          </div>
          <div className="flex flex-row mt-4 text-sm">
            <div className="ml-auto flex flex-row text-sm ">
              <div className="my-auto">Created by {user.username}</div>
              <img
                className=" max-h-full h-8 object-contain"
                src={user.avatarUrl || picspyLogo}
                alt="profile pic"
              />
              {user._id === getUserSession()?.sub && (
                <Link to={`/edit/challenge/${_id}`}>
                  <div className="rounded-lg px-2 py-1 ml-2 bg-blue-500 hover:bg-blue-700">
                    <i className="fas fa-edit"></i>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
