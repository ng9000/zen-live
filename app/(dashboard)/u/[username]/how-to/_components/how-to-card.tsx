import Image from "next/image";
import { ReactElement } from "react";
interface HowToCardProps {
  description: ReactElement<any, any>;
  image: string;
  title: string;
}

export const HowToCard = ({ description, image, title }: HowToCardProps) => {
  return (
    <div className="bg-white border flex flex-col border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-5">
      <Image
        className="rounded-t-lg"
        src={image}
        alt="how to keys"
        height={500}
        width={700}
        style={{ width: "100%", height: "auto" }}
      />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        {description}
      </div>
    </div>
  );
};
