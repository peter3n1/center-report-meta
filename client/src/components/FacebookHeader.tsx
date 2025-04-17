import { Search } from "lucide-react";

export default function FacebookHeader() {
  return (
    <header className="bg-[#3b5998] flex items-center p-2 shadow-md sticky top-0 z-10 h-14">
      <div className="container mx-auto flex justify-between items-center px-2">
        <div className="flex items-center">
          <a href="#" className="text-white text-2xl font-bold mr-2">
            <span className="text-white text-3xl font-bold tracking-tighter">facebook</span>
          </a>
        </div>
        <div className="flex-grow px-4 max-w-xl">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Chúng tôi có thể giúp đỡ bạn bằng cách nào?" 
              className="bg-[#f0f2f5] border-none rounded-full text-sm py-1.5 px-4 w-full"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          </div>
        </div>
        <div>
          <a href="#" className="text-white text-sm font-medium">Tiếng Việt</a>
        </div>
      </div>
    </header>
  );
}
