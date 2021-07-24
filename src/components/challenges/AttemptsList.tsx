import { useEffect, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import Axios from '../../axios-config';
import { AttemptProps } from './Attempt';

export const AttemptsList = (props: {
  execBootstrapId?: string;
  className?: string;
}) => {
  const [attempts, setAttempts] = useState([] as AttemptProps[]);
  const [shownAttemptIndex, setShownAttemptIndex] = useState(0);

  const [showStderr, setShowStderr] = useState(false);
  const [showStdout, setShowStdout] = useState(false);

  const currentUser = useAuthUser();

  useEffect(() => {
    const fetchAttempts = async () => {
      const {
        data: { content },
      } = await Axios.get(
        `attempts/find-by-user-and-bootstrap/${currentUser()?.sub}/${
          props.execBootstrapId
        }`,
      );
      setAttempts(content);
    };

    if (props.execBootstrapId) {
      fetchAttempts();
    }
  }, [props.execBootstrapId]);

  if (attempts.length === 0) {
    return (
      <div
        className={`h-full w-full bg-gray-600 rounded p-4 grid grid-flow-col grid-cols-8 grid-cols-1 ${props.className}`}
      >
        No attempt were made yet.
      </div>
    );
  }

  return (
    <div
      className={`h-full w-full bg-gray-600 rounded p-4 grid grid-flow-col grid-cols-8 grid-cols-1 ${props.className}`}
    >
      <div className="grid grid-flow-col grid-rows-2">
        <div className="font-bold"> Time : </div>
        <div className=""> {attempts[shownAttemptIndex].time} </div>
      </div>
      <div className="grid grid-flow-col grid-rows-2">
        <div className="font-bold"> Time wall : </div>
        <div className=""> {attempts[shownAttemptIndex].time_wall} </div>
      </div>
      <div className="grid grid-flow-col grid-rows-2">
        <div className="font-bold"> Used memory : </div>
        <div className=""> {attempts[shownAttemptIndex].used_memory} </div>
      </div>
      <div className="grid grid-flow-col grid-rows-2">
        <div className="font-bold"> CSW volontary : </div>
        <div className=""> {attempts[shownAttemptIndex].csw_voluntary} </div>
      </div>
      <div className="grid grid-flow-col grid-rows-2">
        <div className="font-bold"> CSW forced : </div>
        <div className=""> {attempts[shownAttemptIndex].csw_forced} </div>
      </div>
      <div className="grid grid-flow-col grid-rows-2">
        <button onClick={() => setShowStdout(!showStdout)}>test</button>
      </div>
      <div
        className={`transition-opacity h-screen w-screen fixed top-0 left-0  ${
          showStdout ? 'opacity-100 z-20' : 'opacity-0 z-0'
        }`}
      >
        <div className="flex h-3/4 w-3/4 bg-gray-600 rounded text-center justify-middle z-50">
          <div className=" m-auto">{attempts[shownAttemptIndex].stdout || 'blblblblbl'}</div>
        </div>
      </div>
    </div>
  );
};
