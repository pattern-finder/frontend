import React from 'react';

export const Tuto = () => {
  return (
    <div className="username">
      <h1 className="text-5xl p-10 text-center">Tutorial</h1>

      <h2 className="text-3xl p-10">How to begin?</h2>
      <div className="text-xl px-20">
        Create your account and log yourself<br />
        Now you can access to the
        <a href='/challenges' className="hover:underline text-pink-100 font-bold p-3"><i className="fas fa-th-list pr-2" />Challenges</a>
        and resolve your first challenge.
      </div>

      <h2 className="text-3xl p-10">How to play and resolve a challenge?</h2>
      <div className="text-xl px-20">
        Choose a challenge in the list and click on the language in which you want to resolve it. Sometimes you have only one choice.
        When you are on the challenge follow the instruction and code your solution.<br />
        You can also create your own challenges!!!
      </div>

      <h2 className="text-3xl p-10">How to create your challenges?</h2>
      <div className="text-xl px-20">
        Go on
        <a href='/create/challenge' className="hover:underline text-pink-100 font-bold p-3"><i className="fas fa-plus pr-2" />Create challenge</a>
        enter the name and instructions first then choose the languages in which you want to create your challenges. You can now code your challenge. After all choose the patterns that you need and save your challenge.
      </div>

      <h2 className="text-3xl p-10">What is a series and how to create one?</h2>
      <div className="text-xl px-20">
        A series is a set of challenges that you can create in all challenges even if it is not your own creation. You can access to all the
        <a href='/series' className="hover:underline text-pink-100 font-bold p-3"><i className="fas fa-list-ul pr-2" />series</a>.<br />
        To create your own series go on
        <a href='/create/serie' className="hover:underline text-pink-100 font-bold p-3"><i className="fas fa-plus pr-2" />Create series</a>
        enter the name and choose the challenges that you want to add.
      </div>
    </div>
  );
};
