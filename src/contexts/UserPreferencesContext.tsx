import React, { createContext, useContext, useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";

type Theme = "light" | "dark" | "system";
type TextSize = "small" | "medium" | "large";
type StudyMode = boolean;
type NotificationPreference = {
  messages: boolean;
  events: boolean;
  academics: boolean;
  matches: boolean;
  reminders: boolean;
};
type PrivacyPreference = {
  showProfile: boolean;
  showLocation: boolean;
  showActivity: boolean;
  showReadReceipts: boolean;
};
type DatingPreference = {
  ageRange: [number, number];
  lookingFor: "friendship" | "relationship" | "studyBuddy" | "all";
  showInDating: boolean;
  distance: number;
  interests: string[];
};
type RoommatePreference = {
  cleanliness: 1 | 2 | 3 | 4 | 5;
  sleepSchedule: "early" | "late" | "flexible";
  studyHabits: "quiet" | "music" | "group" | "flexible";
  visitors: "often" | "sometimes" | "rarely" | "never";
  lookingForRoommate: boolean;
};
type AcademicPreference = {
  studyEnvironment: "library" | "hostel" | "cafe" | "outdoor" | "flexible";
  preferredSubjects: string[];
  studyGroupSize: "solo" | "pair" | "small" | "large";
  classReminders: boolean;
};
type EventPreference = {
  categories: string[];
  notifyBeforeDays: number;
  autoAddToCalendar: boolean;
};

interface UserPreferencesContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  studyMode: StudyMode;
  toggleStudyMode: () => void;
  notificationPreferences: NotificationPreference;
  updateNotificationPreferences: (prefs: Partial<NotificationPreference>) => void;
  privacyPreferences: PrivacyPreference;
  updatePrivacyPreferences: (prefs: Partial<PrivacyPreference>) => void;
  datingPreferences: DatingPreference;
  updateDatingPreferences: (prefs: Partial<DatingPreference>) => void;
  roommatePreferences: RoommatePreference;
  updateRoommatePreferences: (prefs: Partial<RoommatePreference>) => void;
  academicPreferences: AcademicPreference;
  updateAcademicPreferences: (prefs: Partial<AcademicPreference>) => void;
  eventPreferences: EventPreference;
  updateEventPreferences: (prefs: Partial<EventPreference>) => void;
  language: string;
  setLanguage: (lang: string) => void;
  accessibilityMode: boolean;
  toggleAccessibilityMode: () => void;
  colorScheme: string;
  setColorScheme: (scheme: string) => void;
}

const defaultPreferences: UserPreferencesContextType = {
  theme: "system",
  setTheme: () => {},
  textSize: "medium",
  setTextSize: () => {},
  studyMode: false,
  toggleStudyMode: () => {},
  notificationPreferences: {
    messages: true,
    events: true,
    academics: true,
    matches: true,
    reminders: true
  },
  updateNotificationPreferences: () => {},
  privacyPreferences: {
    showProfile: true,
    showLocation: true,
    showActivity: true,
    showReadReceipts: true
  },
  updatePrivacyPreferences: () => {},
  datingPreferences: {
    ageRange: [18, 25],
    lookingFor: "all",
    showInDating: true,
    distance: 10,
    interests: []
  },
  updateDatingPreferences: () => {},
  roommatePreferences: {
    cleanliness: 3,
    sleepSchedule: "flexible",
    studyHabits: "flexible",
    visitors: "sometimes",
    lookingForRoommate: true
  },
  updateRoommatePreferences: () => {},
  academicPreferences: {
    studyEnvironment: "flexible",
    preferredSubjects: [],
    studyGroupSize: "solo",
    classReminders: true
  },
  updateAcademicPreferences: () => {},
  eventPreferences: {
    categories: [],
    notifyBeforeDays: 1,
    autoAddToCalendar: false
  },
  updateEventPreferences: () => {},
  language: "en",
  setLanguage: () => {},
  accessibilityMode: false,
  toggleAccessibilityMode: () => {},
  colorScheme: "default",
  setColorScheme: () => {}
};

export const UserPreferencesContext = createContext<UserPreferencesContextType>(defaultPreferences);

export const useUserPreferences = () => useContext(UserPreferencesContext);

