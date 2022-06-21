import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Raizzen';
        src: url('./nuku1.ttf') format('ttf');
      }
      `}
  />
)

export default Fonts