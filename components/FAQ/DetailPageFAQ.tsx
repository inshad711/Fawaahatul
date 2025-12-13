import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import RefuncReturnPolicy from "../Policies/RefuncReturnPolicy";

const DetailPageFAQ = () => {
  return (
    <div>
      <Accordion type="single" collapsible className="w-full space-y-1">
        <AccordionItem value="item-1" className="border px-3 lg:px-6">
          <AccordionTrigger>FAQs</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-5 ">
              <h3 className="font-medium text-base tracking-wide">
                1. Are the product genuine?
              </h3>
              <p className="text-[13px] tracking-wide text-gray-700">
                All our products are sourced from the brand or the distributors
                of the brand. Also the average expriry date of all our products
                would be between 2 to 3 years.
              </p>
              <h3 className="font-medium text-base tracking-wide">
                2. Can the products be returned?
              </h3>
              <p className="text-[13px] tracking-wide text-gray-700">
                Yes you can return the product if there is any manufactuiring
                defect or any in transit damage, due to courier handling.
              </p>
              <p className="text-[13px] tracking-wide text-gray-700">
                For the same you have to notify us within 48 hrs of receiving
                the shipment. Besides these perfumes cannot be returned as they
                are personal care items.
              </p>
              <h3 className="font-medium text-base tracking-wide">
                3. Is Cash On Delivery available?
              </h3>
              <p className="text-[13px] tracking-wide text-gray-700">
                Yes we have COD (Cash On Delivery) service to most pin codes in
                India.
              </p>
              <p className="text-[13px] tracking-wide text-gray-700">
                For all COD orders there is a verification of pinched done
                before shipping the product.
              </p>
              <p className="text-[13px] tracking-wide text-gray-700">
                For more queries, please write to us from the below tab.
              </p>
              <h3 className="font-medium text-base tracking-wide">
                3. How to use the Perfume ?
              </h3>
              <p className="text-[13px] tracking-wide text-gray-700">
                Open the cap of the perfume bottle. Hold the bottle upright and
                10 cm away from your body. Spray on your chest, armpits, and
                neck to smell good all day. Avoid the eye area while applying.
              </p>
              <h3>5.Expiry / Shelf Life of the Perfume?</h3>
              <p className="text-[13px] tracking-wide text-gray-700">
                In General, Perfume dont have an expiry date, From the 1st time
                its Sprayed, from that time to 36-48 Months (3-4 years) is the
                general Shelf life (mentioned below every perfume Bottle/box) of
                the fragrance, Even after that they dont expire if they are
                stored properly in a cool and dry place.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border px-3 lg:px-6">
          <AccordionTrigger>Return & Refund Policy</AccordionTrigger>
          <AccordionContent>
            <RefuncReturnPolicy />
          </AccordionContent>
        </AccordionItem>
        {/* <AccordionItem value="item-2" className="border px-6">
          <AccordionTrigger>Ask a question</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem> */}
      </Accordion>
    </div>
  );
};

export default DetailPageFAQ;
