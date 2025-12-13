import { clientService } from "@/services/clientService";
import ImageWithFallback from "../Image/Fallbackimage";

const ClientShowcase = async () => {
  let response: any = null;
  try {
    response = await clientService.clientShowcase();
  } catch (error) {
    console.error("Error fetching client showcase data:", error);
    return null;
  }
  if (!response) {
    return null;
  }
  if (response?.data?.length === 0) {
    return null;
  }

  const data = [
    {
      image: "https://splashfragrance.in/wp-content/uploads/2022/11/kapoor.png",
      name: "Arjun Kapoor",
    },
    {
      image: "https://splashfragrance.in/wp-content/uploads/2022/11/emiway.jpg",
      name: "Emiway Bantai",
    },
    {
      image: "https://splashfragrance.in/wp-content/uploads/2022/11/puri.png",
      name: "Sanam Puri",
    },
    {
      image: "https://splashfragrance.in/wp-content/uploads/2022/11/Matt.jpg",
      name: "Matt Long",
    },
    {
      image:
        "https://splashfragrance.in/wp-content/uploads/2024/01/MV5BMmY2ODI1OTgtYWJmOC00YTk0LWJlYjctYjVjNDFjOGEyMDZkXkEyXkFqcGdeQXVyNzM4MjU3NzY_._V1_.webp",
      name: "Milind Gaba",
    },
    {
      image:
        "https://splashfragrance.in/wp-content/uploads/2022/11/Pavitra.jpg",
      name: "Pavitra Punia",
    },
  ];

  return (
    <div className="templateContainer py-6 md:py-8 lg:py-10 space-y-6 md:space-y-10">
      <div className="text-lg md:text-[25px] space-y-1 leading-normal md:leading-snug text-templateText uppercase text-center tracking-wide">
        <h2 data-aos="fade-up " className="sectionHeading">
          Celebrities Who Shop Their
        </h2>
        <h2 data-aos="fade-up " className="sectionHeading">
          Perfume From Us
        </h2>
      </div>
      <div className="grid lg:px-20 gap-4 gap-y-6 md:gap-6 lg:gap-10 grid-cols-3 md:grid-cols-6">
        {response?.data?.map((item: any, index: number) => (
          <div
            data-aos="fade-up"
            // data-aos-delay={index * 100}
            key={index}
            className="block space-y-2"
          >
            <div className="aspect-square rounded-full overflow-hidden">
              <ImageWithFallback
                src={`${process.env.BACKEND}/upload/Clients/${item.image_url}`}
                alt={item.client_name || "Client Image"}
                className="h-full w-full object-cover"
                height={400}
                width={400}
              />
            </div>
            <h3 className="text-center text-templateText font-[300] tracking-wider text-[13px] md:text-[15px]">
              {item.client_name}
            </h3>
          </div>
        ))}
      </div>
      <h3
        data-aos="fade-up"
        className="text-base md:text-xl leading-normal md:leading-snug text-templateText uppercase text-center tracking-wide"
      >
        & 10,000+ Satisfied Customers
      </h3>
    </div>
  );
};

export default ClientShowcase;
