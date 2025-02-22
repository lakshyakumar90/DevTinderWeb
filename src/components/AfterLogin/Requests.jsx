import React, { useEffect, useState } from 'react'
import useRequests from '../../utils/hooks/useRequests';
import { useSelector } from 'react-redux';
import SingleRequest from './SingleRequest';
import BackRoute from './BackRoute';

const Requests = () => {
    const getRequests = useRequests();
    const [error, setError] = useState(null);
    useEffect(()=>{
        getRequests(setError);
    }, []);
    const requests = useSelector((store) => store.requests);

  return requests && (
    <div className="max-w-2xl mt-24 mb-5 mx-auto p-6 bg-base-300 shadow-xl rounded-lg border-[0.1px] border-gray-800 select-none">
      <BackRoute />
      <h1 className="text-2xl font-bold">Requests ({requests.length}) : </h1>
      <h1>YUIOYUII</h1>
      {requests.map((request) => (
        <SingleRequest key={request._id} request={request} />
      ))}
       {requests.length === 0 && <p className='mt-3'>No requests found</p>}
      {error && <p>{error}</p>}
    </div>
  )
}

export default Requests