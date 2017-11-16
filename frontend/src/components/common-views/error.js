import React from "react";

export default ({ error, namespace }) => {
  console.log("Error for namespace " + namespace, error);
  return <div>Error ...</div>;
};
