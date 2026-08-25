import type { Language } from './types';

export interface Translation {
  letsStart: string;
  imParent: string;
  untangleTagline: string;
  villageSubtitle: string;
  goodMorning: string;
  goodAfternoon: string;
  goodEvening: string;
  explorer: string;
  tangleStorm: string;
  stormCleared: string;
  moreToUnlock: string;
  mindyRecommends: string;
  exploreVillage: string;
  soundGarden: string;
  letterGrove: string;
  kiteMeadow: string;
  pulsePath: string;
  mindysHouse: string;
  bookCorner: string;
  theMela: string;
  adventureMap: string;
  myGarden: string;
  lessonCards: string;
  back: string;
  next: string;
  finish: string;
  continue: string;
  settings: string;
  language: string;
  privacy: string;
  helpSupport: string;
  aboutUntangle: string;
  logOut: string;
  parentDashboard: string;
  insights: string;
  melaReport: string;
  familyVoice: string;
  notifications: string;
  readingWeather: string;
  progressDetails: string;
  literacyGarden: string;
}

const translations: Record<Language, Translation> = {
  en: {
    letsStart: "🚀 Let's Start!",
    imParent: "I'm a Parent",
    untangleTagline: 'Untangle the sounds. Unlock the world.',
    villageSubtitle: 'Untangle Village',
    goodMorning: 'Good morning',
    goodAfternoon: 'Good afternoon',
    goodEvening: 'Good evening',
    explorer: 'Explorer',
    tangleStorm: 'Tangle Storm',
    stormCleared: 'cleared',
    moreToUnlock: 'more to unlock the Mela!',
    mindyRecommends: 'Mindy recommends:',
    exploreVillage: 'Explore the village',
    soundGarden: 'Sound Garden',
    letterGrove: 'Letter Grove',
    kiteMeadow: 'Kite Meadow',
    pulsePath: 'Pulse Path',
    mindysHouse: "Mindy's House",
    bookCorner: 'Book Corner',
    theMela: 'The Mela',
    adventureMap: 'Adventure Map',
    myGarden: 'My Learning Garden',
    lessonCards: 'Lesson Cards',
    back: '← Back',
    next: 'Next',
    finish: 'Finish',
    continue: 'Continue →',
    settings: '⚙️ Settings',
    language: '🌐 Language',
    privacy: '🔒 Privacy',
    helpSupport: '❓ Help & Support',
    aboutUntangle: 'ℹ️ About Untangle',
    logOut: '🚪 Log Out',
    parentDashboard: 'Dashboard',
    insights: '💡 Insights',
    melaReport: '📋 Mela Report',
    familyVoice: '👨‍👩‍👧 Family Voice',
    notifications: '🔔 Notifications',
    readingWeather: '🌦️ Reading Weather',
    progressDetails: '📊 Progress Details',
    literacyGarden: '🌱 Literacy Garden',
  },
  ta: {
    letsStart: '🚀 தொடங்குவோம்!',
    imParent: 'நான் பெற்றோர்',
    untangleTagline: 'ஒலிகளை அவிழு. உலகத்தைத் திற.',
    villageSubtitle: 'அன்டாங்கிள் கிராமம்',
    goodMorning: 'காலை வணக்கம்',
    goodAfternoon: 'மதிய வணக்கம்',
    goodEvening: '�ாலை வணக்கம்',
    explorer: 'ஆராய்ச்சியாளர்',
    tangleStorm: 'டாங்கிள் புயல்',
    stormCleared: 'அகற்றப்பட்டது',
    moreToUnlock: 'மேலா விழாவைத் திறக்க!',
    mindyRecommends: 'மிண்டி பரிந்துரைக்கிறார்:',
    exploreVillage: 'கிராமத்தை ஆராயுங்கள்',
    soundGarden: 'ஒலி தோட்டம்',
    letterGrove: 'எழுத்து காடு',
    kiteMeadow: 'காத்தாடி வயல்',
    pulsePath: 'துடிப்பு பாதை',
    mindysHouse: 'மிண்டி வீடு',
    bookCorner: 'புத்தக மூலை',
    theMela: 'மேளா',
    adventureMap: 'சாகச வரைபடம்',
    myGarden: 'என் கற்றல் தோட்டம்',
    lessonCards: 'பாட அட்டைகள்',
    back: '← திரும்பு',
    next: 'அடுத்து',
    finish: 'முடி',
    continue: 'தொடரவும் →',
    settings: '⚙️ அமைப்புகள்',
    language: '🌐 மொழி',
    privacy: '🔒 தனியுரிமை',
    helpSupport: '❓ உதவி & ஆதரவு',
    aboutUntangle: 'ℹ️ அன்டாங்கிள் பற்றி',
    logOut: '🚪 வெளியேறு',
    parentDashboard: 'டாஷ்போர்டு',
    insights: '💡 நுண்ணறிவுகள்',
    melaReport: '📋 மேலா அறிக்கை',
    familyVoice: '👨‍👩‍👧 குடும்ப குரல்',
    notifications: '🔔 அறிவிப்புகள்',
    readingWeather: '🌦️ வாசிப்பு வானிலை',
    progressDetails: '📊 முன்னேற்ற விவரங்கள்',
    literacyGarden: '🌱 கல்வி தோட்டம்',
  },
  hi: {
    letsStart: '🚀 चलो शुरू करें!',
    imParent: 'मैं अभिभावक हूँ',
    untangleTagline: 'ध्वनियों को सुलझाओ। दुनिया को खोलो।',
    villageSubtitle: 'अनटैंगल गाँव',
    goodMorning: 'सुप्रभात',
    goodAfternoon: 'नमस्कार',
    goodEvening: 'शुभ संध्या',
    explorer: 'खोजी',
    tangleStorm: 'टैंगल तूफान',
    stormCleared: 'साफ़',
    moreToUnlock: 'मेला खोलने के लिए और!',
    mindyRecommends: 'मिंडी की सिफारिश:',
    exploreVillage: 'गाँव को खोजें',
    soundGarden: 'ध्वनि उद्यान',
    letterGrove: 'अक्षर वन',
    kiteMeadow: 'पतंग मैदान',
    pulsePath: 'स्पंद पथ',
    mindysHouse: 'मिंडी का घर',
    bookCorner: 'पुस्तक कोना',
    theMela: 'मेला',
    adventureMap: 'साहसिक नक्शा',
    myGarden: 'मेरा सीखने का बगीचा',
    lessonCards: 'पाठ कार्ड',
    back: '← वापस',
    next: 'अगला',
    finish: 'समाप्त',
    continue: 'जारी रखें →',
    settings: '⚙️ सेटिंग्स',
    language: '🌐 भाषा',
    privacy: '🔒 गोपनीयता',
    helpSupport: '❓ सहायता',
    aboutUntangle: 'ℹ️ अनटैंगल के बारे में',
    logOut: '🚪 लॉग आउट',
    parentDashboard: 'डैशबोर्ड',
    insights: '💡 अंतर्दृष्टि',
    melaReport: '📋 मेला रिपोर्ट',
    familyVoice: '👨‍👩‍👧 परिवार आवाज़',
    notifications: '🔔 सूचनाएँ',
    readingWeather: '🌦️ पढ़ने का मौसम',
    progressDetails: '📊 प्रगति विवरण',
    literacyGarden: '🌱 साक्षरता बगीचा',
  },
  te: {
    letsStart: '🚀 ప్రారంభిద్దాం!',
    imParent: 'నేను తల్లిదండ్రులు',
    untangleTagline: 'శబ్దాలను విప్పు. ప్రపంచాన్ని తెరవు.',
    villageSubtitle: 'అన్‌టాంగిల్ గ్రామం',
    goodMorning: 'శుభోదయం',
    goodAfternoon: 'శుభ మధ్యాహ్నం',
    goodEvening: 'శుభ సాయంత్రం',
    explorer: 'అన్వేషకుడు',
    tangleStorm: 'టాంగిల్ తుఫాను',
    stormCleared: 'తొలగించబడింది',
    moreToUnlock: 'మేళా తెరవడానికి!',
    mindyRecommends: 'మిండీ సూచిస్తుంది:',
    exploreVillage: 'గ్రామాన్ని అన్వేషించండి',
    soundGarden: 'ధ్వని ఉద్యానం',
    letterGrove: 'అక్షర అడవి',
    kiteMeadow: 'గాలిపట మైదానం',
    pulsePath: 'స్పందన మార్గం',
    mindysHouse: 'మిండీ ఇల్లు',
    bookCorner: 'పుస్తక మూల',
    theMela: 'మేళా',
    adventureMap: 'సాహస మార్గం',
    myGarden: 'నా నేర్చుకునే తోట',
    lessonCards: 'పాఠ కార్డులు',
    back: '← వెనుకకు',
    next: 'తదుపరి',
    finish: 'ముగించు',
    continue: 'కొనసాగించు →',
    settings: '⚙️ సెట్టింగ్‌లు',
    language: '🌐 భాష',
    privacy: '🔒 గోప్యత',
    helpSupport: '❓ సహాయం',
    aboutUntangle: 'ℹ️ అన్‌టాంగిల్ గురించి',
    logOut: '🚪 లాగ్ అవుట్',
    parentDashboard: 'డాష్‌బోర్డ్',
    insights: '💡 అంతర్దృష్టులు',
    melaReport: '📋 మేళా నివేదిక',
    familyVoice: '👨‍👩‍👧 కుటుంబ స్వరం',
    notifications: '🔔 నోటిఫికేషన్‌లు',
    readingWeather: '🌦️ చదివే వాతావరణం',
    progressDetails: '📊 పురోగతి వివరాలు',
    literacyGarden: '🌱 అక్షరాస్యత తోట',
  },
  kn: {
    letsStart: '🚀 ಆರಂಭಿಸೋಣ!',
    imParent: 'ನಾನು ಪೋಷಕ',
    untangleTagline: 'ಧ್ವನಿಗಳನ್ನು ಬಿಡಿಸಿ. ಪ್ರಪಂಚವನ್ನು ತೆರೆ.',
    villageSubtitle: 'ಅನ್‌ಟಾಂಗಲ್ ಗ್ರಾಮ',
    goodMorning: 'ಶುಭೋದಯ',
    goodAfternoon: 'ಶುಭ ಮಧ್ಯಾಹ್ನ',
    goodEvening: 'ಶುಭ ಸಂಜೆ',
    explorer: 'ಅನ್ವೇಷಕ',
    tangleStorm: 'ಟಾಂಗಲ್ ಚಂಡಮಾರುತ',
    stormCleared: 'ತೆರವುಗೊಂಡಿದೆ',
    moreToUnlock: 'ಮೇಳವನ್ನು ತೆರೆಯಲು!',
    mindyRecommends: 'ಮಿಂಡಿ ಶಿಫಾರಸು:',
    exploreVillage: 'ಗ್ರಾಮವನ್ನು ಅನ್ವೇಷಿಸಿ',
    soundGarden: 'ಧ್ವನಿ ಉದ್ಯಾನ',
    letterGrove: 'ಅಕ್ಷರ ಕಾಡು',
    kiteMeadow: 'ಗಾಳಿಪಟ ಹುಲ್ಲುಗಾವಲು',
    pulsePath: 'ಸ್ಪಂದನ ಮಾರ್ಗ',
    mindysHouse: 'ಮಿಂಡಿ ಮನೆ',
    bookCorner: 'ಪುಸ್ತಕ ಮೂಲೆ',
    theMela: 'ಮೇಳ',
    adventureMap: 'ಸಾಹಸ ನಕ್ಷೆ',
    myGarden: 'ನನ್ನ ಕಲಿಕಾ ಉದ್ಯಾನ',
    lessonCards: 'ಪಾಠ ಕಾರ್ಡ್‌ಗಳು',
    back: '← ಹಿಂದಕ್ಕೆ',
    next: 'ಮುಂದೆ',
    finish: 'ಮುಗಿಸು',
    continue: 'ಮುಂದುವರಿಸು →',
    settings: '⚙️ ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    language: '🌐 ಭಾಷೆ',
    privacy: '🔒 ಗೌಪ್ಯತೆ',
    helpSupport: '❓ ಸಹಾಯ',
    aboutUntangle: 'ℹ️ ಅನ್‌ಟಾಂಗಲ್ ಬಗ್ಗೆ',
    logOut: '🚪 ಲಾಗ್ ಔಟ್',
    parentDashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    insights: '💡 ಒಳನೋಟಗಳು',
    melaReport: '📋 ಮೇಳ ವರದಿ',
    familyVoice: '👨‍👩‍👧 ಕುಟುಂಬ ಧ್ವನಿ',
    notifications: '🔔 ಸೂಚನೆಗಳು',
    readingWeather: '🌦️ ಓದುವ ಹವಾಮಾನ',
    progressDetails: '📊 ಪ್ರಗತಿ ವಿವರಗಳು',
    literacyGarden: '🌱 ಸಾಕ್ಷರತಾ ಉದ್ಯಾನ',
  },
  ml: {
    letsStart: '🚀 തുടങ്ങാം!',
    imParent: 'ഞാൻ മാതൃപിതാവാണ്',
    untangleTagline: 'ശബ്ദങ്ങൾ അഴിച്ചു. ലോകം തുറക്കുക.',
    villageSubtitle: 'അൺടാംഗിൾ ഗ്രാമം',
    goodMorning: 'സുപ്രഭാതം',
    goodAfternoon: 'നമസ്കാരം',
    goodEvening: 'ശുഭ സന്ധ്യ',
    explorer: 'പര്യവേക്ഷകൻ',
    tangleStorm: 'ടാംഗിൾ കൊടുങ്കാറ്റ്',
    stormCleared: 'മാറ്റി',
    moreToUnlock: 'മേള തുറക്കാൻ!',
    mindyRecommends: 'മിൻഡി ശുപാർശ:',
    exploreVillage: 'ഗ്രാമം പര്യവേക്ഷിക്കൂ',
    soundGarden: 'ശബ്ദ ഉദ്യാനം',
    letterGrove: 'അക്ഷര കാട്',
    kiteMeadow: 'കടുപ്പൻ പുൽമേട്',
    pulsePath: 'സ്പന്ദന പാത',
    mindysHouse: 'മിൻഡി വീട്',
    bookCorner: 'പുസ്തക മൂല',
    theMela: 'മേള',
    adventureMap: 'സാഹസ ഭൂപടം',
    myGarden: 'എൻ്റെ പഠന ഉദ്യാനം',
    lessonCards: 'പാഠ കാർഡുകൾ',
    back: '← തിരികെ',
    next: 'അടുത്തത്',
    finish: 'അവസാനിപ്പിക്കുക',
    continue: 'തുടരുക →',
    settings: '⚙️ ക്രമീകരണങ്ങൾ',
    language: '🌐 ഭാഷ',
    privacy: '🔒 സ്വകാര്യത',
    helpSupport: '❓ സഹായം',
    aboutUntangle: 'ℹ️ അൺടാംഗിൾ കുറിച്ച്',
    logOut: '🚪 ലോഗൗട്ട്',
    parentDashboard: 'ഡാഷ്ബോർഡ്',
    insights: '💡 സൂക്ഷ്മാവബോധങ്ങൾ',
    melaReport: '📋 മേള റിപ്പോർട്ട്',
    familyVoice: '👨‍👩‍👧 കുടുംബ ശബ്ദം',
    notifications: '🔔 അറിയിപ്പുകൾ',
    readingWeather: '🌦️ വായന കാലാവസ്ഥ',
    progressDetails: '📊 പുരോഗതി വിശദാംശങ്ങൾ',
    literacyGarden: '🌱 സാക്ഷരതാ ഉദ്യാനം',
  },
};

export function getTranslation(lang: Language): Translation {
  return translations[lang] ?? translations.en;
}

export function getGreeting(lang: Language, name: string): string {
  const t = getTranslation(lang);
  const h = new Date().getHours();
  const part = h < 12 ? t.goodMorning : h < 17 ? t.goodAfternoon : t.goodEvening;
  return `${part}, ${name || t.explorer}!`;
}
