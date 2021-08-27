import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;

    body {
      background: #312E38;
      color: #FFF;
      -webkit-font-smoothing: antialiased;
    }

    body, input, button {
      font-family: 'Roboto Slab', serif;
      font-size: 16px;
    }

    h1, h2, h3, h4, h5, h6, strong {
      font-weight: 500;
    }

    button {
      cursor: pointer;
    }

    ::-webkit-scrollbar {
      width: 8px;
      left: -4px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb {
      background: #ff900066;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #ff9000;
    }
  }
`;
