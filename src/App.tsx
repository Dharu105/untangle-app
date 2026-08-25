import { GameProvider, useGame } from './context/GameContext';
import ChildNav from './components/ChildNav';
import ParentNav from './components/ParentNav';

// Child screens
import Welcome from './screens/Welcome';
import ChildProfileSetup from './screens/ChildProfileSetup';
import VillageHome from './screens/VillageHome';
import AdventureMap from './screens/AdventureMap';
import SoundGarden from './screens/SoundGarden';
import LetterGrove from './screens/LetterGrove';
import KiteMeadow from './screens/KiteMeadow';
import PulsePath from './screens/PulsePath';
import MindyMixup from './screens/MindyMixup';
import LessonCards from './screens/LessonCards';
import Reward from './screens/Reward';
import WorldChange from './screens/WorldChange';
import BookCorner from './screens/BookCorner';
import TheMela from './screens/TheMela';
import ChildGarden from './screens/ChildGarden';
import ChildProfileView from './screens/ChildProfileView';

// Parent screens
import ParentLogin from './screens/ParentLogin';
import ParentDashboard from './screens/ParentDashboard';
import ParentGarden from './screens/ParentGarden';
import ReadingWeather from './screens/ReadingWeather';
import ProgressDetails from './screens/ProgressDetails';
import Insights from './screens/Insights';
import MelaReport from './screens/MelaReport';
import Notifications from './screens/Notifications';
import FamilyVoice from './screens/FamilyVoice';

// Shared screens
import Settings from './screens/Settings';
import ResponsibleScreening from './screens/ResponsibleScreening';
import LanguageSelect from './screens/LanguageSelect';
import Privacy from './screens/Privacy';
import HelpSupport from './screens/HelpSupport';

const CHILD_NAV_SCREENS = new Set([
  'villageHome', 'adventureMap', 'childGarden', 'theMela', 'childProfileView',
  'lessonCards',
]);

const PARENT_NAV_SCREENS = new Set([
  'parentDashboard', 'parentGarden', 'insights', 'melaReport', 'settings',
  'readingWeather', 'progressDetails', 'notifications', 'familyVoice',
  'responsibleScreening', 'languageSelect', 'privacy', 'helpSupport',
]);

function AppInner() {
  const { state } = useGame();
  const screen = state.currentScreen;

  const showChildNav = !state.isParentMode && CHILD_NAV_SCREENS.has(screen);
  const showParentNav = state.isParentMode && PARENT_NAV_SCREENS.has(screen);

  function renderScreen() {
    switch (screen) {
      case 'welcome': return <Welcome/>;
      case 'childProfile': return <ChildProfileSetup/>;
      case 'villageHome': return <VillageHome/>;
      case 'adventureMap': return <AdventureMap/>;
      case 'soundGarden': return <SoundGarden/>;
      case 'letterGrove': return <LetterGrove/>;
      case 'kiteMeadow': return <KiteMeadow/>;
      case 'pulsePath': return <PulsePath/>;
      case 'mindyMixup': return <MindyMixup/>;
      case 'lessonCards': return <LessonCards/>;
      case 'reward': return <Reward/>;
      case 'worldChange': return <WorldChange/>;
      case 'bookCorner': return <BookCorner/>;
      case 'theMela': return <TheMela/>;
      case 'childGarden': return <ChildGarden/>;
      case 'childProfileView': return <ChildProfileView/>;
      case 'parentLogin': return <ParentLogin/>;
      case 'parentDashboard': return <ParentDashboard/>;
      case 'parentGarden': return <ParentGarden/>;
      case 'readingWeather': return <ReadingWeather/>;
      case 'progressDetails': return <ProgressDetails/>;
      case 'insights': return <Insights/>;
      case 'melaReport': return <MelaReport/>;
      case 'notifications': return <Notifications/>;
      case 'familyVoice': return <FamilyVoice/>;
      case 'settings': return <Settings/>;
      case 'responsibleScreening': return <ResponsibleScreening/>;
      case 'languageSelect': return <LanguageSelect/>;
      case 'privacy': return <Privacy/>;
      case 'helpSupport': return <HelpSupport/>;
      default: return <Welcome/>;
    }
  }

  return (
    <div className="app-shell">
      {renderScreen()}
      {showChildNav && <ChildNav/>}
      {showParentNav && <ParentNav/>}
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppInner/>
    </GameProvider>
  );
}
