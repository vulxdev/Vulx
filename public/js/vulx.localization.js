const loadPath = `/locales/{{lng}}/{{ns}}.lang`;

$(function () {
	i18next
	  .use(i18nextBrowserLanguageDetector)
	  .use(i18nextHttpBackend)
	  .init({
		debug: true,
		fallbackLng: 'en',
		ns: ["en-AU"],
		defaultNS: "en-AU",
		backend: {
			loadPath: loadPath
		}
	  }, (err, t) => {
		if (err) return console.error(err);
		jqueryI18next.init(i18next, $, { useOptionsAttr: true });
		$('body').localize();
	  });
  });