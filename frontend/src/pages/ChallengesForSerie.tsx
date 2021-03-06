/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Axios from '../axios-config';
import { SeriesList } from '../components/SeriesList';

export const ChallengesForSeries = (props: {
  match?: { params?: { id?: string } };
}) => {
  const [challenges, setChallenges] = useState([]);
  const [seriesName, setSeriesName] = useState('');

  useEffect(() => {
    const fetchChallenges = async () => {
      Axios.get(`/series/${props.match?.params?.id}`)
        .then(({ data }) => {
          data.content.challenges.map((c: { owner: string }) => {
            console.log(
              'https://picspy-api.herokuapp.com/users/'.concat(c.owner),
            );
          });
          console.log(data.content);
          setChallenges(data.content.challenges);
          setSeriesName(data.content.name);
        })
        .catch((err) => {
          if (err.isAxiosError) {
            toast.error(
              `Could not load challegnes: ${err.response?.data.message}`,
            );
          } else {
            toast.error(`Could not load challegnes: ${err}`);
          }
        });
    };

    fetchChallenges();
  }, [props.match?.params?.id]);

  return (
    <>
      <div className="grid grid-cols-3 gap-4 m-5">
        <div className="col-span-3 text-lg rounded bg-pink-900 p-4">
          {seriesName}
        </div>
        {challenges.length === 0 && <span>Nothing to show here.</span>}
        {challenges.map((challenge, index) => (
          <SeriesList challenge={challenge} key={`challenge-${index}`} />
        ))}
      </div>
    </>
  );
};
