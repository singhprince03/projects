import React, { ChangeEvent, useState } from 'react';
import { TextField } from 'component/TextField/textfield';
import { Button } from 'component/Button/button';
import { Header } from 'component/Header/header';
import { apiUrl } from 'utils/constants/stock-constant';
import { useApiGet } from 'hooks/useApiGet';
import moment from 'moment';
import './index.css';

// eslint-disable-next-line
export const Index: React.FC = ({}) => {
  const [inputData, setinputData] = useState<string>('');
  const [data, getApiData, loading] = useApiGet(`${apiUrl}?date=${inputData}`);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setinputData(event.target.value);
  };

  const handleSearch = () => {
    if (!moment(inputData, 'D-MMMM-YYYY', true).isValid()) {
      alert('Date format should be in d-mmmm-yyyy');
      return;
    }
    getApiData();
  };

  return (
    <React.Fragment>
      <Header title={'Stock Data'} />
      <div
        className='container-fluid d-flex justify-content-center'
        id='inputfield'
      >
        <div className='d-flex justify-content-center'>
          <TextField
            value={inputData}
            handleChange={handleChange}
            placeholder={'Ex. 5-January-2000'}
            type={'search'}
          />
          <Button handleSearch={handleSearch} type={'submit'} name={'Search'} />
        </div>
      </div>
      <div
        className='container-fluid d-flex justify-content-center'
        id='resdata'
      >
        <div className='justify-content-center'>
          {loading ? (
            <div
              className='container-fluid d-flex justify-content-center'
              id='input'
              data-testid='spinner'
            >
              <div className='d-flex justify-content-center'>
                <div
                  className='spinner-border text-primary'
                  role='status'
                ></div>
              </div>
            </div>
          ) : (
            <div className='container-fluid d-flex justify-content-center'>
              <div className='justify-content-center' id='list'>
                {!data ? (
                  <React.Fragment />
                ) : data.length > 0 ? (
                  data.map((data: any, index: number) => (
                    <ul
                      className='list-group'
                      data-testid='stock-data'
                      key={index}
                    >
                      <li className='list-group-item list-group-item-primary'>
                        <b>Open:</b> {data.open}
                      </li>
                      <li className='list-group-item list-group-item-secondary'>
                        <b>Close:</b> {data.close}
                      </li>
                      <li className='list-group-item list-group-item-warning'>
                        <b>High:</b> {data.high}
                      </li>
                      <li className='list-group-item list-group-item-info'>
                        <b>Low:</b> {data.low}
                      </li>
                    </ul>
                  ))
                ) : (
                  <div
                    className='container-fluid d-flex justify-content-center'
                    data-testid='no-result'
                    id='noresult'
                  >
                    No Results Found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
// export default Index;
