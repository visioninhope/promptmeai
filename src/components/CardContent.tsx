import { cn } from "@/utils/tailwind";
import { PropsWithChildren } from "react";

type CardContentProps = {
  title?: string;
  overrideStyles?: string;
  isActive?: boolean;
} & PropsWithChildren;

const CardContent = ({
  title,
  overrideStyles,
  isActive,
  children,
}: CardContentProps) => {
  return (
    <div
      className={cn(
        "border border-[#E5EAEE] p-4 rounded-lg flex flex-col gap-4 transition duration-300 ease",
        {
          "border-[#0CA37F] border-[2px]": isActive,
        },
        overrideStyles
      )}
    >
      {title && <h3 className="text-[20px]">{title}</h3>}
      {children}
    </div>
  );
};

export default CardContent;