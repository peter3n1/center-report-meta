export default function Sidebar() {
  const sidebarLinks = [
    "Cách tạo tài khoản",
    "Trang cá nhân của bạn",
    "Kết bạn",
    "Hạn chế trên Facebook",
    "Trang chủ của bạn",
    "Nhắn tin",
    "Reels",
    "Tin",
    "Ảnh",
    "Video",
    "Game",
    "Trang",
    "Nhóm",
    "Sự kiện",
    "Meta Pay",
    "Marketplace",
    "Ứng dụng",
    "Ứng dụng Facebook trên di động",
    "Trợ năng"
  ];

  return (
    <div className="w-64 pr-4">
      <div className="py-2 bg-white rounded shadow mb-3">
        <div className="px-2 py-1 bg-gray-100 border-l-4 border-[#4267B2]">
          <a href="#" className="text-[#4267B2] font-medium text-sm">Trung tâm trợ giúp</a>
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