export const UserPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use the theme from ThemeProvider
  const { theme: appTheme, setTheme: setAppTheme } = useTheme();
  
  // Load preferences from localStorage or use defaults
  const loadFromStorage = <T,>(key: string, fallback: T): T => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`vimate-${key}`);
      return stored ? JSON.parse(stored) : fallback;
    }
    return fallback;
  };

  // No longer need our own theme state as we'll use the one from ThemeProvider
  const [textSize, setTextSizeState] = useState<TextSize>(
    () => loadFromStorage('textSize', 'medium') as TextSize
  );
  const [studyMode, setStudyMode] = useState<boolean>(
    () => loadFromStorage('studyMode', false)
  );
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreference>(
    () => loadFromStorage('notificationPreferences', defaultPreferences.notificationPreferences)
  );
  const [privacyPreferences, setPrivacyPreferences] = useState<PrivacyPreference>(
    () => loadFromStorage('privacyPreferences', defaultPreferences.privacyPreferences)
  );
  const [datingPreferences, setDatingPreferences] = useState<DatingPreference>(
    () => loadFromStorage('datingPreferences', defaultPreferences.datingPreferences)
  );
  const [roommatePreferences, setRoommatePreferences] = useState<RoommatePreference>(
    () => loadFromStorage('roommatePreferences', defaultPreferences.roommatePreferences)
  );
  const [academicPreferences, setAcademicPreferences] = useState<AcademicPreference>(
    () => loadFromStorage('academicPreferences', defaultPreferences.academicPreferences)
  );
  const [eventPreferences, setEventPreferences] = useState<EventPreference>(
    () => loadFromStorage('eventPreferences', defaultPreferences.eventPreferences)
  );
  const [language, setLanguageState] = useState<string>(
    () => loadFromStorage('language', 'en')
  );
  const [accessibilityMode, setAccessibilityMode] = useState<boolean>(
    () => loadFromStorage('accessibilityMode', false)
  );
  const [colorScheme, setColorSchemeState] = useState<string>(
    () => loadFromStorage('colorScheme', 'default')
  );

  // Persist to localStorage whenever settings change
  const saveToStorage = <T,>(key: string, value: T): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`vimate-${key}`, JSON.stringify(value));
    }
  };

  // Theme is handled by ThemeProvider
  useEffect(() => { saveToStorage('textSize', textSize); }, [textSize]);
  useEffect(() => { saveToStorage('studyMode', studyMode); }, [studyMode]);
  useEffect(() => { saveToStorage('notificationPreferences', notificationPreferences); }, [notificationPreferences]);
  useEffect(() => { saveToStorage('privacyPreferences', privacyPreferences); }, [privacyPreferences]);
  useEffect(() => { saveToStorage('datingPreferences', datingPreferences); }, [datingPreferences]);
  useEffect(() => { saveToStorage('roommatePreferences', roommatePreferences); }, [roommatePreferences]);
  useEffect(() => { saveToStorage('academicPreferences', academicPreferences); }, [academicPreferences]);
  useEffect(() => { saveToStorage('eventPreferences', eventPreferences); }, [eventPreferences]);
  useEffect(() => { saveToStorage('language', language); }, [language]);
  useEffect(() => { saveToStorage('accessibilityMode', accessibilityMode); }, [accessibilityMode]);
  useEffect(() => { saveToStorage('colorScheme', colorScheme); }, [colorScheme]);

  // Apply text size to document
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('text-sm', 'text-base', 'text-lg');
    
    if (textSize === "small") root.classList.add('text-sm');
    else if (textSize === "large") root.classList.add('text-lg');
    else root.classList.add('text-base');
    
    if (accessibilityMode) {
      root.classList.add('accessibility-mode');
    } else {
      root.classList.remove('accessibility-mode');
    }
  }, [textSize, accessibilityMode]);

  // Set color scheme
  useEffect(() => {
    document.body.dataset.colorScheme = colorScheme;
  }, [colorScheme]);

  // Wrapped setters
  const setTheme = (newTheme: Theme) => setAppTheme(newTheme);
  const setTextSize = (newSize: TextSize) => setTextSizeState(newSize);
  const toggleStudyMode = () => setStudyMode(!studyMode);
  const updateNotificationPreferences = (prefs: Partial<NotificationPreference>) => {
    setNotificationPreferences(prev => ({ ...prev, ...prefs }));
  };
  const updatePrivacyPreferences = (prefs: Partial<PrivacyPreference>) => {
    setPrivacyPreferences(prev => ({ ...prev, ...prefs }));
  };
  const updateDatingPreferences = (prefs: Partial<DatingPreference>) => {
    setDatingPreferences(prev => ({ ...prev, ...prefs }));
  };
  const updateRoommatePreferences = (prefs: Partial<RoommatePreference>) => {
    setRoommatePreferences(prev => ({ ...prev, ...prefs }));
  };
  const updateAcademicPreferences = (prefs: Partial<AcademicPreference>) => {
    setAcademicPreferences(prev => ({ ...prev, ...prefs }));
  };
  const updateEventPreferences = (prefs: Partial<EventPreference>) => {
    setEventPreferences(prev => ({ ...prev, ...prefs }));
  };
  const setLanguage = (lang: string) => setLanguageState(lang);
  const toggleAccessibilityMode = () => setAccessibilityMode(!accessibilityMode);
  const setColorScheme = (scheme: string) => setColorSchemeState(scheme);

  const value = {
    theme: appTheme as Theme,
    setTheme,
    textSize,
    setTextSize,
    studyMode,
    toggleStudyMode,
    notificationPreferences,
    updateNotificationPreferences,
    privacyPreferences,
    updatePrivacyPreferences,
    datingPreferences,
    updateDatingPreferences,
    roommatePreferences,
    updateRoommatePreferences,
    academicPreferences,
    updateAcademicPreferences,
    eventPreferences,
    updateEventPreferences,
    language,
    setLanguage,
    accessibilityMode,
    toggleAccessibilityMode,
    colorScheme,
    setColorScheme
  };

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  );
};