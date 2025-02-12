import { GB, TN, FR, FlagComponent } from 'country-flag-icons/react/3x2'

export type Language = 'en' | 'ar' | 'fr';

export interface LanguageOption {
  code: Language;
  name: string;
  FlagComponent: FlagComponent;
  dir: 'ltr' | 'rtl';
}

export const languages: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    FlagComponent: GB,
    dir: 'ltr'
  },
  {
    code: 'ar',
    name: 'العربية',
    FlagComponent: TN,
    dir: 'rtl'
  },
  {
    code: 'fr',
    name: 'Français',
    FlagComponent: FR,
    dir: 'ltr'
  }
];