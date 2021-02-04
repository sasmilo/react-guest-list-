/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import FetchOnLoad from './FetchOnLoad';

const appStyles = css`
  text-align: center;
`;

const headerStyles = css`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;

  img {
    height: 40vmin;
  }

  h1 {
    font-family: 'Courrier new', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
      'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    text-transform: uppercase;
  }
`;

function App() {
  return (
    <div css={appStyles}>
      <header css={headerStyles}>
        <h1>Google-foo guest list</h1>
        <FetchOnLoad />
      </header>
    </div>
  );
}

export default App;
