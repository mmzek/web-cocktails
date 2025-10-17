import {Button} from "../components/ui/button";
//placeholders for now
import drugiImg from "../assets/drugi.png";
import trzeciImg from "../assets/trzeci.png";
import czwartyImg from "../assets/czwarty.png";
const images = [drugiImg, trzeciImg, czwartyImg, drugiImg, trzeciImg, czwartyImg, drugiImg, trzeciImg, drugiImg, trzeciImg, czwartyImg, drugiImg, trzeciImg, czwartyImg, drugiImg, trzeciImg];

export default function CocktailsList(){
  return (
    <div className="pt-20 pb-20">
    <div className="grid grid-cols-4 place-items-center gap-y-20">
    {images.map((img, idx) => (
          <div key={idx} className="w-4/5 h-100 bg-gray-100 z-100 rounded-b-2xl">
            <img
              src={img}
              alt={`image`}
              className="w-full z-101 rounded-t-2xl"
            />
            <h3 className="mt-4 mx-6 font-medium text-gray-600 text-sm">Category</h3>
            <Button variant="link" className="mx-2 font-medium text-lg">Drink name</Button>
          </div>
        ))}
    </div>
    </div>
  )
}