import React, { useCallback } from 'react';
import { useState } from 'react';
import Editor from '@monaco-editor/react';

export interface ExecBootstrap {
  challenge?: string;
  language: string;
  tests: string;
  functionTemplate: string;
}

export const CreateExecBootstrapListElement = ({
  language,
  challenge,
  onRemove,
  onChange,
}: {
  language: string;
  challenge?: string;
  onRemove: () => void;
  onChange: (execBootstrap: {
    tests: string;
    functionTemplate: string;
  }) => void;
}) => {
  const [tests, setTests] = useState('');

  const [functionTemplate, setFunctionTemplate] = useState('');

  useCallback(() => {
    onChange({
      tests,
      functionTemplate,
    });
  }, [tests, functionTemplate, onChange]);

  return (
    <div className="h-100 text-center bg-gray-600 rounded p-4 text-center relative overflow-hidden">
      <button
        className="absolute top-0 right-0 bg-blue-500 hover:bg-blue-700 py-1 px-3 rounded-bl-lg"
        onClick={(_) => onRemove()}
      >
        <i className="fas fa-times" />
      </button>
      <h2 className="text-lg mb-5">{language} implementation</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg mb-2">Test implementations</h2>
          <div className="rounded-lg overflow-hidden flex flex-col justify-center items-center">
            <Editor
              defaultLanguage="bash"
              height="40vh"
              // defaultValue="// some comment"
              onChange={(value) => {
                setTests(value as string);
              }}
              theme="vs-dark"
            />
          </div>
        </div>
        <div>
          <h2 className="text-lg mb-2">User function wireframe</h2>
          <div className="rounded-lg overflow-hidden flex flex-col justify-center items-center">
            <Editor
              defaultLanguage="bash"
              height="40vh"
              // defaultValue="// some comment"
              onChange={(value) => {
                setFunctionTemplate(value as string);
              }}
              theme="vs-dark"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
