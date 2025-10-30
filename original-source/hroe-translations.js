// Auto-generated aggregator: composes per-language translation globals into a single translationsData map.
(function (global) {
  function ensure(name) {
    if (typeof global[name] === 'undefined') {
      console.warn(name + ' is missing');
      return {};
    }
    return global[name];
  }
  var translationsData = {
    en: ensure('hroeTranslations_en'),
    es: ensure('hroeTranslations_es'),
    it: ensure('hroeTranslations_it'),
    fr: ensure('hroeTranslations_fr'),
    de: ensure('hroeTranslations_de'),
    zh: ensure('hroeTranslations_zh'),
    ja: ensure('hroeTranslations_ja')
  };
  global.translationsData = translationsData;
})(window);
