import React from 'react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Axios from '../axios-config';
import icone from '../assets/profile-icon.png';
import {
  ChallengeAttributes,
  ChallengeListitem,
} from '../components/ChallengeListItem';
import ProgressBar from '@ramonak/react-progress-bar';
import { Donut } from 'react-donut-component';
import { Link } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit';

type ProfileAttributes = {
  _id: string;
  username: string;
  email: string;
  avatarUrl: string;
};

type DefaultSerieStats = {
  _id: string;
  name: string;
  challenges: {
    _id: string;
    name: string;
    completed: boolean;
    bestTime?: number;
  }[];
};

type ExecStats = {
  successRatio: number;
  nbExecs: number;
  nbSucessfullExecs: number;
  nbValidatedChallenges: number;
  nbParticipatedChallegnes: number;
};

export const Profile = (props: { match: { params: { id: string } } }) => {
  const [user, setUser] = useState({} as ProfileAttributes);
  const [challenges, setChallenges] = useState([] as ChallengeAttributes[]);
  const [stats, setStats] = useState([] as DefaultSerieStats[]);
  const [execStats, setExecStats] = useState({} as ExecStats);

  const getUser = useAuthUser();

  useEffect(() => {
    const fetchStats = async () => {
      Axios.get(`stats/default_series/${props.match.params.id}`)
        .then(({ data }) => {
          setStats(data.content.series);
          console.log(data);
        })
        .catch((err) => {
          if (err.isAxiosError) {
            toast.error(
              `Could not load series stats: ${err.response.data.message}`,
            );
          } else {
            toast.error(`Could not load series stats: ${err}`);
          }
        });
    };

    const execStats = async () => {
      Axios.get(`stats/execs/${props.match.params.id}`)
        .then(({ data }) => {
          console.log(data.content);
          setExecStats(data.content);
        })
        .catch((err) => {
          if (err.isAxiosError) {
            toast.error(
              `Could not load executions stats: ${err.response.data.message}`,
            );
          } else {
            toast.error(`Could not load executions stats: ${err}`);
          }
        });
    };

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

    execStats();
    fetchUser();
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
              `Could not load challenges: ${err.response ?.data.message}`,
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
      <div className="grid grid-flow-row grid-rows-5 row-span-2 gap-4 bg-pink-900 col-span-2 rounded ">
        <div className="relative  rounded h-min px-16 py-6">
          {getUser() ?.sub === props.match.params.id && (
            <Link to={`/edit/profile/`}>
              <button className="absolute bottom-0 right-0 bg-black px-2 rounded-l-lg ">
                Edit profile
              </button>
            </Link>
          )}

          <img
            alt="profile"
            className="max-h-full h-20 object-contain bg-cover bg-center mx-auto"
            src={user.avatarUrl || icone}
          />
        </div>
        <div className="">
          <div className="m-4">
            <div className="font-bold">Username :</div>
            <div className="">{user ?.username}</div>
          </div>
          <div className="m-4">
            <div className="font-bold">Email :</div>
            <div className="">{user ?.email}</div>
          </div>
        </div>
      </div>
      <div className="bg-pink-900 col-span-7 rounded p-4">
        <div className="font-bold pb-4">Progression in default series :</div>
        <div className="flex flex-col p-5">
          {(Array.isArray(stats) ? stats : []).map((s) => {
            const totalchallenges = s.challenges.length;
            const validChallenges = s.challenges.filter(
              (c) => c.completed,
            ).length;
            return (
              <div className="">
                <div className="text-lg"> {s.name} </div>
                <div className="p-5">
                  <ProgressBar
                    completed={Math.round(
                      (validChallenges * 100) / totalchallenges,
                    )}
                    bgColor="#3B82F6"
                    baseBgColor="#1F2937"
                  />
                </div>
                {validChallenges}/{totalchallenges} challenges completed
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-pink-900 col-span-7 rounded p-4 overflow-y-hidden">
        <div className="font-bold">Stats :</div>
        <div className="flex h-4/6 w-full">
          <div className="h-auto w-auto m-auto">
            <Donut
              styleTrack={{ strokeWidth: 9, stroke: 'tomato' }}
              styleIndicator={{ stroke: 'seagreen', strokeLinecap: 'round' }}
            >
              {(execStats.nbSucessfullExecs / execStats.nbExecs) * 100}
            </Donut>
          </div>

        </div>
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
