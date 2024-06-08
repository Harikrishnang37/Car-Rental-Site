import { motion } from "framer-motion";
import Image from 'next/image';
import { useRouter } from 'next/navigation'


export const CarsCard = ({key, cardData }) => {

  const router = useRouter();
  function clickhandler() {

    console.log("card clicked")
    window.localStorage.setItem('selected_car', JSON.stringify(cardData));
    router.push("/dashboard/carselect/confirmation");

  }

  return (
    <motion.div
      whileHover="hover"
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
      variants={{
        hover: {
          scale: 1.05,
        },
      }}
      className="relative h-30 w-80 shrink-0 overflow-hidden rounded-xl  p-8"
      style={{ backgroundColor: "white" }}
      
    >

      <div className="relative" onClick={clickhandler}>
        <div>
            <Image src = {`/car_images/${cardData.img}.jpg`} alt = "carImg" width={500} height={300}/>
        </div>
        <div classname = "text-xs">
            {cardData.brand} {cardData.model}
        </div>
        <div>
            {cardData.transmission} {cardData.fuel} {cardData.capacity} Seats
        </div>
        <div>
            {cardData.price_per_hour}rs per Hour
        </div>

      </div>


    </motion.div>
  );
};