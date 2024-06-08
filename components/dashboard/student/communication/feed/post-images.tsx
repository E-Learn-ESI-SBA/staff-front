import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";



export default function PostImages({ images, className }: { images: string[], className?: string}) {

    return (
        <div className={className}>
            {images.length > 0 && (
            <Carousel className={`w-full h-full max-w-md mx-auto`}>
              <CarouselContent>
                {images.length > 0 ? (
                  images.map((img, index) => (
                    <CarouselItem key={index}>
                      <Image
                        height={600}
                        width={1000}
                        src={img}
                        alt="post image"
                        className="aspect-square max-h-[600px] object-cover"
                      ></Image>
                    </CarouselItem>
                  ))
                ): null}
              </CarouselContent>
              {images.length > 1 && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
            </Carousel>
          )}
        </div>
    )
}