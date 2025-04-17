import { useState } from "react";

export default function AppealForm() {
  const [issueType, setIssueType] = useState("fakeAccount");
  const [accountStatus, setAccountStatus] = useState("no");
  const [appealReason, setAppealReason] = useState("reason1");
  const [linkChoice, setLinkChoice] = useState("yes");
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="bg-white rounded shadow p-4">
      {/* Form Title */}
      <h1 className="text-xl font-bold text-[#1c1e21] mb-4">Kháng cáo vi phạm</h1>

      {/* Form Description */}
      <p className="text-sm text-[#606770] mb-4">
        Nếu bạn cần báo cáo về vi phạm hoặc muốn kháng cáo, vui lòng điền vào mẫu này
      </p>

      <form onSubmit={handleSubmit}>
        {/* Form Section 1 */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Loại vấn đề nào mà bạn đang muốn kháng cáo?</p>

          <div className="mb-2">
            <label className="flex items-start mb-1 text-sm">
              <input 
                type="radio" 
                name="issueType" 
                value="account" 
                className="facebook-radio mt-1"
                checked={issueType === "account"}
                onChange={() => setIssueType("account")}
              />
              <span>Vi phạm chính sách cộng đồng hoặc tiêu chuẩn</span>
            </label>
          </div>

          <div className="mb-2">
            <label className="flex items-start mb-1 text-sm">
              <input 
                type="radio" 
                name="issueType" 
                value="fakeAccount" 
                className="facebook-radio mt-1"
                checked={issueType === "fakeAccount"}
                onChange={() => setIssueType("fakeAccount")}
              />
              <span>Bị khóa tài khoản Facebook không?</span>
            </label>
          </div>
        </div>

        {/* Form Section 2 */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Có phải tài khoản của bạn bị xem xét không?</p>

          <div className="mb-1">
            <label className="flex items-start mb-1 text-sm">
              <input 
                type="radio" 
                name="accountStatus" 
                value="yes" 
                className="facebook-radio mt-1"
                checked={accountStatus === "yes"}
                onChange={() => setAccountStatus("yes")}
              />
              <span>Có</span>
            </label>
          </div>

          <div className="mb-1">
            <label className="flex items-start mb-1 text-sm">
              <input 
                type="radio" 
                name="accountStatus" 
                value="no" 
                className="facebook-radio mt-1"
                checked={accountStatus === "no"}
                onChange={() => setAccountStatus("no")}
              />
              <span>Không</span>
            </label>
          </div>
        </div>

        {/* Form Section 3 */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Lý do kháng cáo:</p>

          <div className="mb-1">
            <label className="flex items-start mb-1 text-sm">
              <input 
                type="radio" 
                name="appealReason" 
                value="reason1" 
                className="facebook-radio mt-1"
                checked={appealReason === "reason1"}
                onChange={() => setAppealReason("reason1")}
              />
              <span>Đúng vậy, tôi đang bị hiểu lầm</span>
            </label>
          </div>

          <div className="mb-1">
            <label className="flex items-start mb-1 text-sm">
              <input 
                type="radio" 
                name="appealReason" 
                value="reason2" 
                className="facebook-radio mt-1"
                checked={appealReason === "reason2"}
                onChange={() => setAppealReason("reason2")}
              />
              <span>Không, nhưng tôi muốn giải thích tình huống</span>
            </label>
          </div>

          <div className="mb-1">
            <label className="flex items-start mb-1 text-sm">
              <input 
                type="radio" 
                name="appealReason" 
                value="reason3" 
                className="facebook-radio mt-1"
                checked={appealReason === "reason3"}
                onChange={() => setAppealReason("reason3")}
              />
              <span>Không, tôi đang gặp vấn đề khác</span>
            </label>
          </div>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="facebook-label">Địa chỉ email liên hệ của bạn</label>
          <input 
            type="email" 
            className="facebook-input" 
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Link Input */}
        <div className="mb-4">
          <label className="facebook-label">Tạo liên kết đến trang cá nhân của bạn</label>
          <input 
            type="text" 
            className="facebook-input" 
            placeholder="https://www.facebook.com/..." 
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        {/* Radio Options for Link */}
        <div className="mb-4">
          <p className="text-sm mb-2">Tài liệu (nếu giúp) hỗ trợ thêm</p>
          <div className="border border-[#dddfe2] rounded px-3 py-2 inline-block">
            <label className="inline-flex items-center mr-4">
              <input 
                type="radio" 
                name="linkChoice" 
                value="yes" 
                className="facebook-radio"
                checked={linkChoice === "yes"}
                onChange={() => setLinkChoice("yes")}
              />
              <span className="text-sm">Chọn tệp</span>
            </label>
            <label className="inline-flex items-center">
              <input 
                type="radio" 
                name="linkChoice" 
                value="no" 
                className="facebook-radio"
                checked={linkChoice === "no"}
                onChange={() => setLinkChoice("no")}
              />
              <span className="text-sm">Không có tệp nào được chọn</span>
            </label>
          </div>
        </div>

        {/* Additional Details */}
        <div className="mb-4">
          <label className="facebook-label">Thông tin bổ sung</label>
          <textarea 
            className="facebook-input" 
            rows={5} 
            placeholder="Nhập chi tiết bổ sung về kháng cáo của bạn"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          ></textarea>
        </div>

        {/* Information Text */}
        <div className="mb-4">
          <p className="text-xs text-[#606770] mb-2">Vui lòng xác nhận tính của bạn bằng cách điền kèm một hình ảnh, giấy tờ tùy thân của bạn. Trước khi tải lên tài liệu cá nhân, hãy tìm hiểu về các loại giấy tờ tùy thân mà Facebook chấp nhận.</p>

          <p className="text-xs text-[#606770] mb-2">Chúng tôi có thể mở lại tài khoản của bạn trong vòng 24 giờ. Giấy tờ tùy thân của bạn sẽ được bảo mật hoàn toàn và không được chia sẻ với bất kỳ ai khác.</p>

          <p className="text-xs text-[#606770] mb-2">Nếu không muốn Facebook sử dụng giấy tờ tùy thân của bạn để cải thiện hệ thống tự động chặn nội dung vi phạm giả mạo, bạn có thể chọn tùy chọn này. Nếu bạn tắt tùy chọn này, tài liệu của bạn sẽ chỉ được sử dụng cho mục đích xử lý kháng cáo này.</p>

          <p className="text-xs text-[#606770]">Hay truy cập vào Trung tâm trợ giúp để tìm hiểu về những gì sẽ xảy ra với giấy tờ tùy thân của bạn sau khi bạn gửi cho chúng tôi.</p>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button 
            type="submit"
            className={`px-4 py-2 rounded font-medium text-white transition-colors ${
              isSubmitted 
                ? "bg-green-600" 
                : "bg-[#4267B2] hover:bg-[#3b5998]"
            }`}
            disabled={isSubmitting || isSubmitted}
          >
            {isSubmitting ? "Đang gửi..." : isSubmitted ? "Đã gửi" : "Gửi"}
          </button>
        </div>
      </form>
    </div>
  );
}
