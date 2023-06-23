import app from './App'

const anotherJsx = logoutUrl => <div className="h-screen flex flex-col items-center justify-center">
    <div className="localized-number text-9xl text-red-400 font-bold">403</div>
    <div className={"uppercase mt-10 text-6xl font-bold text-gray-600 text-center " + (app.getLocale().supportsLetterSpacing && " tracking-widest ")}>{app.t('Forbidden')}</div>
    <div className="text-sm mt-10 text-gray-600 font-light text-center">{app.t('You do not have permissions to access this part')}.<br />{app.t('Click on the link below to go to the home page')}.</div>
    <div className="mt-10">
        <a
            href="/"
            className="bg-green-200 hover:bg-green-400 mt-2 lg:mt-0 mr-2 py-4 px-8 cursor-pointer rounded-md"
        >
            {app.t('Home')}
        </a>
        <a
            href={logoutUrl}
            className="bg-red-700 hover:bg-red-950 mt-2 lg:mt-0 mr-2 py-4 px-8 cursor-pointer rounded-md text-white"
        >
            {app.t('Logout')}
        </a>
    </div>
</div>

export default anotherJsx
