import React from 'react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Axios from '../axios-config';
import icone from '../assets/profile-icon.png';
import {
  ChallengeAttributes,
  ChallengeListitem,
} from '../components/ChallengeListItem';

type ProfileAttributes = {
  _id: string;
  username: string;
  email: string;
  avatarUrl: string;
};

export const Profile = (props: { match: { params: { id: string } } }) => {
  const [user, setUser] = useState({} as ProfileAttributes);
  const [challenges, setChallenges] = useState([] as ChallengeAttributes[]);
  

  useEffect(() => {
    const fetchUser = async () => {
      Axios.get(`/users/${props.match.params.id}`)
        .then(({ data }) => {
          setUser(data.content);
        })
        .catch((err) => {
          if (err.isAxiosError) {
            toast.error(`Could not load profile: ${err.response.data.message}`);
          } else {
            toast.error(`Could not load profile: ${err}`);
          }
        });
    };

    fetchUser();
  }, [props.match.params.id]);

  useEffect(() => {
    const fetchStats = async () => {
      Axios.get(`stats/default_series/${props.match.params.id}`)
        .then(({ data }) => {
          console.log(data.content);
        })
        .catch((err) => {
          if (err.isAxiosError) {
            toast.error(`Could not load profile: ${err.response.data.message}`);
          } else {
            toast.error(`Could not load profile: ${err}`);
          }
        });
    };

    fetchStats();
  }, [props.match.params.id]);

  useEffect(() => {
    const fetchChallenges = async () => {
      Axios.get(`/challenges/user/${props.match.params.id}`)
        .then(({ data }) => {
          setChallenges(data.content);
        })
        .catch((err) => {
          if (err.isAxiosError) {
            toast.error(
              `Could not load challenges: ${err.response?.data.message}`,
            );
          } else {
            toast.error(`Could not load challenges: ${err}`);
          }
        });
    };

    fetchChallenges();
  }, [props.match.params.id]);

  return (
    <div className="h-auto w-full grid grid-flow-col grid-rows-2 grid-cols-12 gap-4 p-4">
      <div className="grid grid-flow-row grid-rows-5 row-span-2 gap-4 bg-gray-600 col-span-2 rounded ">
        <div className=" rounded h-min px-16 py-6">
          <img
            alt="profile"
            className="max-h-full h-20 object-contain bg-cover bg-center mx-auto"
            src={user.avatarUrl || icone}
          />
        </div>
        <div className="">
          <div className="m-4">
            <div className="font-bold">Username :</div>
            <div className="">{user?.username}</div>
          </div>
          <div className="m-4">
            <div className="font-bold">Email :</div>
            <div className="">{user?.email}</div>
          </div>
        </div>
      </div>
      <div className="grid bg-gray-600 col-span-7 rounded p-4">
        <div className="font-bold">Progression :</div>
      </div>
      <div className="grid bg-gray-600 col-span-7 rounded p-4">
        <div className="font-bold">Stats :</div>
        {/* <ChallengeStat className="col-span-12" attempts={attempts} /> */}
      </div>
      <div className="flex flex-col w-full col-span-4 row-span-2">
        <div className="font-bold">Challenges :</div>
        {challenges.length > 0
          ? challenges.map((challenge, index) => (
              <div className="py-2">
                <ChallengeListitem
                  challenge={challenge}
                  key={`challenge-${index}`}
                />
              </div>
            ))
          : 'This user did not create any challenges.'}
      </div>
    </div>
  );
};
