import Image from "next/image";
import Link from "next/link";
import footer from "@/static/content/footer";
const Footer = () => {
  return (
    <footer className="px-4 py-8 bg-[#4778EC] text-white">
      <div className=" flex flex-wrap md:grid md:grid-cols-3 lg:grid-cols-5 gap-8 my-8">
        <div className="col-span-2 flex flex-col items-center gap-8 ">
          <p className="text-3xl font-semibold">{footer.title} </p>
          <p className="font-light">{footer.description} </p>
        </div>
        <div>
          <h3 className="mb-6 font-semibold text-xl text-white ">
            {footer.linksTitle}{" "}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {footer.links.map((link, i) => (
              <Link key={i} href={link.href} className="font-light">
                {link.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-6 font-semibold text-xl text-white ">
            {footer.contactTitle}
          </h3>
          <ul>
            {footer.contactItems.map((item, i) => (
              <li key={i} className="flex justify-start items-center gap-2">
                <Image
                  src={item.icon}
                  alt="cs"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className=" h-4 w-4 "
                />
                <p className="font-light">{item.content}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-baseline justify-start text-white gap-2 mt-12">
          <Image
            src={footer.address.icon}
            alt="cs"
            width={0}
            height={0}
            sizes="100vw"
            className=" h-4 w-4 "
          />
          <p className="font-light">{footer.address.content} </p>
        </div>
      </div>

      <div className="relative  mt-4 flex items-center justify-center">
        <div className="h-[2px] w-full bg-white opacity-20 " />
        <Image
          src="/landing/footer/cs.svg"
          alt="cs"
          width={0}
          height={0}
          sizes="100vw"
          className="absolute h-16 w-24 opacity-20 "
        />
      </div>

      <div className="mt-8 flex max-md:flex-col max-md:justify-center  items-center md:justify-between">
        <span className="text-white">{footer.copyright} </span>
        <div className="flex space-x-6 justify-center ">
          {footer.socialLinks.map((link, i) => (
            <Link key={i} href={link.href} target="_blank">
              <Image
                src={link.icon}
                alt="cs"
                width={0}
                height={0}
                sizes="100vw"
                className=" h-6 w-6 "
              />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
export default Footer;
