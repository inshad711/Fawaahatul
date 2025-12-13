import { ChevronRight } from "lucide-react";
import React from "react";

const RefuncReturnPolicy = () => {
  return (
    <div className="space-y-8 tracking-wide text-templateText">
      <h3 className="text-xl flex items-center gap-1">
        <ChevronRight size={20} /> Cancellation before shipment{" "}
      </h3>
      {/* <div className="text-sm space-y-4">
        <p>
          If the order or the item(s) that you want to cancel have not been
          shipped yet, you can write to our customer support team on
          care@fridaycharm.com or call us on +91 98 33 55 66 11
        </p>
        <p>
          In such cases, the order will be cancelled, and the money will be
          refunded to you within 2 to 3 business Working Days after the
          cancellation request is duly processed by us.
        </p>
        <h4 className="text-lg flex items-center gap-1">
          How will I get refunded for the cancelled orders and how long will
          this process take?
        </h4>
        <p>
          In case of cancellation before shipment, we process the refund within
          2 to 3 business Working Days after receiving the cancellation request.
        </p>
        <ul className="list-inside list-decimal space-y-4">
          <li>
            For{" "}
            <strong className="font-semibold underline">
              payments done through credit/debit cards or net banking
            </strong>
            ,the refund will be processed to the same account from which the
            payment was made within 48 - 72 business hours of us receiving the
            products back. It may take 2-3 additional business days for the
            amount to reflect in your account.
          </li>
          <li>
            For{" "}
            <strong className="font-semibold underline">
              cash on delivery transactions
            </strong>{" "}
            ,we will initiate a bank transfer against the refund amount against
            the billing details shared by you. This process will be completed
            within 48 - 72 business hours of us receiving the products back and
            your bank details on email. It will take an additional 2-3 business
            days for the amount to reflect in your account.
          </li>
        </ul>
      </div>
      <h3 className="text-xl flex items-center gap-1 ">
        <ChevronRight size={20} /> Returns, Replacements and Refunds
      </h3>
      <div className="space-y-4 text-sm">
        <h4 className="text-lg  flex items-center gap-1">
          <ChevronRight size={20} />
          How do I return an item purchased on Fridaycharm.com?
        </h4>
        <p>
          Fridaycharm.com offers its customers an ’Easy return policy’, wherein
          you can raise a return/exchange request of a product{" "}
          <strong className="font-semibold underline">
            ( SEALED PACKED ONLY )
          </strong>{" "}
          within 3 days of its delivery. We also accept partial returns wherein
          you can raise a return request for one or all products in you order.
        </p>
        <p>
          To be eligible for a return, your item must be{" "}
          <strong className="font-semibold underline">
            unused /Sealed Packed
          </strong>
          and in the same condition that you received it. It must also be in the
          <strong className="font-semibold underline">
            original packaging. Opened and tempered article will not be refunded
            or returned !
          </strong>
        </p>
        <h4 className="text-lg  flex items-center gap-1">
          There is No return/ Replacement Policy On Perfume Miniatures and Vials
          Because of its characteristics of Being Samples/Testers !!
        </h4>
        <ul className="list-inside list-decimal space-y-4">
          <li>
            Step 1: Contact our Customer Support team via email
            (care@fridaycharm.com) within 3 business days of receiving the
            order.
          </li>
          <li>
            Step 2: Provide us with your order ID details and your request to
            return/replace/refund your order. Kindly email an image of the
            product and the invoice for our reference.
          </li>
          <li>
            Step 3: You Will Have To Courier Us Sealed Packed Un used Product.
            We will initiate the refund or replacement process only if the
            products are received by us in their original packaging with their
            seals, labels and barcodes intact.
          </li>
        </ul>
      </div>
      <div className="space-y-4 text-sm">
        <h4 className="text-lg  flex items-center gap-1">
          <ChevronRight size={20} />
          Returns will not be accepted under the following conditions:
        </h4>
        <ul className="list-inside list-decimal space-y-4">
          <li>Product Orderd Is a perfume miniature and perfume sample!</li>
          <li>Product is damaged due to misuse/overuse.</li>
          <li>
            Returned without original packaging including, price tags, labels,
            original packing, freebies and other accessories or if original
            packaging is damaged.
          </li>
          <li>Serial Number is tampered with.</li>
          <li>
            Defective products that are not covered under Seller/Manufacturer’s
            warranty.
          </li>
          <li>Product is used or altered.</li>
          <li>
            If request is initiated after 3 business days of order delivery.
          </li>
          <li>Free product provided by brand.</li>
        </ul>
        <h4 className="text-lg  flex items-center gap-1">
          I have received a damaged or defective item/wrong product in my order,
          how should I proceed?
        </h4>
        <p>
          Our shipments go through rigorous quality check processes before they
          leave our warehouse. However in the rare case that your product is
          damaged during shipment or transit, you can request for a replacement
          or cancellation and refund.
        </p>
        <p>
          If you have received an item in a damaged/defective condition or have
          been sent a wrong product, you can follow a few simple steps to
          initiate your return/refund within 5 days of receiving the order:
        </p>
        <ul className="list-inside list-decimal space-y-4">
          <li>
            Step 1: Contact our Customer Support team via email
            (care@fridaycharm.com) within 3 business days of receiving the
            order.
          </li>
          <li>
            Step 2: Provide us with your order ID details and your request to
            return/replace/refund the defective/wrong items in your order.
            Kindly share an image of the product and the invoice for our
            reference.
          </li>
          <li>
            Step 3: We will pick up the products within 2-4 business days. We
            will initiate the refund or replacement process only if the products
            are received by us in their original packaging with their seals,
            labels and barcodes intact.
          </li>
        </ul>
        <p>
          Note: If it is a case of replacement, it is subject to the
          availability of stock. In case that a replacement may not be
          available, we will refund you the full amount.
        </p>
      </div>
      <div className="space-y-4 text-sm">
        <h4 className="text-lg  flex items-center gap-1">
          <ChevronRight size={20} /> Can I return part of my order?
        </h4>
        <p>
          Yes. A return can be created at item level and if you have ordered
          multiple items, you can initiate a return/replacement/refund for any
          individual item. However, any product being returned needs to be
          returned in full including all components as well as any complimentary
          gifts or products which came along with it.
        </p>
        <h4 className="text-lg  flex items-center gap-1">
          <ChevronRight size={20} />
          How will I get refunded for the returned orders and how long will this
          process take?
        </h4>
        <p>
          In case of a return/replacement/refund, we process the refund once the
          products have been received and verified at our warehouse.
        </p>
        <ul className="list-inside list-decimal space-y-4">
          <li>
            For{" "}
            <strong className="font-semibold underline">
              payments done through credit/debit cards or net banking
            </strong>
            ,the refund will be processed to the same account from which the
            payment was made within 48 – 72 business hours of us receiving the
            products back. It may take 2-3 additional business days for the
            amount to reflect in your account.
          </li>
          <li>
            For{" "}
            <strong className="font-semibold underline">
              cash on delivery transactions
            </strong>
            ,we will initiate a bank transfer against the refund amount against
            the billing details shared by you. This process will be completed
            within 48 - 72 business hours of us receiving the products back and
            your bank details on email. It will take an additional 2-3 business
            days for the amount to reflect in your account.
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default RefuncReturnPolicy;
