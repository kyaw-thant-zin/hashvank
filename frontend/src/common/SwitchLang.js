import React from 'react';
import { Cookies } from 'react-cookie';

import en from '../assets/lang/en.json';
import ja from '../assets/lang/ja.json';

let translations = {};
let defaultLanguage = 'en';
let language = 'en';
let cookieName = 'lang';

const daysToExpire = new Date(2147483647 * 1000);

const setLanguage = (lang) => {

    language = lang;

    const cookies = new Cookies();
    
    if (cookies) {
        cookies.remove(cookieName);
        cookies.set(cookieName, language,  { path: '/', expires: daysToExpire, secure: false });
    }
}

const  getLanguage = () => {
    return language;
}

const getLanguages = () => {
    return Object.keys(translations);
}

const setDefaultLanguage = (lang) => {

    const cookies = new Cookies();
    const cookieLang = cookies.get('lang');


    if(cookieLang) {
        setLanguage(cookieLang);
        defaultLanguage = cookieLang;
        language = cookieLang;
    } else {
        setLanguage(lang);
        defaultLanguage = lang;
        language = lang;
    }
    
}
  
const getDefaultLanguage = () => {
    return defaultLanguage;
}

const setTranslations = (userTranslations) => {
    translations = userTranslations;
}

const getTranslation = (lang) => {
    return translations[lang];
}

const setDefaultTranslations = (userTranslations) => {
    if (getLanguages().length !== 0) {
      setTranslations(userTranslations);
      return;
    }
    translations = userTranslations;
}

const t = (path) => {

    const cookies = new Cookies();
    let selectLang = cookies.get('lang');

    if(selectLang === undefined) {
        selectLang = language;
    }

  
    let translationObj = getTranslation(selectLang);
  
    const translationKeys = path.split('.');
    let translation = '';
  
    translationKeys.forEach((key) => {
      const temp = translationObj[key];
      if (typeof translationObj[key] === 'object') {
        translationObj = translationObj[key];
      } else if (typeof temp === 'string') {
        translation = temp;
      }
    });
  
    return translation;
}

// SET THE DEFAULT LANG
setTranslations({ en, ja });
setDefaultLanguage(process.env.REACT_APP_LOCALE);

export {
    getLanguages,
    getDefaultLanguage,
    getLanguage,
    setLanguage,
    setDefaultTranslations,
    t,
}