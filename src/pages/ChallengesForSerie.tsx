import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Axios from '../axios-config';
import { ChallengeListitem } from '../components/ChallengeForSeriesComponent';

export const ChallengesForSeries = () => {
  const [challenges, setChallenges] = useState([]);
  const [seriesName, setSeriesName] = useState('');

  useEffect(() => {
    const fetchChallenges = async () => {
      var chaineGET = window.location.href;
      var newString = chaineGET.split('=');
      var id = newString[newString.length - 1];

      Axios.get('/series/' + id)
        .then(({ data }) => {
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
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 gap-4 m-5">
        <div className="col-span-3 text-lg rounded bg-gray-600 p-4">
          {seriesName}
        </div>
        {challenges.length === 0 && <span>Nothing to show here.</span>}
        {challenges.map((challenge, index) => (
          <ChallengeListitem challenge={challenge} key={`challenge-${index}`} />
        ))}
      </div>
    </>
  );
};
