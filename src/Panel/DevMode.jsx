import app from 'App'

const DevMode = () => {
    return app.isDev() && <div className="text-xs sm:text-sm md:text-md lg:text-lg">
        <span className="font-bold text-red-400 animate-pulse">{app.t('DEV MODE')}</span>
    </div>
}

export default DevMode
