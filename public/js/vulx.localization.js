const loadPath = `/locales/{{lng}}/{{ns}}.json`;

const render = () => {
	$('body').localize();
}

$(function () {
	i18next
	  .use(i18nextHttpBackend)
	  .use(i18nextBrowserLanguageDetector)
	  .init({
		debug: true,
		fallbackLng: "en",
		ns: "default",
		defaultNS: "default",
		backend: {
			loadPath: loadPath
		}
	  }, (err, t) => {
		jqueryI18next.init(i18next, $, { useOptionsAttr: true });
		render();
	  });
  });