const translations = {
  en: {
    skipToContent: "Skip to content",
    navProducts: "Products",
    navAbout: "About",
    navContact: "Contact",
    heroEyebrow: "Independent product studio",
    heroTitle: "Focused digital products for everyday problems.",
    heroDescription: "Meroviq designs and builds practical software with clear purpose, thoughtful interaction, and long-term usability.",
    exploreProducts: "Explore products",
    contactUs: "Contact us",
    panelTitle: "Build with intention.",
    panelText: "Simple ideas, carefully executed.",
    productsEyebrow: "Products",
    productsTitle: "Software built around real use.",
    statusInDevelopment: "In development",
    remeroDescription: "A people-centered connection app designed to help meaningful encounters happen.",
    numeraDescription: "A local-first handwriting workspace for mathematical thinking and problem solving.",
    learnMore: "Learn more",
    comingSoon: "More information coming soon",
    aboutEyebrow: "About",
    aboutTitle: "Small team, deliberate products.",
    aboutParagraphOne: "Meroviq is an independent software studio based in Daegu, Republic of Korea.",
    aboutParagraphTwo: "We focus on products that solve specific problems without unnecessary complexity. Our work emphasizes privacy, clarity, and sustainable product design.",
    contactEyebrow: "Contact",
    contactTitle: "Let’s build something useful.",
    contactDescription: "For product, partnership, licensing, or general inquiries, contact Meroviq by email.",
    footerLocation: "Daegu, Republic of Korea",
    privacy: "Privacy",
    terms: "Terms"
  },
  ko: {
    skipToContent: "본문으로 이동",
    navProducts: "제품",
    navAbout: "회사 소개",
    navContact: "문의",
    heroEyebrow: "독립 소프트웨어 스튜디오",
    heroTitle: "일상의 문제를 해결하는 집중된 디지털 제품.",
    heroDescription: "Meroviq는 명확한 목적, 세심한 상호작용, 장기적인 사용성을 중심으로 실용적인 소프트웨어를 설계하고 개발합니다.",
    exploreProducts: "제품 보기",
    contactUs: "문의하기",
    panelTitle: "의도를 담아 만듭니다.",
    panelText: "단순한 아이디어를 세심하게 구현합니다.",
    productsEyebrow: "제품",
    productsTitle: "실제 사용을 중심으로 만든 소프트웨어.",
    statusInDevelopment: "개발 중",
    remeroDescription: "의미 있는 만남과 연결을 돕기 위해 설계된 사람 중심의 연결 앱입니다.",
    numeraDescription: "수학적 사고와 문제 해결을 위한 로컬 우선 손글씨 작업 공간입니다.",
    learnMore: "더 알아보기",
    comingSoon: "자세한 정보는 추후 공개됩니다",
    aboutEyebrow: "회사 소개",
    aboutTitle: "작은 팀, 신중한 제품.",
    aboutParagraphOne: "Meroviq는 대한민국 대구에 기반을 둔 독립 소프트웨어 스튜디오입니다.",
    aboutParagraphTwo: "불필요한 복잡성 없이 구체적인 문제를 해결하는 제품에 집중합니다. 개인정보 보호, 명확성, 지속 가능한 제품 설계를 중요하게 생각합니다.",
    contactEyebrow: "문의",
    contactTitle: "유용한 것을 함께 만듭니다.",
    contactDescription: "제품, 파트너십, 라이선싱 또는 일반 문의는 이메일로 연락해 주세요.",
    footerLocation: "대한민국 대구",
    privacy: "개인정보처리방침",
    terms: "이용약관"
  }
};

const supportedLanguages = ["en", "ko"];

function resolveLanguage() {
  const savedLanguage = localStorage.getItem("meroviqLanguage");
  if (supportedLanguages.includes(savedLanguage)) {
    return savedLanguage;
  }

  return navigator.language.toLowerCase().startsWith("ko") ? "ko" : "en";
}

function applyLanguage(language) {
  const dictionary = translations[language] ?? translations.en;

  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });

  const toggle = document.querySelector("#languageToggle");
  if (toggle) {
    toggle.textContent = language === "ko" ? "English" : "한국어";
    toggle.setAttribute(
      "aria-label",
      language === "ko" ? "영어로 변경" : "Change language to Korean"
    );
  }

  localStorage.setItem("meroviqLanguage", language);
}

document.addEventListener("DOMContentLoaded", () => {
  const currentYear = document.querySelector("#currentYear");
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  let activeLanguage = resolveLanguage();
  applyLanguage(activeLanguage);

  document.querySelector("#languageToggle")?.addEventListener("click", () => {
    activeLanguage = activeLanguage === "en" ? "ko" : "en";
    applyLanguage(activeLanguage);
  });
});
