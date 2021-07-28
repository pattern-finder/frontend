import React, { useState } from 'react';
import picspyLogo from '../assets/PicSpyLogo.png';
import noProfilePic from '../assets/profile-icon.png'

import { Link } from 'react-router-dom';

interface SeriesAttributes {
  _id: string;
  name: string;
  done: boolean;
  owner: {
    username: string;
    avatarUrl: string;
  };
  isCourse: boolean;
}

export const SeriesListitem = (props: { serie: SeriesAttributes }) => {
  console.log(props.serie)
  return (
    <div className="w-full bg-gray-600 rounded">
      <div className="grid grid-cols-2 gap-4 rounded  ">
        <div className="rounded m-15 px-4 py-2 col-span-2">
          <div className="image">
            <div className="Name">
              <h2> {props.serie.name} </h2>
            </div>
          </div>
          <div className="flex flex-row mt-4 text-sm">
            <div>
              <div className="flex flex-row grid-cols-8 gap-2 w-full">
                <Link
                  to={{
                    pathname: `/view/challengesSeries/idseries=${props.serie._id}`,
                  }}
                >
                  <button className=" top-0 right-0 bg-blue-500 px-2 py-1 rounded-lg hover:bg-blue-700 ">
                    View serie
                  </button>
                </Link>
              </div>
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
                  <div className="my-auto">
                    Created by {props.serie.owner.username}
                  </div>
                  <img
                    className=" max-h-full h-8 object-contain"
                    src={props.serie.owner.username || noProfilePic}
                    alt="profile pic"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
