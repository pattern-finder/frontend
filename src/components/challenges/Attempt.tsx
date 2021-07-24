
export type AttemptProps =  {
  code: string,
  stderr: string,
  stdout: string,
  time: number,
  time_wall: number;
  used_memory: number;
  csw_voluntary: number;
  csw_forced: number;
};

export const Attempt = (props: { language: string, challengeId: string}) => {

  

  return (
    <>
      test
    </>
  )
}