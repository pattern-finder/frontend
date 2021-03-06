import React, { useEffect, useState } from 'react';
import picspyLogo from '../assets/PicSpyLogo.png';
import noProfilePic from '../assets/profile-icon.png';

import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthUser } from 'react-auth-kit';

interface SeriesAttributes {
  _id: string;
  name: string;
  done: boolean;
  owner: string;
  isCourse: boolean;
}

export const SeriesListitem = (props: { serie: SeriesAttributes }) => {
  const getUserSession = useAuthUser();

  const [user, setUser] = useState(
    {} as { username: string; avatarUrl?: string; _id: string },
  );
  useEffect(() => {
    axios
      .get(
        props.serie.owner.replace(
          /picspy-api.herokuapp.com:\d+/,
          'https://picspy-api.herokuapp.com',
        ),
      )
      .then(({ data }) => {
        setUser(data.content);
      })
      .catch((err) => {
      });
  }, [props.serie.owner]);

  return (
    <div className="w-full bg-pink-900 rounded">
      <div className="grid grid-cols-2 gap-4 rounded  ">
        <div className="rounded m-15 px-4 py-2 col-span-2">
          <h2> {props.serie.name} </h2>
          <div className="flex flex-row mt-4 text-sm">
            <div className="flex flex-row grid-cols-8 gap-2 w-full">
              <Link
                to={{
                  pathname: `/serie/${props.serie._id}`,
                }}
              >
                <button className=" top-0 right-0 bg-black px-2 py-1 rounded-lg hover:bg-blue-700 ">
                  View serie
                </button>
              </Link>
            </div>

            <div className="ml-auto flex flex-row text-sm ">
              {props.serie.isCourse ? (
                <>
                  <img
                    className=" max-h-full h-8 object-contain"
                    src={picspyLogo}
                    alt="profile pic"
                  />
                </>
              ) : (
                  <>
                  </>
                )}

              {user._id === getUserSession() ?.sub && (
                <Link to={`/edit/serie/${props.serie._id}`}>
                  <div className="rounded-lg px-2 py-1 ml-2 bg-black hover:bg-blue-700">
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
