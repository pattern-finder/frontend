/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// import './CodeRunning.scss';

import Editor from '@monaco-editor/react';
import Axios from '../axios-config';
import { useAuthHeader } from 'react-auth-kit';
import { Carousel } from '../components/challenges/Carousel';
import toast from 'react-hot-toast';

type Challenge = {
  _id: string;
  name: string;
  instructions: string;
  pictures: { file: string }[];
  execBootstraps: { functionTemplate: string; language: string }[];
};

export const ChallengePage = (props: {
  match: { params: { id: string; language: string } };
}) => {
  const [challenge, setChallenge] = useState({} as Challenge);
  const [code, setCode] = useState('');

  const [stdout, setStdout] = useState('STDOUT');

  const authHeader = useAuthHeader();

  useEffect(() => {
    const fetchChallenge = async (id: string) => {
      const {
        data: { content },
      } = await Axios.get(`/challenges/${id}`, {
        headers: { Authorization: authHeader() },
      });
      setChallenge(content);
    };

    fetchChallenge(props.match.params.id);
  }, [props.match.params.id]);

  useEffect(() => {
    const placeholder = challenge?.execBootstraps?.find(
      (eb) => eb.language === props.match.params.language,
    )?.functionTemplate;

    if (placeholder) {
      // setCodePlaceholder(placeholder);
      setCode(placeholder);
    }
  }, [challenge]);

  const runOnClick = () => {
    const toastId = toast.loading('Running code...');

    Axios.post(
      `/attempts`,
      {
        challenge: challenge._id.split('/').pop(),
        code,
        language: props.match.params.language,
      },
      {
        headers: {
          Authorization: authHeader(),
        },
      },
    )
      .then(({ data }) => {
        console.log(data);
        toast.success(`Successfully ran the code.`, {
          id: toastId,
        });

        if (data.content.stdout === '') {
          setStdout(data.content.stderr);
        } else {
          setStdout(data.content.stdout);
        }
      })
      .catch((err) => {
        if (err.isAxiosError) {
          toast.error(`An error occured: ${err.response?.data.message}`, {
            id: toastId,
          });
        } else {
          toast.error(`An unknown error occured: ${err}`, { id: toastId });
        }
      });
  };

  return (
    <>
      <div className="min-h-screen py-6 flex flex-col justify-center">
        <div className="grid grid-cols-2 gap-4 rounded m-5 p-10">
          <div className="bg-gray-600 rounded m-15 p-10 col-span-2">
            <div className="font-bold text-xl mb-2 flex flex-row">
              {challenge.name}
              <div className="bg-blue-500 py-1 px-2 rounded-full text-sm w-min ml-2">
                {props.match.params.language}
              </div>
            </div>
            <p>{challenge.instructions}</p>
          </div>
          <div className="rounded-lg h-full overflow-hidden flex flex-col justify-center items-center">
            <div className="relative max-h-full w-full">
              <Editor
                language={props.match.params.language}
                defaultLanguage={props.match.params.language}
                height="80vh"
                onChange={(value) => {
                  setCode(value as string);
                }}
                value={code}
                theme="vs-dark"
              />

              <button
                className="absolute top-0 right-0 bg-blue-500 px-2 rounded-bl-lg h-10 w-20 "
                onClick={runOnClick}
              >
                Run
              </button>
            </div>
            <div className="h-auto w-full overflow-hidden rounded-b">
              <div className="bg-black max-h-full h-full p-2 w-full text-left font-light">
                <span className="whitespace-pre">
                  {stdout || "Aucune sortie après l'execution de ce code."}
                </span>
              </div>
            </div>
          </div>
          <Carousel picturesUrls={challenge.pictures} />
        </div>
      </div>
    </>
  );
};
