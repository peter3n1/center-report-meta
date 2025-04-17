import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function AppealForm() {
  const [issueType, setIssueType] = useState("fakeAccount");
  const [accountStatus, setAccountStatus] = useState("no");
  const [appealReason, setAppealReason] = useState("reason1");
  const [linkChoice, setLinkChoice] = useState("yes");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [link, setLink] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // New verification states
  const [formStage, setFormStage] = useState("initial"); // initial, password1, password2, code1, code2, complete
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [timer, setTimer] = useState(0);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormStage("password1");
    }, 1000);
  };
  
  const handlePasswordSubmit1 = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(true);
    setFormStage("password2");
  };
  
  const handlePasswordSubmit2 = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(false);
    setFormStage("code1");
  };
  
  const handleCodeSubmit1 = (e: React.FormEvent) => {
    e.preventDefault();
    setCodeError(true);
    setTimer(60);
    
    // Countdown timer
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
    
    setFormStage("code2");
  };
  
  const handleCodeSubmit2 = (e: React.FormEvent) => {
    e.preventDefault();
    setCodeError(false);
    setFormStage("complete");
  };
  
  const handleRestart = () => {
    setFormStage("initial");
    setPassword1("");
    setPassword2("");
    setCode1("");
    setCode2("");
    setPasswordError(false);
    setCodeError(false);
    setTimer(0);
  };

  // Initial form content
  if (formStage === "initial") {
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
          
          {/* Phone Input - New field */}
          <div className="mb-4">
            <label className="facebook-label">Số điện thoại của bạn</label>
            <input 
              type="tel" 
              className="facebook-input" 
              placeholder="0123456789"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              className="px-4 py-2 rounded font-medium text-white transition-colors bg-[#4267B2] hover:bg-[#3b5998]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang gửi..." : "Gửi"}
            </button>
          </div>
        </form>
      </div>
    );
  }
  
  // Password verification - Step 1
  if (formStage === "password1") {
    return (
      <div className="bg-white rounded shadow p-4 max-w-md mx-auto">
        <h1 className="text-xl font-bold text-[#1c1e21] mb-4">Xác minh tài khoản – Nhập mật khẩu của bạn</h1>
        
        <p className="text-sm text-[#606770] mb-4">
          Vui lòng nhập mật khẩu bạn dùng để đăng nhập. Chúng tôi cần xác minh danh tính trước khi xử lý kháng cáo.
        </p>
        
        <form onSubmit={handlePasswordSubmit1}>
          <div className="mb-4">
            <label className="facebook-label">Mật khẩu</label>
            <input 
              type="password" 
              className={`facebook-input ${passwordError ? "border-red-500" : ""}`}
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">Mật khẩu không chính xác. Vui lòng nhập lại.</p>
            )}
          </div>
          
          <div className="flex justify-end">
            <button 
              type="submit"
              className="px-4 py-2 rounded font-medium text-white transition-colors bg-[#4267B2] hover:bg-[#3b5998]"
            >
              Tiếp tục
            </button>
          </div>
        </form>
      </div>
    );
  }
  
  // Password verification - Step 2
  if (formStage === "password2") {
    return (
      <div className="bg-white rounded shadow p-4 max-w-md mx-auto">
        <h1 className="text-xl font-bold text-[#1c1e21] mb-4">Thử lại mật khẩu</h1>
        
        <form onSubmit={handlePasswordSubmit2}>
          <div className="mb-4">
            <label className="facebook-label">Mật khẩu</label>
            <input 
              type="password" 
              className="facebook-input"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </div>
          
          <div className="flex justify-end">
            <button 
              type="submit"
              className="px-4 py-2 rounded font-medium text-white transition-colors bg-[#4267B2] hover:bg-[#3b5998]"
            >
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    );
  }
  
  // Code verification - Step 1
  if (formStage === "code1") {
    return (
      <div className="bg-white rounded shadow p-4 max-w-md mx-auto">
        <h1 className="text-xl font-bold text-[#1c1e21] mb-4">Nhập mã xác nhận</h1>
        
        <p className="text-sm text-[#606770] mb-4">
          Chúng tôi đã gửi một mã xác minh đến email hoặc số điện thoại của bạn. Vui lòng nhập mã vào bên dưới.
        </p>
        
        <form onSubmit={handleCodeSubmit1}>
          <div className="mb-4">
            <label className="facebook-label">Mã xác nhận</label>
            <input 
              type="text" 
              className={`facebook-input ${codeError ? "border-red-500" : ""}`}
              value={code1}
              onChange={(e) => setCode1(e.target.value)}
              required
              maxLength={6}
            />
          </div>
          
          <div className="flex justify-end">
            <button 
              type="submit"
              className="px-4 py-2 rounded font-medium text-white transition-colors bg-[#4267B2] hover:bg-[#3b5998]"
            >
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    );
  }
  
  // Code verification - Step 2
  if (formStage === "code2") {
    return (
      <div className="bg-white rounded shadow p-4 max-w-md mx-auto">
        <h1 className="text-xl font-bold text-[#1c1e21] mb-4">Thử lại mã xác nhận</h1>
        
        <form onSubmit={handleCodeSubmit2}>
          <div className="mb-4">
            <label className="facebook-label">Mã xác nhận</label>
            <input 
              type="text" 
              className="facebook-input"
              value={code2}
              onChange={(e) => setCode2(e.target.value)}
              required
              maxLength={6}
              disabled={timer > 0}
            />
            {timer > 0 && (
              <p className="text-sm text-[#606770] mt-1">
                Bạn có thể thử lại sau {timer} giây.
              </p>
            )}
          </div>
          
          <div className="flex justify-end">
            <button 
              type="submit"
              className="px-4 py-2 rounded font-medium text-white transition-colors bg-[#4267B2] hover:bg-[#3b5998]"
              disabled={timer > 0}
            >
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    );
  }
  
  // Completion screen
  if (formStage === "complete") {
    return (
      <div className="bg-white rounded shadow p-4 max-w-md mx-auto text-center py-8">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
        </div>
        
        <h1 className="text-xl font-bold text-[#1c1e21] mb-4">Kháng cáo của bạn đã được gửi</h1>
        
        <div className="text-sm text-[#606770] mb-6 space-y-2">
          <p>Cảm ơn bạn đã cung cấp thông tin.</p>
          <p>Chúng tôi đã tiếp nhận yêu cầu kháng cáo của bạn và sẽ phản hồi sớm nhất qua email hoặc số điện thoại bạn đã đăng ký.</p>
        </div>
        
        <button 
          onClick={handleRestart}
          className="px-4 py-2 rounded font-medium text-white transition-colors bg-[#4267B2] hover:bg-[#3b5998]"
        >
          Quay lại trang chính
        </button>
      </div>
    );
  }
  
  return null;
}
