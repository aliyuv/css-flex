import './FlexGrow.css'

export default function FlexGrow() {
  return (
    <>
      <div className="fg-container">
        <div className="fg-content">
          <div className="fg-box f1">
            <div className="fg-top-line"></div>
            <div className="fg-box-item">
              <div className="fg-desc">flex-grow:</div>
              <div className="fg-mid-content">
                <span className="fg-numerator">1</span>
                <div className="fg-separator"></div>
                <span className="fg-denominator">2</span>
              </div>
              <div className="fg-btns">
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-minus"
                  >
                    <path d="M5 12h14"></path>
                  </svg>
                </button>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-plus"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="fg-box f2">
            <div className="fg-top-line"></div>
            <div className="fg-box-item">
              <div className="fg-desc">flex-grow:</div>
              <div className="fg-mid-content">
                <span className="fg-numerator">1</span>
                <div className="fg-separator"></div>
                <span className="fg-denominator">2</span>
              </div>
              <div className="fg-btns">
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-minus"
                  >
                    <path d="M5 12h14"></path>
                  </svg>
                </button>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-plus"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
