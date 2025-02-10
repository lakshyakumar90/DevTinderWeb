import React, { useEffect, useState } from "react";
import useConnections from "../../utils/hooks/useConnections";
import { useSelector } from "react-redux";
import SingleConnection from "./SingleConnection";

const Connections = () => {
  const [error, setError] = useState(null);
  const getConnections = useConnections();
  
  useEffect(()=>{
    getConnections(setError);
  }, []);

  const connections = useSelector((store) => store.connections);
  return (
    connections && (
      <div className="max-w-2xl my-24 mx-auto p-6 bg-base-300 shadow-xl rounded-lg border-[0.1px] border-gray-800 select-none">
    <h1 className="text-2xl font-bold">Connections ({connections.length}) : </h1>
        {connections.map((connection) => (
          <SingleConnection key={connection.connectionId} user={connection} />
        ))}
        {error && <p>{error}</p>}
      </div>
    )
  );
};

export default Connections;
