import Card from "./card";
import SideBar from "../courses/sidebar";
import SearchBar from "./searchbar";
import Navbar from "../layouts/navbar";
import Cards from "@/static/content/card";
import Footer from "../layouts/footer";
const Courses = () => {
  return (
    <div className=" bg-bg-courses ">
      <Navbar />
      <SearchBar />
      <div className="flex p-4">
        <SideBar />
        <div className="flex-1 px-3">
          <div className="grid gap-y-4 gap-x-1 gridview ">
            {Cards.map((card, i) => (
              <Card key={i} card={card} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Courses;
