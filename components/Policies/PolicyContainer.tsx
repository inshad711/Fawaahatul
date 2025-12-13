import React from "react";

const PolicyContainer = ({ policy, title }: { policy: any; title: string }) => {
  return (
    <div className="max-w-3xl space-y-6 mx-auto px-4 py-8 md:py-10 lg:py-20">
      <h1 className="text-3xl">{title}</h1>
      <div className="space-y-4">
        {policy
          .split("\n")
          .map((line: any, idx: number) =>
            line.trim() ? <p key={idx}>{line.trim()}</p> : null
          )}
      </div>
      {/* <div dangerouslySetInnerHTML={{ __html: policy }} className=""></div> */}
    </div>
  );
};

export default PolicyContainer;
