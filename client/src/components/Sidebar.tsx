
export default function Sidebar() {
  const sidebarLinks = [
    "Create Account",
    "Your Profile",
    "Friends",
    "Facebook Restrictions",
    "Your Home Page",
    "Messages",
    "Reels",
    "Stories",
    "Photos",
    "Videos",
    "Games",
    "Pages",
    "Groups",
    "Events",
    "Meta Pay",
    "Marketplace",
    "Apps",
    "Facebook Mobile App",
    "Accessibility"
  ];

  return (
    <div className="w-56">
      <div className="py-2 bg-white rounded-sm shadow">
        <div className="px-2 py-1 bg-gray-100 border-l-4 border-[#4267B2]">
          <a href="#" className="text-[#4267B2] font-medium text-sm">Help Center</a>
        </div>
      </div>
      
      <div className="bg-white rounded shadow">
        <div className="p-2">
          {sidebarLinks.map((link, index) => (
            <a key={index} href="#" className="sidebar-link">
              {link}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
