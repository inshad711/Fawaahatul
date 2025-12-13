"use client";
import React from "react";
import { ElfsightWidget } from "react-elfsight-widget";

const GoogleReview = () => {
  return (
    <div className="templateContainer py-12 md:py-8 lg:py-14">
      <ElfsightWidget widgetId={process.env.ELFSIGHT_WIDGET_ID!} />
    </div>
  );
};

export default GoogleReview;
