import React, { useEffect, useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import '../components/style.scss';

// import './CodeRunning.scss';

import Axios from '../axios-config';
import toast from 'react-hot-toast';
import {
  CreateExecBootstrapListElement,
} from '../components/challenges/CreateExecBootstrapListElement';

// type Challenge = {
//   _id: string;
//   name: string;
//   instructions: string;
//   imageUrl: string;
// };

export const CreateChallenge = (props: {
  match: { params: { id: string } };
}) => {
  const [name, setName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [images, setImages] = useState([] as File[]);
  const [bootstraps, setBootstraps] = useState({} as any);
  const [languages, setLanguages] = useState([] as { name: string }[]);
  const [usedLanguages, setUsedLanguages] = useState([] as { name: string }[]);

  const getAuthToken = useAuthHeader();

  useEffect(() => {
    Axios.get('/languages')
      .then(({ data: { content } }) => {
        setLanguages(content);
      })
      .catch((err) => {
        toast.error(`Could not login: ${err}`);
      });
  }, []);

  const postChallenge = async () => {
    const params = new FormData();
    params.append('name', name);
    params.append('instructions', instructions);

    images.forEach((image) => {
      params.append('pictures', image);
    });

    Axios.post(`/challenges`, params, {
      headers: {
        Authorization: getAuthToken(),
        'content-type': 'multipart/form-data',
      },
    })
      .then(({ data: { content } }) => {
        console.log(content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = [...images];

    if (e.target.files && e.target.files?.length > 0) {
      files.push(e.target.files[0]);
    }

    setImages(files);
  }

  function removeImage(index: number) {
    const currentImages = [...images];
    currentImages.splice(index, 1);

    setImages(currentImages);
  }

  function onAddLanguage(language: string) {
    const usedLanguagesCopy = [...usedLanguages, { name: language }];
    setUsedLanguages(usedLanguagesCopy);
  }

  function onExecBootstrapUpdate(
    execBootstrap: { tests: string; functionTemplate: string },
    language: string,
  ) {
    const bootstrapsCopy = { ...bootstraps, [language]: execBootstrap };
    setBootstraps(bootstrapsCopy);
  }

  function onExecBootstrapRemove(language: string) {
    delete bootstraps[language];

    setUsedLanguages([...usedLanguages.filter((ul) => ul.name !== language)]);
  }

  return (
    <>
      <div className="grid grid-cols-5 gap-4 rounded m-5 p-10">
        <div className="col-span-5 bg-gray-600 rounded p-10 pt-8 relative overflow-hidden">
          <button
            className="absolute top-0 right-0 bg-blue-500 hover:bg-blue-700 py-2 px-3 rounded-bl-lg text-lg"
            onClick={postChallenge}
          >
            Save
          </button>
          <h1 className="text-3xl">Create your own challenge</h1>
          <div className="mt-2 flex flex-col items-start">
            <div className="flex flex-col items-start w-auto p-4">
              <label className="text-lg" htmlFor="username">
                Name
              </label>
              <input
                className="text-black rounded-md py-1 px-2"
                type="text"
                name="name"
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start w-full p-4">
              <label className="text-lg" htmlFor="username">
                Instructions
              </label>
              <textarea
                className="text-black rounded-md py-1 px-2 h-40 w-full"
                name="instructions"
                placeholder="instructions"
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 rounded m-5 p-10">
        {usedLanguages.map((language, index) => (
          <CreateExecBootstrapListElement
            key={`exec-bootstrap-${index}`}
            language={language.name}
            onChange={(ebPartial) =>
              onExecBootstrapUpdate(ebPartial, language.name)
            }
            onRemove={() => onExecBootstrapRemove(language.name)}
          />
        ))}
        {languages.length > usedLanguages.length && (
          <div
            className={`h-auto text-center bg-gray-600 rounded p-5 flex flex-col items-center ${
              bootstraps.length % 2 === 0 && 'col-span-2'
            }`}
          >
            <h2 className="text-lg mb-5">Add a language</h2>
            <div className="rounded-lg overflow-hidden grid grid-cols-1 gap-1 w-2/6  ">
              {languages
                .filter((l) => !usedLanguages.some((ul) => l.name === ul.name))
                .map((language, index) => (
                  <div
                    className="w-full mx-auto bg-blue-500 hover:bg-blue-700 rounded-lg"
                    key={`language-button-${index}`}
                  >
                    <button
                      className="w-full h-full px-2 py-4"
                      onClick={(_) => onAddLanguage(language.name)}
                    >
                      {language.name}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-5 gap-4 rounded m-5 p-10">
        {images.map((image, index) => (
          <div
            key={`image-${index}`}
            className="h-100 text-center bg-gray-600 rounded p-4 text-center relative overflow-hidden"
          >
            <button
              className="absolute top-0 right-0 bg-blue-500 hover:bg-blue-700 py-1 px-3 rounded-bl-lg"
              onClick={(_) => removeImage(index)}
            >
              <i className="fas fa-times" />
            </button>
            <h2 className="text-lg">{image.name}</h2>
            <div className="flex h-full">
              <img
                alt="user defined"
                className="w-full max-h-full object-contain m-auto pb-4"
                src={URL.createObjectURL(image)}
              />
            </div>
          </div>
        ))}
        {images.length < 10 && (
          <div className="h-auto text-center bg-gray-600 rounded p-5 flex flex-col items-center">
            <h2 className="text-lg mb-5">Add a picture</h2>

            <label className="w-32 flex flex-col items-center px-4 py-6 bg-blue-500 hover:bg-blue-700 rounded-md shadow-md tracking-wide cursor-pointer">
              <i className="fas fa-cloud-upload-alt fa-2x"></i>
              <span className="mt-2 text-base ">Browse</span>
              <input type="file" className="hidden" onChange={onFileChange} />
            </label>
          </div>
        )}
      </div>
    </>
  );
};
