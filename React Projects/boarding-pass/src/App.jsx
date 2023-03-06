import './App.css';
import { useRef } from 'react';
import domtoimage from 'dom-to-image';

function App() {
  const tktref = useRef(null);

  function handleDownload(dom) {
    domtoimage.toPng(dom).then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = 'tkt.png';
      link.href = dataUrl;
      link.click();
    });
  }

  return (
    <div className='App'>
      {/* <img src="./qr.sv" alt="" /> */}
      <div className='container' ref={tktref}>
        <div className='qrcode'>
          <img src='./qrcode.png' alt='' />
          <div className='strip'></div>
          <div className='cuttop'></div>
          <div className='cutbot'></div>
        </div>
        <div className='info'>
          <div className='info__station'>
            <div className='station__name'>
              <h1>IXR</h1>
              <p>3:34PM DEC, 3 2022</p>
            </div>
            <div className='info__icons'>
              <div className='airplaneDot'></div>
              <img src='./airplane.png' alt='' width='30px' />
              <div className='airplaneDot'></div>
            </div>
            <div className='station__name'>
              <h1>BLR</h1>
              <p>5:34PM DEC, 3 2022</p>
            </div>
          </div>
          <div className='info__passenger'>
            <div>
              <p>Passenger</p>
              <p>Singh/Prince</p>
            </div>
            <div>
              <p>Flight</p>
              <p>XT139</p>
            </div>
            <div>
              <p>Gate</p>
              <p>15</p>
            </div>
            <div>
              <p>Seat</p>
              <p>17B</p>
            </div>
            <div>
              <p>Terminal</p>
              <p>T3</p>
            </div>
          </div>
        </div>
      </div>

      <div className='download-section'>
        <button
          className='download'
          onClick={() => handleDownload(tktref.current)}
        >
          Download Boarding-Pass
        </button>
      </div>
    </div>
  );
}

export default App;
