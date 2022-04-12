import { NextPage } from 'next';
import React from 'react';
import CreationForm, { PLACEHOLDERS } from '@/client/components/CreationForm';

interface Props {
  randomPlaceholder: string;
}

const App: NextPage<Props> = ({ randomPlaceholder }) => {
  return (
    <div>
      <CreationForm randomPlaceholder={randomPlaceholder} />
    </div>
  )
}

App.getInitialProps = async () => {
  const randomPlaceholder = PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)]

  return { randomPlaceholder }
}

export default App;
